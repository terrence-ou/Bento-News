import { Articles, Article } from "./models/Articles";
import { Categories, SubEditor } from "./consts";

export type Category = (typeof Categories)[number];
export type SearchParams = {
  keywords?: string;
  language?: string;
  sortBy?: string;
  from?: string;
  to?: string;
};
export type FolderContents = {
  articles: Article[];
  generated_contents: {
    summary: string;
    trends: string;
    suggestions: string;
    report: string;
  };
};

// ======== Types for the main process ========

// Folders
export type ManageFolderFn = (folderName: string) => Promise<boolean>;
export type ManageFolderArticleFn = (
  article: Article,
  folderName: string
) => Promise<boolean>;

// Requests
export type GetHeadlinesFn = () => Promise<void>;
export type GetSearchResultsFn = (
  searchParams: SearchParams
) => Promise<void>;
export type getOpenAIResponseFn = (
  folder: string,
  editor: SubEditor,
  news: string
) => Promise<string>;

// Loaders
export type LoadHeadlinesFn = () => Promise<Articles | undefined>;
export type LoadSearchResultsFn = () => Promise<Articles | undefined>;

export type LoadApiKeysFn = () => Promise<{
  newsapi: string;
  openai: string;
}>;

export type LoadHeadlineSettingsFn = () => Promise<{
  category: Category;
  headline_size: number;
  previous_days: number;
}>;

export type LoadUserFoldersFn = () => Promise<string[]>;
export type LoadFolderContentsFn = (
  folder: string
) => Promise<FolderContents>;

// Writers
export type WriteApiKeysFn = ({
  newsapi,
  openai,
}: {
  newsapi: string;
  openai: string;
}) => Promise<void>;

export type WriteHeadlineSettingsFn = ({
  category,
  headline_size,
  previous_days,
}: {
  category: Category;
  headline_size: number;
  previous_days: number;
}) => Promise<void>;

export type RemoveTodayHeadlinesFn = () => Promise<void>;
