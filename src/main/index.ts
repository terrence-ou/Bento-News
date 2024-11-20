import { app, shell, BrowserWindow, ipcMain } from "electron";
import { join } from "path";
import { electronApp, optimizer, is } from "@electron-toolkit/utils";

import icon from "../../resources/icon.png?asset";
import {
  getHeadlines,
  loadTodayHeadlines,
  loadPrevHeadlines,
  loadApiKeys,
  writeApiKeys,
  removeTodayHeadlines,
  ensureProjectFiles,
  loadHeadlineSettings,
  writeHeadlineSettings,
} from "@/lib";
import {
  GetHeadlinesFn,
  LoadApiKeys,
  LoadHeadlines,
  LoadHeadlineSettings,
  WriteApiKeys,
  WriteHeadlineSettings,
  RemoveTodayHeadlines,
} from "@shared/types";

function createWindow(): void {
  // Create the browser window.
  const mainWindow = new BrowserWindow({
    width: 1200,
    height: 900,
    minWidth: 800,
    minHeight: 600,
    show: false,
    icon: icon,
    titleBarStyle: "hiddenInset",
    ...(process.platform === "linux" ? { icon } : {}),
    webPreferences: {
      preload: join(__dirname, "../preload/index.js"),
      sandbox: true,
      contextIsolation: true,
      spellcheck: false,
    },
  });

  mainWindow.on("ready-to-show", () => {
    mainWindow.show();
  });

  mainWindow.webContents.setWindowOpenHandler((details) => {
    shell.openExternal(details.url);
    return { action: "deny" };
  });

  // HMR for renderer base on electron-vite cli.
  // Load the remote URL for development or the local html file for production.
  if (is.dev && process.env["ELECTRON_RENDERER_URL"]) {
    mainWindow.loadURL(process.env["ELECTRON_RENDERER_URL"]);
  } else {
    mainWindow.loadFile(join(__dirname, "../renderer/index.html"));
  }
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady().then(() => {
  // Set app user model id for windows
  electronApp.setAppUserModelId("com.electron");

  // Default open or close DevTools by F12 in development
  // and ignore CommandOrControl + R in production.
  // see https://github.com/alex8088/electron-toolkit/tree/master/packages/utils
  app.on("browser-window-created", (_, window) => {
    optimizer.watchWindowShortcuts(window);
  });

  createWindow();
  ensureProjectFiles();

  app.on("activate", function () {
    // On macOS it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });

  // Initialize settings configuration

  // IPC events

  ipcMain.handle(
    "getHeadlines",
    (_, ...args: Parameters<GetHeadlinesFn>) => getHeadlines(...args)
  );

  ipcMain.handle(
    "loadTodayHeadlines",
    (_, ...args: Parameters<LoadHeadlines>) =>
      loadTodayHeadlines(...args)
  );

  ipcMain.handle(
    "loadPrevHeadlines",
    (_, ...args: Parameters<LoadHeadlines>) =>
      loadPrevHeadlines(...args)
  );

  // Settings
  ipcMain.handle(
    "loadApiKeys",
    (_, ...args: Parameters<LoadApiKeys>) => loadApiKeys(...args)
  );

  ipcMain.handle(
    "loadHeadlineSettings",
    (_, ...args: Parameters<LoadHeadlineSettings>) =>
      loadHeadlineSettings(...args)
  );

  ipcMain.handle(
    "writeApiKeys",
    (_, ...args: Parameters<WriteApiKeys>) => writeApiKeys(...args)
  );

  ipcMain.handle(
    "writeHeadlineSettings",
    (_, ...args: Parameters<WriteHeadlineSettings>) =>
      writeHeadlineSettings(...args)
  );

  ipcMain.handle(
    "removeTodayHeadlines",
    (_, ...args: Parameters<RemoveTodayHeadlines>) =>
      removeTodayHeadlines(...args)
  );
});

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});

// In this file you can include the rest of your app"s specific main process
// code. You can also put them in separate files and require them here.
