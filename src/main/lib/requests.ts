// import axios from "axios";
import { Articles } from "@shared/models/Articles";
import { GetHeadlinesFn } from "@shared/types";
import mockData from "./mockdata";

const getHeadlines: GetHeadlinesFn = async (category?, country?) => {
  const articles = new Articles(mockData);
  console.log(articles.articles);
  return articles;
  // const apiKey = process.env.NEWSAPI_KEY;
  // const url = `https://newsapi.org/v2/top-headlines?country=us&apiKey=${apiKey}`;
  // try {
  //   const response = await axios.get(url);
  //   const news = response.data.articles;
  //   const articles = new Articles(news);
  //   console.log(articles.articles.slice(0, 5));
  //   return articles;
  // } catch (error) {
  //   console.error(error);
  //   return undefined;
  // }
  // // console.log(articles);
};

export { getHeadlines };
