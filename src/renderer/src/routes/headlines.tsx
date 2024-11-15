import { useEffect, useMemo, useState } from "react";
import { Article, Articles } from "@shared/models/Articles";
import { useLoaderData } from "react-router-dom";
import NewsCard from "@/components/NewsCard";
import { cn } from "@/utils";

type HeadlinesLoaderData = {
  todayHeadlines: Articles;
  prevHeadlines: Articles;
};

// Helper function to group articles into columns
const groupArticles = (articles: Articles, cols: number) => {
  // create empty groups
  const groups: Article[][] = Array.from({ length: cols }, () => []);
  // fill groups with articles
  for (let i = 0; i < articles.articles.length; i++) {
    groups[i % cols].push(articles.articles[i]);
  }
  return groups;
};

const Headlines = () => {
  const data = useLoaderData() as HeadlinesLoaderData;
  const { todayHeadlines, prevHeadlines } = data;
  const [cols, setCols] = useState<number>(4);

  // group articles into columns
  const todayArticleGroups = useMemo(
    () => groupArticles(todayHeadlines, cols),
    [todayHeadlines, cols]
  );

  const prevArticleGroups = useMemo(
    () => groupArticles(prevHeadlines, cols),
    [prevHeadlines, cols]
  );

  // TODO: use useEffect to update cols based on window size
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 1024) {
        setCols(3);
      } else if (window.innerWidth < 1600) {
        setCols(4);
      } else if (window.innerWidth < 2000) {
        setCols(5);
      } else {
        setCols(6);
      }
    };

    // debounding the resize event
    const debounce = (callback: () => void, wait: number) => {
      let timeout: NodeJS.Timeout;
      return () => {
        clearTimeout(timeout);
        timeout = setTimeout(callback, wait);
      };
    };

    handleResize(); // we need to call this once to set the initial value
    const deboundResize = debounce(handleResize, 100);
    window.addEventListener("resize", deboundResize);
    return () => window.removeEventListener("resize", deboundResize);
  }, []);

  let gridCols = "grid-cols-4";

  // update gridCols based on number of columns
  switch (cols) {
    case 3:
      gridCols = "grid-cols-3";
      break;
    case 4:
      gridCols = "grid-cols-4";
      break;
    case 5:
      gridCols = "grid-cols-5";
      break;
    case 6:
      gridCols = "grid-cols-6";
      break;
    default:
      gridCols = "grid-cols-4";
  }

  return (
    <div className="p-6 max-h-full">
      <h1 className="font-serif text-2xl mb-4">Headlines</h1>
      <div className={cn("grid gap-y-2 gap-x-4 my-3", gridCols)}>
        {todayArticleGroups.map((group, i) => (
          <div key={`col-${i}`} className="flex flex-col gap-3">
            {group.map((article) => (
              <NewsCard key={article.title} article={article} />
            ))}
          </div>
        ))}
      </div>
      <h1 className="font-serif text-2xl pb-2">Previous</h1>
      <div className={cn("grid gap-y-2 gap-x-4 my-3", gridCols)}>
        {prevArticleGroups.map((group, i) => (
          <div key={`col-${i}`} className="flex flex-col gap-3">
            {group.map((article) => (
              <NewsCard key={article.title} article={article} />
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Headlines;
