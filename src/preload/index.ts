import { contextBridge } from "electron";
import { ipcRenderer } from "electron/renderer";
import type {
  LoadHeadlinesFn,
  GetHeadlinesFn,
  LoadHeadlineSettingsFn,
  WriteHeadlineSettingsFn,
  RemoveTodayHeadlinesFn,
  GetSearchResultsFn,
  LoadSearchResultsFn,
  LoadUserFoldersFn,
  LoadFolderContentsFn,
  LoadFolderCoverImgFn,
  ManageFolderFn,
  ManageFolderArticleFn,
  getOpenAIResponseFn,
} from "@shared/types";

// The preload process plays a middleware role in bridging
// the call from the front end, and the function in the main process

if (!process.contextIsolated) {
  throw new Error(
    "Context isolation must be enabled in the Browser window"
  );
}

try {
  // Front end can call the function by using window.context.<Function name>
  contextBridge.exposeInMainWorld("context", {
    getHeadlines: (...args: Parameters<GetHeadlinesFn>) =>
      ipcRenderer.invoke("getHeadlines", ...args),
    getSearchResults: (...args: Parameters<GetSearchResultsFn>) =>
      ipcRenderer.invoke("getSearchResults", ...args),
    getOpenAIResponse: (...args: Parameters<getOpenAIResponseFn>) =>
      ipcRenderer.invoke("getOpenAIResponse", ...args),
    loadTodayHeadlines: (...args: Parameters<LoadHeadlinesFn>) =>
      ipcRenderer.invoke("loadTodayHeadlines", ...args),
    loadPrevHeadlines: (...args: Parameters<LoadHeadlinesFn>) =>
      ipcRenderer.invoke("loadPrevHeadlines", ...args),
    loadSearchResults: (...args: Parameters<LoadSearchResultsFn>) =>
      ipcRenderer.invoke("loadSearchResults", ...args),
    loadFolderCoverImg: (...args: Parameters<LoadFolderCoverImgFn>) =>
      ipcRenderer.invoke("loadFolderCoverImg", ...args),
    // Settings
    loadApiKeys: (...args: Parameters<LoadHeadlinesFn>) =>
      ipcRenderer.invoke("loadApiKeys", ...args),
    loadHeadlineSettings: (
      ...args: Parameters<LoadHeadlineSettingsFn>
    ) => ipcRenderer.invoke("loadHeadlineSettings", ...args),
    writeApiKeys: (...args: Parameters<LoadHeadlinesFn>) =>
      ipcRenderer.invoke("writeApiKeys", ...args),
    writeHeadlineSettings: (
      ...args: Parameters<WriteHeadlineSettingsFn>
    ) => ipcRenderer.invoke("writeHeadlineSettings", ...args),
    removeTodayHeadlines: (
      ...args: Parameters<RemoveTodayHeadlinesFn>
    ) => ipcRenderer.invoke("removeTodayHeadlines", ...args),
    // folders
    loadUserFolders: (...args: Parameters<LoadUserFoldersFn>) =>
      ipcRenderer.invoke("loadUserFolders", ...args),
    loadFolderContents: (...args: Parameters<LoadFolderContentsFn>) =>
      ipcRenderer.invoke("loadFolderContents", ...args),
    createUserFolder: (...args: Parameters<ManageFolderFn>) =>
      ipcRenderer.invoke("createUserFolder", ...args),
    removeUserFolder: (...args: Parameters<ManageFolderFn>) =>
      ipcRenderer.invoke("removeUserFolder", ...args),
    addArticleToFolder: (
      ...args: Parameters<ManageFolderArticleFn>
    ) => ipcRenderer.invoke("addArticleToFolder", ...args),
    removeArticleFromFolder: (
      ...args: Parameters<ManageFolderArticleFn>
    ) => ipcRenderer.invoke("removeArticleFromFolder", ...args),
  });
} catch (error) {
  console.error(
    "Error occured when establishing context bridge: ",
    error
  );
}
