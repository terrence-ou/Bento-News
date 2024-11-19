import { homedir } from "os";
import fs from "fs";
import axios from "axios";
import path from "path";
import type { GetHeadlinesFn } from "@shared/types";
import { HEADLINE_DIR } from "@shared/consts";

// Consts
const headlineFolderDir = `${homedir()}/${HEADLINE_DIR}`;
const endpoint = "https://newsapi.org/v2/top-headlines";

// Functions
const getHeadlines: GetHeadlinesFn = async (
  category?,
  country = "us"
) => {
  const apiKey = process.env.NEWSAPI_KEY;

  // create an url with the query parameters
  let url = endpoint + "?";
  url += `apiKey=${apiKey}`;
  if (country !== undefined) url += `&country=${country}`;
  if (category !== undefined) url += `&category=${category}`;

  try {
    // Get the headlines
    const response = await axios.get(url);
    const data = response.data;

    // Save file to local
    const timestamp = new Date().toISOString().slice(0, 10);
    const filename = `${timestamp}-${category === undefined ? "all" : category}-${country}.json`;
    const fileDir = path.join(headlineFolderDir, filename);

    fs.writeFileSync(fileDir, JSON.stringify(data, null, 2), "utf-8");
  } catch (error) {
    console.error(error);
  }
};

export { getHeadlines };
