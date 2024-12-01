// File system constants
export const APP_FOLDER = "Documents/IntelliNews";
export const HEADLINE_DIR = APP_FOLDER + "/headlines";
export const SEARCH_DIR = APP_FOLDER + "/search";
export const USER_FOLDERS_DIR = APP_FOLDER + "/user_folders";
export const SEARCH_RESULTS_FILENAME = "search_results.json";
export const SAVED_ARTICLES_FILENAME = "saved_articles.json";
export const GENERATED_CONTENTS_FILENAME = "generated_contents.json";

// News API - related constants
export const Categories = [
  "all",
  "business",
  "entertainment",
  "general",
  "health",
  "science",
  "sports",
  "technology",
] as const;

// maybe convert them into the native language
export enum LanguageCodes {
  Arabic = "ar",
  Chinese = "zh",
  Dutch = "nl",
  English = "en",
  French = "fr",
  German = "de",
  Italian = "it",
  Norwegian = "no",
  Portuguese = "pt",
  Russian = "ru",
  Spanish = "es",
  Swedish = "sv",
  Ukrainian = "uk",
}

export enum SortBy {
  Relevance = "relevance",
  Popularity = "popularity",
  "Publish Date" = "publishedAt",
}

export enum SubEditor {
  summary = "summary",
  trend = "trend-analysis",
  suggestion = "suggested-topics",
  write = "write",
}
