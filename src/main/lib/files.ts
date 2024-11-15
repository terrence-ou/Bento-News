import fs from "fs";
import { homedir } from "os";
import { Article, Articles } from "@shared/models/Articles";
import { HEADLINE_DIR } from "@shared/consts";
import type { LoadHeadlines } from "@shared/types";

const headlineFolderDir = `${homedir()}/${HEADLINE_DIR}`;

// Load today's headlines from the local file
const loadTodayHeadlines: LoadHeadlines = async () => {
  if (!fs.existsSync(headlineFolderDir)) {
    return undefined;
  }
  try {
    // Get an array of today's files
    const today = new Date().toISOString().slice(0, 10);
    const files = fs.readdirSync(headlineFolderDir);
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

const loadPrevHeadlines: LoadHeadlines = async () => {
  if (!fs.existsSync(headlineFolderDir)) {
    return undefined;
  }
  try {
    // Get an array of prevDate's files
    const prevDate = new Date().toISOString().slice(0, 10);
    const files = fs.readdirSync(headlineFolderDir);
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

// Helper functions

// validate the parsed json file
const isValidData = (data: any): data is { articles: Article[] } => {
  return data && Array.isArray(data.articles);
};

// load files into the array
const processFiles = async (files: string[]): Promise<Article[]> => {
  const existedNews = new Set<string>();
  const news: Article[] = [];
  // Read each file and extract the articles
  await Promise.all(
    files.map(async (file) => {
      try {
        const data = fs.readFileSync(
          `${headlineFolderDir}/${file}`,
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

export { loadPrevHeadlines, loadTodayHeadlines };
