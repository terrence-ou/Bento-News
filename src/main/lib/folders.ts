import fs from "fs";
import path from "path";
import { homedir } from "os";
import {
  APP_FOLDER,
  SEARCH_DIR,
  HEADLINE_DIR,
  USER_FOLDERS_DIR,
  SAVED_ARTICLES_FILENAME,
  GENERATED_CONTENTS_FILENAME,
} from "@shared/consts";
import type {
  ManageFolderFn,
  LoadUserFoldersFn,
  LoadFolderContentsFn,
  FolderContents,
  ManageFolderArticleFn,
} from "@shared/types";

const projectFolder = path.join(homedir(), APP_FOLDER);
const headlinesFolder = path.join(homedir(), HEADLINE_DIR);
const searchFolder = path.join(homedir(), SEARCH_DIR);
const userFolder = path.join(homedir(), USER_FOLDERS_DIR);
const settingsFile = path.join(
  homedir(),
  APP_FOLDER,
  "settings.json"
);

// ============ Folder Management =============

// Ensure project folder setup
const ensureProjectFiles = () => {
  for (const folder of [
    projectFolder,
    headlinesFolder,
    searchFolder,
    userFolder,
  ]) {
    if (!fs.existsSync(folder)) {
      fs.mkdirSync(folder, { recursive: true });
    }
    if (folder === userFolder) {
      const subFolders = fs
        .readdirSync(folder, { withFileTypes: true })
        .filter((dirent) => dirent.isDirectory()).length;
      if (subFolders === 0) {
        fs.mkdirSync(path.join(folder, "default"), {
          recursive: true,
        });
      }
    }
  }
  if (!fs.existsSync(settingsFile))
    fs.writeFileSync(
      settingsFile,
      JSON.stringify({}, null, 2),
      "utf-8"
    );
};

const createUserFolder: ManageFolderFn = async (folderName) => {
  if (
    fs.existsSync(
      path.join(
        userFolder,
        folderName || new Date().toISOString().slice(0, 10)
      )
    )
  ) {
    return false;
  }
  try {
    fs.mkdirSync(path.join(userFolder, folderName), {
      recursive: true,
    });
    return true;
  } catch (error) {
    console.error("Error creating user folder. [ERROR]: ", error);
    return false;
  }
};

const removeUserFolder: ManageFolderFn = async (
  folderName: string
) => {
  const folderPath = path.join(userFolder, folderName);
  if (!fs.existsSync(folderPath)) {
    return false;
  }
  try {
    fs.rmSync(folderPath, { recursive: true, force: true });
    return true;
  } catch (error) {
    console.error("Error removing user folder. [ERROR]: ", error);
    return false;
  }
};

// Load user's news folders
const loadUserFolders: LoadUserFoldersFn = async () => {
  try {
    const folders = fs
      .readdirSync(userFolder)
      .map((folder) => ({
        name: folder,
        time: fs
          .statSync(path.join(userFolder, folder))
          .birthtime.getTime(),
      }))
      .sort((a, b) => a.time - b.time)
      .map((folder) => folder.name);
    return folders.filter((folder) => folder !== ".DS_Store");
  } catch (error) {
    console.error("Error loading user's folders. [ERROR]: ", error);
    return [];
  }
};

// Load user folder's content
const loadFolderContents: LoadFolderContentsFn = async (
  folder: string
) => {
  const folderPath = path.join(userFolder, folder);
  const savedArticlesFilePath = path.join(
    folderPath,
    SAVED_ARTICLES_FILENAME
  );
  const generatedContentsFilePath = path.join(
    folderPath,
    GENERATED_CONTENTS_FILENAME
  );
  ensureFolderContents(folder);
  try {
    const [savedArticlesFile, generatedContentsFile] =
      await Promise.all([
        fs.readFileSync(savedArticlesFilePath, "utf-8"),
        fs.readFileSync(generatedContentsFilePath, "utf-8"),
      ]);
    const savedArticles = JSON.parse(savedArticlesFile);
    const generatedContents = JSON.parse(generatedContentsFile);
    return {
      articles: savedArticles.articles,
      generated_contents: generatedContents.generated_contents,
    } as FolderContents;
  } catch (error) {
    console.error("Error loading folder content. [ERROR]: ", error);
    return {
      articles: [],
      generated_contents: {
        summary: "",
        trends: "",
        suggestions: "",
        report: "",
      },
    } as FolderContents;
  }
};

// ================== Folder Content ==================

// Add article to folder
const addArticleToFolder: ManageFolderArticleFn = async (
  article,
  folderName
) => {
  try {
    const filename = path.join(
      userFolder,
      folderName,
      SAVED_ARTICLES_FILENAME
    );
    const fileContent = fs.readFileSync(filename, "utf-8");
    const articles = JSON.parse(fileContent).articles;
    if (articles.some((curr) => curr.title === article.title)) {
      return false;
    }
    articles.push(article);
    fs.writeFileSync(
      filename,
      JSON.stringify({ articles }, null, 2),
      "utf-8"
    );
    return true;
  } catch (error) {
    console.error("Error adding article to folder. [ERROR]: ", error);
    return false;
  }
};

// ================== Helper Functions ==================

// Ensure folder has articles and generated contents files
const ensureFolderContents = (folder: string) => {
  const folderPath = path.join(userFolder, folder);
  const savedArticlesFile = path.join(
    folderPath,
    SAVED_ARTICLES_FILENAME
  );
  const generatedContentsFile = path.join(
    folderPath,
    GENERATED_CONTENTS_FILENAME
  );
  if (!fs.existsSync(savedArticlesFile)) {
    fs.writeFileSync(
      savedArticlesFile,
      JSON.stringify({ articles: [] }, null, 2),
      "utf-8"
    );
  }
  if (!fs.existsSync(generatedContentsFile)) {
    fs.writeFileSync(
      generatedContentsFile,
      JSON.stringify(
        {
          generated_contents: {
            summary: "",
            trends: "",
            suggestions: "",
            report: "",
          },
        },
        null,
        2
      ),
      "utf-8"
    );
  }
};

export {
  ensureProjectFiles,
  createUserFolder,
  loadUserFolders,
  loadFolderContents,
  removeUserFolder,
  addArticleToFolder,
};
