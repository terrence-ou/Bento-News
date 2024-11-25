import fs from "fs";
import path from "path";
import { homedir } from "os";
import { Article, Articles } from "@shared/models/Articles";
import {
  APP_FOLDER,
  SEARCH_DIR,
  HEADLINE_DIR,
  USER_FOLDERS_DIR,
  SEARCH_RESULTS_FILENAME,
} from "@shared/consts";
import type {
  LoadApiKeysFn,
  LoadHeadlinesFn,
  LoadHeadlineSettingsFn,
  RemoveTodayHeadlinesFn,
  WriteApiKeysFn,
  WriteHeadlineSettingsFn,
  LoadSearchResultsFn,
  LoadUserFoldersFn,
} from "@shared/types";

const projectFolder = path.join(homedir(), APP_FOLDER);
const headlinesFolder = path.join(homedir(), HEADLINE_DIR);
const searchFolder = path.join(homedir(), SEARCH_DIR);
const userFolder = path.join(homedir(), USER_FOLDERS_DIR);
const settingsFile = path.join(
  homedir(),
  APP_FOLDER,
  "settings.json"
);

// Ensure settings.json file
const ensureProjectFiles = () => {
  for (const folder of [
    projectFolder,
    headlinesFolder,
    searchFolder,
    userFolder,
  ]) {
    if (!fs.existsSync(folder)) {
      fs.mkdirSync(folder, { recursive: true });
    }
    if (folder === userFolder) {
      const subFolders = fs
        .readdirSync(folder, { withFileTypes: true })
        .filter((dirent) => dirent.isDirectory()).length;
      if (subFolders === 0) {
        fs.mkdirSync(path.join(folder, "default"), {
          recursive: true,
        });
      }
    }
  }
  if (!fs.existsSync(settingsFile))
    fs.writeFileSync(
      settingsFile,
      JSON.stringify({}, null, 2),
      "utf-8"
    );
};

// ============ Loaders =============

// Load today's headlines from the local file
const loadTodayHeadlines: LoadHeadlinesFn = async () => {
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
    const news = await processFiles(headlinesFolder, todayFiles);
    const articles = new Articles(news);
    return articles;
  } catch (error) {
    console.error("Error loading today's file. [ERROR]: ", error);
    return undefined;
  }
};

// Load previous headlines from the local file
const loadPrevHeadlines: LoadHeadlinesFn = async () => {
  try {
    const { previous_days: prevDays } = await loadHeadlineSettings();
    // Get an array of files within the last prevDays days
    const currDate = new Date();
    const files = fs.readdirSync(headlinesFolder);
    const previousFiles = files.filter((file) => {
      const fileDate = new Date(file.slice(0, 10));
      const diffTime = Math.abs(
        currDate.getTime() - fileDate.getTime()
      );
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
      return (
        diffDays <= prevDays &&
        !file.startsWith(currDate.toISOString().slice(0, 10)) &&
        file.endsWith(".json")
      );
    });

    if (previousFiles.length === 0) {
      return undefined;
    }
    const news = await processFiles(headlinesFolder, previousFiles);
    const articles = new Articles(news);
    return articles;
  } catch (error) {
    console.error(
      "Error loading previous headlines. [ERROR]: ",
      error
    );
    return undefined;
  }
};

// Load search results from the local file
const loadSearchResults: LoadSearchResultsFn = async () => {
  try {
    // Get an array of today's files
    const searchResultFile = path.join(
      searchFolder,
      SEARCH_RESULTS_FILENAME
    );
    if (!fs.existsSync(searchResultFile)) {
      return undefined;
    }

    const news = await processFiles(searchFolder, [
      SEARCH_RESULTS_FILENAME,
    ]);
    const articles = new Articles(news);
    return articles;
  } catch (error) {
    console.error("Error loading today's file. [ERROR]: ", error);
    return undefined;
  }
};

// Load user's news folders
const loadUserFolders: LoadUserFoldersFn = async () => {
  try {
    const folders = fs.readdirSync(userFolder);
    return folders;
  } catch (error) {
    console.error("Error loading user's folders. [ERROR]: ", error);
    return [];
  }
};

// Load API keys from the local setting file
const loadApiKeys: LoadApiKeysFn = async () => {
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
const loadHeadlineSettings: LoadHeadlineSettingsFn = async () => {
  const defaultHeadlineSettings = {
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
      category: currSettings.category || "all",
      headline_size: currSettings.headline_size || 30,
      previous_days: currSettings.previous_days || 7,
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
const writeApiKeys: WriteApiKeysFn = async ({ newsapi, openai }) => {
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

const writeHeadlineSettings: WriteHeadlineSettingsFn = async (
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

const removeTodayHeadlines: RemoveTodayHeadlinesFn = async () => {
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
const processFiles = async (
  folder: string,
  files: string[]
): Promise<Article[]> => {
  const existedNews = new Set<string>();
  const news: Article[] = [];
  // Read each file and extract the articles
  const sortedFiles = files.sort((a, b) => -a.localeCompare(b));
  await Promise.all(
    sortedFiles.map(async (file) => {
      try {
        const data = fs.readFileSync(
          path.join(folder, file),
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
  loadSearchResults,
  loadHeadlineSettings,
  loadUserFolders,
  loadApiKeys,
  writeApiKeys,
  writeHeadlineSettings,
  removeTodayHeadlines,
};
