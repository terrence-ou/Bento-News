import { homedir } from "os";
import fs from "fs";
import axios from "axios";
import path from "path";
import { OpenAI } from "ai-fetcher";
import {
  LanguageCodes,
  SEARCH_DIR,
  SEARCH_RESULTS_FILENAME,
  USER_FOLDERS_DIR,
  HEADLINE_DIR,
  APP_FOLDER,
  GENERATED_CONTENTS_FILENAME,
  COVER_IMG_FILENAME,
  SortBy,
  SubEditor,
  ImageStyles,
} from "@shared/consts";

import {
  IMG_GEN_PREPARE_PROMPT,
  SYSTEM_PROMPTS,
} from "@shared/prompts";

import type {
  GetHeadlinesFn,
  GetHuggingFaceResponseFn,
  GetOpenAIResponseFn,
  GetSearchResultsFn,
} from "@shared/types";
import type { OpenAIMessage } from "ai-fetcher/dist/types";

// Consts
const headlineFolderDir = path.join(homedir(), HEADLINE_DIR);
const searchFolderDir = path.join(homedir(), SEARCH_DIR);
const userFolderDir = path.join(homedir(), USER_FOLDERS_DIR);
const headlineEndpoint = "https://newsapi.org/v2/top-headlines";
const everythingEndpoint = "https://newsapi.org/v2/everything";
const hgModelEndpoint = "https://api-inference.huggingface.co/models";

const styleToModelEndpoint = {
  [ImageStyles.stippled]: "dvyio/flux-lora-stippled-illustration",
  [ImageStyles.watercolor]: "alvdansen/araminta-k-illustration",
  [ImageStyles.lineart]: "dvyio/flux-lora-simple-illustration",
  [ImageStyles.cartoon]: "blink7630/graphic-novel-illustration",
  [ImageStyles.kids]: "ampp/rough-kids-illustrations",
};

const triggerWords = {
  [ImageStyles.stippled]:
    "stippled illustration in the style of STPPLD.",
  [ImageStyles.watercolor]: "",
  [ImageStyles.lineart]: "illustration in the style of SMPL",
  [ImageStyles.cartoon]: "graphic novel illustration",
  [ImageStyles.kids]: "r0ughkids4rt",
};

// Functions
const getHeadlines: GetHeadlinesFn = async () => {
  const settings = fs.readFileSync(
    path.join(homedir(), APP_FOLDER, "settings.json"),
    "utf-8"
  );
  const settingsJson = JSON.parse(settings);

  if (!settingsJson.keys) {
    console.error("No API key found for NewsAPI");
    return;
  }

  if (!settingsJson.keys.newsapi) {
    console.error("No API key found for NewsAPI");
    return;
  }

  const apiKey = settingsJson.keys.newsapi;

  let category: string | undefined = undefined;
  let pageSize: number | undefined = undefined;

  if (settingsJson.headline) {
    category = settingsJson.headline.category;
    pageSize = settingsJson.headline.headline_size || 30;
  }

  // create an url with the query parameters
  const queryParams = new URLSearchParams({
    apiKey,
    country: "us",
  });
  if (category && category !== "all") {
    queryParams.append("category", category);
  }
  if (pageSize) {
    queryParams.append("pageSize", pageSize.toString());
  }

  const url = `${headlineEndpoint}?${queryParams.toString()}`;

  try {
    // Get the headlines
    const response = await axios.get(url);
    const data = response.data;

    // Save file to local
    const timestamp = new Date().toISOString().slice(0, 10);
    const filename = `${timestamp}-${category === undefined ? "all" : category}.json`;
    const fileDir = path.join(headlineFolderDir, filename);

    fs.writeFileSync(fileDir, JSON.stringify(data, null, 2), "utf-8");
  } catch (error) {
    console.error(error);
  }
};

// Get search results
const getSearchResults: GetSearchResultsFn = async (searchParams) => {
  const { keywords, language, sortBy, from, to } = searchParams;

  if (!keywords) {
    console.error("No keywords provided");
    return;
  }

  const settings = fs.readFileSync(
    path.join(homedir(), APP_FOLDER, "settings.json"),
    "utf-8"
  );
  const settingsJson = JSON.parse(settings);
  if (!settingsJson.keys || !settingsJson.keys.newsapi) {
    console.error("No API key found for NewsAPI");
    return;
  }

  const apiKey = settingsJson.keys.newsapi;
  const queryParams = new URLSearchParams({ apiKey });

  const formattedKeywords = keywords
    .split(",")
    .map((word) => word.trim())
    .join(" AND ")
    .replace(/\s/g, " ");

  if (language)
    queryParams.append("language", LanguageCodes[language]);
  if (sortBy) queryParams.append("sortBy", SortBy[sortBy]);
  if (from) queryParams.append("from", from);
  if (to) queryParams.append("to", to);

  // we cannot put the keywords in the queryParams due to NewsAPI's special query format
  const url = `${everythingEndpoint}?${queryParams.toString()}&q=${formattedKeywords}`;

  try {
    const response = await axios.get(url);
    const data = response.data;
    const fileDir = path.join(
      searchFolderDir,
      SEARCH_RESULTS_FILENAME
    );
    fs.writeFileSync(fileDir, JSON.stringify(data, null, 2), "utf-8");
  } catch (error) {
    console.error(error);
  }
};

// Get OpenAI Chat response
const getOpenAIResponse: GetOpenAIResponseFn = async (
  folder: string,
  editor: SubEditor,
  news: string,
  extraInstruction?: string
) => {
  const settings = fs.readFileSync(
    path.join(homedir(), APP_FOLDER, "settings.json"),
    "utf-8"
  );
  const settingsJson = JSON.parse(settings);
  if (!settingsJson.keys || !settingsJson.keys.openai) {
    console.error("No API key found for OpenAI");
    return;
  }

  // get the system message based on the current editor type
  try {
    const apiKey = settingsJson.keys.openai;
    const openAIChatAgent = OpenAI.chat(apiKey, "gpt-4o-mini");
    const system = SYSTEM_PROMPTS[editor];
    const messages: OpenAIMessage[] = [
      { role: "user", content: news },
    ];
    if (extraInstruction) {
      messages.push({ role: "user", content: extraInstruction });
    }
    const response = await openAIChatAgent.generate(messages, system);
    const generatedContents = response.choices[0].message.content;

    // write to the file
    const generatedContentFile = path.join(
      userFolderDir,
      folder,
      GENERATED_CONTENTS_FILENAME
    );

    const data = JSON.parse(
      fs.readFileSync(generatedContentFile, "utf-8")
    );
    data.generated_contents[editor] = generatedContents;
    fs.writeFileSync(
      generatedContentFile,
      JSON.stringify(data, null, 2),
      "utf-8"
    );

    return response.choices[0].message.content;
  } catch (error) {
    console.error(
      "[ERROR]: Failed fectching OpenAI response, error: ",
      error
    );
    return "Error in retrieving OpenAI response";
  }
};

// Get Hugging Face response
const getHuggingFaceResponse: GetHuggingFaceResponseFn = async (
  newsTitles,
  folder,
  style
) => {
  const settings = fs.readFileSync(
    path.join(homedir(), APP_FOLDER, "settings.json"),
    "utf-8"
  );
  const settingsJson = JSON.parse(settings);
  if (
    !settingsJson.keys ||
    !settingsJson.keys.openai ||
    !settingsJson.keys.huggingface
  ) {
    console.error("No API key found for OpenAI or Huggingface");
    return;
  }

  try {
    // step 1: Generate short img propmt
    const openaiApiKey = settingsJson.keys.openai;
    const hgApiKey = settingsJson.keys.huggingface;
    const openAIChatAgent = OpenAI.chat(openaiApiKey, "gpt-4o-mini");
    const system = IMG_GEN_PREPARE_PROMPT;
    const messages: OpenAIMessage[] = [
      { role: "user", content: newsTitles },
    ];
    const openAIResponse = await openAIChatAgent.generate(
      messages,
      system
    );
    const prompt =
      openAIResponse.choices[0].message.content + triggerWords[style];
    console.log(`Prompt generated.`);

    // step 2: generate image
    const imgGenEndpoint = `${hgModelEndpoint}/${styleToModelEndpoint[style]}`;

    const response = await axios.post(
      imgGenEndpoint,
      { inputs: prompt },
      {
        headers: {
          Authorization: `Bearer ${hgApiKey}`,
          "Content-Type": "application/json",
        },
        responseType: "arraybuffer",
      }
    );

    const fileDir = path.join(
      userFolderDir,
      folder,
      COVER_IMG_FILENAME
    );
    fs.writeFileSync(fileDir, response.data);

    console.log(`Image saved to ${fileDir}`);
  } catch (error) {
    console.error(
      "[ERROR]: Failed fectching OpenAI response, error: ",
      error
    );
  }
};

export {
  getHeadlines,
  getSearchResults,
  getOpenAIResponse,
  getHuggingFaceResponse,
};
