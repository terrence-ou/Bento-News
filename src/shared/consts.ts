// File system constants
export const APP_FOLDER = "Documents/IntelliNews";
export const HEADLINE_DIR = APP_FOLDER + "/headlines";
export const SEARCH_DIR = APP_FOLDER + "/search";
export const USER_FOLDERS_DIR = APP_FOLDER + "/user_folders";

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
