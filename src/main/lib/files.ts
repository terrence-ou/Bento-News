import fs from "fs";
import path from "path";
import { homedir } from "os";
import { Article, Articles } from "@shared/models/Articles";
import {
  APP_FOLDER,
  HEADLINE_DIR,
  USER_FOLDERS_DIR,
} from "@shared/consts";
import type {
  LoadApiKeys,
  LoadHeadlines,
  LoadHeadlineSettings,
  RemoveTodayHeadlines,
  WriteApiKeys,
  WriteHeadlineSettings,
} from "@shared/types";

const projectFolder = path.join(homedir(), APP_FOLDER);
const headlinesFolder = path.join(homedir(), HEADLINE_DIR);
const userFolder = path.join(homedir(), USER_FOLDERS_DIR);
const settingsFile = path.join(
  homedir(),
  APP_FOLDER,
  "settings.json"
);

// Ensure settings.json file
const ensureProjectFiles = () => {
  if (!fs.existsSync(projectFolder))
    fs.mkdirSync(projectFolder, { recursive: true });
  if (!fs.existsSync(headlinesFolder))
    fs.mkdirSync(headlinesFolder, { recursive: true });
  if (!fs.existsSync(userFolder))
    fs.mkdirSync(userFolder, { recursive: true });
  if (!fs.existsSync(settingsFile))
    fs.writeFileSync(
      settingsFile,
      JSON.stringify({}, null, 2),
      "utf-8"
    );
};

// ============ Loaders =============

// Load today's headlines from the local file
const loadTodayHeadlines: LoadHeadlines = async () => {
  try {
    // Get an array of today's files
    const today = new Date().toISOString().slice(0, 10); // it is actually the Greenwich time
    const files = fs.readdirSync(headlinesFolder);
    const todayFiles = files.filter(
      (file) => file.startsWith(today) && file.endsWith(".json")
    );

    if (todayFiles.length === 0) {
      return undefined;
    }
    const news = await processFiles(todayFiles);
    const articles = new Articles(news);
    return articles;
  } catch (error) {
    console.error("Error loading today's file. [ERROR]: ", error);
    return undefined;
  }
};

// Load previous headlines from the local file
const loadPrevHeadlines: LoadHeadlines = async () => {
  try {
    // Get an array of prevDate's files
    const prevDate = new Date().toISOString().slice(0, 10);
    const files = fs.readdirSync(headlinesFolder);
    const previousFiles = files.filter(
      (file) => !file.startsWith(prevDate) && file.endsWith(".json")
    );

    if (previousFiles.length === 0) {
      return undefined;
    }
    const news = await processFiles(previousFiles);
    const articles = new Articles(news);
    return articles;
  } catch (error) {
    console.error("Error loading today's file. [ERROR]: ", error);
    return undefined;
  }
};

// Load API keys from the local setting file
const loadApiKeys: LoadApiKeys = async () => {
  const emptyKeys = { newsapi: "", openai: "" };

  try {
    const data = fs.readFileSync(settingsFile, "utf-8");
    const settings = JSON.parse(data);
    if (!settings.keys) {
      return emptyKeys;
    }
    return {
      newsapi: settings.keys.newsapi || "",
      openai: settings.keys.openai || "",
    };
  } catch (error) {
    console.error("Error loading API keys. [ERROR]: ", error);
    return emptyKeys;
  }
};

// load Headline preferences from the local setting file
const loadHeadlineSettings: LoadHeadlineSettings = async () => {
  const defaultHeadlineSettings = {
    country: "us",
    category: "all",
    headline_size: 30,
    previous_days: 7,
  };
  try {
    const data = fs.readFileSync(settingsFile, "utf-8");
    const settings = JSON.parse(data);
    if (!settings.headline) {
      return defaultHeadlineSettings;
    }
    const currSettings = settings.headline;
    return {
      country: currSettings.country || "us",
      category: currSettings.category || "all",
      headline_size: currSettings.headline_size || 30,
      previous_days: currSettings.previous_headlines || 7,
    };
  } catch (error) {
    console.error(
      "Error loading headline preferences. [ERROR]: ",
      error
    );
    return defaultHeadlineSettings;
  }
};

// ============ Writers =============

// Write API keys to the local setting file with the user's input
const writeApiKeys: WriteApiKeys = async ({ newsapi, openai }) => {
  try {
    const data = fs.readFileSync(settingsFile, "utf-8");
    const settings = JSON.parse(data);
    if (!settings.keys) settings.keys = {};
    settings.keys.newsapi = newsapi;
    settings.keys.openai = openai;
    fs.writeFileSync(
      settingsFile,
      JSON.stringify(settings, null, 2),
      "utf-8"
    );
  } catch (error) {
    console.error("Error writing API keys. [ERROR]: ", error);
  }
};

const writeHeadlineSettings: WriteHeadlineSettings = async (
  settings
) => {
  try {
    const data = fs.readFileSync(settingsFile, "utf-8");
    const currSettings = JSON.parse(data);
    currSettings.headline = settings;
    fs.writeFileSync(
      settingsFile,
      JSON.stringify(currSettings, null, 2),
      "utf-8"
    );
  } catch (error) {
    console.error(
      "Error writing headline preferences. [ERROR]: ",
      error
    );
  }
};

const removeTodayHeadlines: RemoveTodayHeadlines = async () => {
  try {
    const today = new Date().toISOString().slice(0, 10);
    const files = fs.readdirSync(headlinesFolder);
    const todayFiles = files.filter((filename) =>
      filename.startsWith(today)
    );
    if (todayFiles.length === 0) {
      return;
    }
    todayFiles.forEach((filename) =>
      fs.unlinkSync(path.join(headlinesFolder, filename))
    );
  } catch (error) {
    console.error(
      "Error removing today's headlines. [ERROR]: ",
      error
    );
  }
};

// ======== Helper functions ========

// validate the parsed json file
const isValidData = (data: any): data is { articles: Article[] } => {
  return data && Array.isArray(data.articles);
};

// load files into the array
const processFiles = async (files: string[]): Promise<Article[]> => {
  const existedNews = new Set<string>();
  const news: Article[] = [];
  // Read each file and extract the articles
  const sortedFiles = files.sort((a, b) => -a.localeCompare(b));
  await Promise.all(
    sortedFiles.map(async (file) => {
      try {
        const data = fs.readFileSync(
          path.join(headlinesFolder, file),
          "utf-8"
        );
        const parsedData = JSON.parse(data);
        // check if the data in the file is valid
        if (!isValidData(parsedData)) {
          console.warn("Invalid data format in the file: ", file);
          return;
        }
        parsedData.articles.forEach((content) => {
          const article = new Article(content);
          if (article.title && !existedNews.has(article.title)) {
            existedNews.add(article.title);
            news.push(article);
          }
        });
      } catch (error) {
        console.error(`Error processing file ${file}: `, error);
      }
    })
  );

  return news;
};

export {
  ensureProjectFiles,
  loadPrevHeadlines,
  loadTodayHeadlines,
  loadHeadlineSettings,
  loadApiKeys,
  writeApiKeys,
  writeHeadlineSettings,
  removeTodayHeadlines,
};
