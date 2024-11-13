import { electronAPI } from "@electron-toolkit/preload";
import { Articles } from "./models/Articles";
import { Countries, Categories } from "./consts";

export type Category = (typeof Categories)[number];
export type Country = (typeof Countries)[number];

// Types for the main process
export type GetHeadlinesFn = (
  category?: Category,
  country?: Country
) => Promise<Articles>;

export type GetVersionsFn = () => Promise<
  typeof electronAPI.process.versions
>;
