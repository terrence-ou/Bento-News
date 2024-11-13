import { electronAPI } from "@electron-toolkit/preload";
import { GetVersionsFn } from "@shared/types";
import { getHeadline } from "./requests";
export * from "./requests";

// Thie file stores functions used for the front-end
// to communicate with the main process directly

export const getVersions: GetVersionsFn = async () => {
  const versions = electronAPI.process.versions;
  return versions;
};

export const triggerIPC = () => {
  console.log("IPC invoked in console");
  console.log(process.env.NEWSAPI_KEY);
  getHeadline();
};