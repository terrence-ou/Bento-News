import { homedir } from "os";
import fs from "fs";
import axios from "axios";
import path from "path";
import type {
  GetHeadlinesFn,
  GetSearchResultsFn,
} from "@shared/types";
import {
  LanguageCodes,
  SEARCH_DIR,
  SEARCH_RESULTS_FILENAME,
  SortBy,
} from "@shared/consts";
import { HEADLINE_DIR, APP_FOLDER } from "@shared/consts";

// Consts
const headlineFolderDir = `${homedir()}/${HEADLINE_DIR}`;
const searchFolderDir = `${homedir()}/${SEARCH_DIR}`;
const headlineEndpoint = "https://newsapi.org/v2/top-headlines";
const everythingEndpoint = "https://newsapi.org/v2/everything";

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

export { getHeadlines, getSearchResults };
