import { contextBridge } from "electron";
import { ipcRenderer } from "electron/renderer";
import {
  LoadHeadlines,
  GetHeadlinesFn,
  LoadHeadlineSettings,
  WriteHeadlineSettings,
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
    loadTodayHeadlines: (...args: Parameters<LoadHeadlines>) =>
      ipcRenderer.invoke("loadTodayHeadlines", ...args),
    loadPrevHeadlines: (...args: Parameters<LoadHeadlines>) =>
      ipcRenderer.invoke("loadPrevHeadlines", ...args),
    // Settings
    loadApiKeys: (...args: Parameters<LoadHeadlines>) =>
      ipcRenderer.invoke("loadApiKeys", ...args),
    loadHeadlineSettings: (
      ...args: Parameters<LoadHeadlineSettings>
    ) => ipcRenderer.invoke("loadHeadlineSettings", ...args),
    writeApiKeys: (...args: Parameters<LoadHeadlines>) =>
      ipcRenderer.invoke("writeApiKeys", ...args),
    writeHeadlineSettings: (
      ...args: Parameters<WriteHeadlineSettings>
    ) => ipcRenderer.invoke("writeHeadlineSettings", ...args),
  });
} catch (error) {
  console.error(
    "Error occured when establishing context bridge: ",
    error
  );
}
