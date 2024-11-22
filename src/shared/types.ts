import { Articles } from "./models/Articles";
import { Categories } from "./consts";

export type Category = (typeof Categories)[number];
export type SearchParams = {
  keywords?: string;
  language?: string;
  sortBy?: string;
  from?: string;
  to?: string;
};

// Types for the main process
export type GetHeadlinesFn = () => Promise<void>;
export type GetSearchResultsFn = (
  searchParams: SearchParams
) => Promise<void>;

export type LoadHeadlinesFn = () => Promise<Articles | undefined>;

export type LoadApiKeysFn = () => Promise<{
  newsapi: string;
  openai: string;
}>;

export type LoadHeadlineSettingsFn = () => Promise<{
  category: Category;
  headline_size: number;
  previous_days: number;
}>;

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
