import { Articles } from "./models/Articles";
import { Countries, Categories } from "./consts";

export type Category = (typeof Categories)[number];
export type Country = (typeof Countries)[number];

// Types for the main process
export type GetHeadlinesFn = (
  category?: Category,
  country?: Country
) => Promise<void>;

export type LoadHeadlines = () => Promise<Articles | undefined>;

export type LoadApiKeys = () => Promise<{
  newsapi: string;
  openai: string;
}>;

export type LoadHeadlineSettings = () => Promise<{
  country: Country;
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
  country,
  category,
  headline_size,
  previous_days,
}: {
  country: Country;
  category: Category;
  headline_size: number;
  previous_days: number;
}) => Promise<void>;
