import { Articles } from "./models/Articles";
import { Categories } from "./consts";

export type Category = (typeof Categories)[number];

// Types for the main process
export type GetHeadlinesFn = () => Promise<void>;

export type LoadHeadlines = () => Promise<Articles | undefined>;

export type LoadApiKeys = () => Promise<{
  newsapi: string;
  openai: string;
}>;

export type LoadHeadlineSettings = () => Promise<{
  category: Category;
  headline_size: number;
  previous_days: number;
}>;

export type WriteApiKeys = ({
  newsapi,
  openai,
}: {
  newsapi: string;
  openai: string;
}) => Promise<void>;

export type WriteHeadlineSettings = ({
  category,
  headline_size,
  previous_days,
}: {
  category: Category;
  headline_size: number;
  previous_days: number;
}) => Promise<void>;

export type RemoveTodayHeadlines = () => Promise<void>;
