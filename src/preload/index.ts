import { contextBridge } from "electron";
import { ipcRenderer } from "electron/renderer";
import { LoadHeadlines, GetHeadlinesFn } from "@shared/types";

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
    writeApiKeys: (...args: Parameters<LoadHeadlines>) =>
      ipcRenderer.invoke("writeApiKeys", ...args),
  });
} catch (error) {
  console.error(
    "Error occured when establishing context bridge: ",
    error
  );
}
