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
