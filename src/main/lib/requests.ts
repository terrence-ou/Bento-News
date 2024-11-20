import { homedir } from "os";
import fs from "fs";
import axios from "axios";
import path from "path";
import type { GetHeadlinesFn } from "@shared/types";
import { HEADLINE_DIR, APP_FOLDER } from "@shared/consts";

// Consts
const headlineFolderDir = `${homedir()}/${HEADLINE_DIR}`;
const endpoint = "https://newsapi.org/v2/top-headlines";

// Functions
const getHeadlines: GetHeadlinesFn = async () => {
  const settings = fs.readFileSync(
    path.join(homedir(), APP_FOLDER, "settings.json"),
    "utf-8"
  );

  let apiKey: string | undefined = undefined;
  let category: string | undefined = undefined;
  let pageSize: number | undefined = undefined;

  const settingsJson = JSON.parse(settings);

  if (settingsJson.keys) {
    apiKey = settingsJson.keys.newsapi;
  }

  if (settingsJson.headline) {
    category = settingsJson.headline.category;
    pageSize = settingsJson.headline.headline_size || 30;
  }

  // create an url with the query parameters
  let url = endpoint + "?";
  url += `apiKey=${apiKey}`;
  url += `&country=us`;
  if (category !== undefined && category !== "all")
    url += `&category=${category}`;
  if (pageSize !== undefined) url += `&pageSize=${pageSize}`;

  try {
    // Get the headlines
    const response = await axios.get(url);
    const data = response.data;

    // Save file to local
    const timestamp = new Date().toISOString().slice(0, 10);
    const filename = `${timestamp}-${category === undefined ? "all" : category}.json`;
    const fileDir = path.join(headlineFolderDir, filename);

    fs.writeFileSync(fileDir, JSON.stringify(data, null, 2), "utf-8");
  } catch (error) {
    console.error(error);
  }
};

export { getHeadlines };
