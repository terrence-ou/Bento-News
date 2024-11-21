// File system constants
export const APP_FOLDER = "Documents/IntelliNews";
export const HEADLINE_DIR = APP_FOLDER + "/headlines";
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
  German = "de",
  English = "en",
  Spanish = "es",
  French = "fr",
  Italian = "it",
  Dutch = "nl",
  Norwegian = "no",
  Portuguese = "pt",
  Russian = "ru",
  Swedish = "sv",
  Ukrainian = "uk",
  Chinese = "zh",
}

export enum SortBy {
  Relevance = "relevance",
  Popularity = "popularity",
  "Publish Date" = "publishedAt",
}
