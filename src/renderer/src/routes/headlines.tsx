import { useState, useMemo } from "react";
import { Article, Articles } from "@shared/models/Articles";
import { useLoaderData } from "react-router-dom";
import NewsCard from "@/components/NewsCard";
import { cn } from "@/utils";
import useResize from "@/hooks/useResize";
import { Button } from "@/components/ui/button";

type HeadlinesLoaderData = {
  todayHeadlines: Articles;
  prevHeadlines: Articles;
};

// Helper function to group articles into columns
const groupArticles = (
  articles: Articles,
  cols: number,
  displayCount?: number
) => {
  // create empty groups
  const groups: Article[][] = Array.from({ length: cols }, () => []);
  // fill groups with articles
  displayCount = displayCount || articles.articles.length;
  for (let i = 0; i < displayCount; i++) {
    groups[i % cols].push(articles.articles[i]);
  }
  return groups;
};

// The body of Headlines component
const Headlines = () => {
  const data = useLoaderData() as HeadlinesLoaderData;
  const [extendedCount, setExtendedCount] = useState<number>(0);
  const { todayHeadlines, prevHeadlines } = data;

  const handleSetExtendedCount = (count: number) => {
    setExtendedCount((prevCount) => prevCount + count);
  };

  // get number of columns based on window width
  const { cols } = useResize();

  let gridCols = "grid-cols-4";
  let defaultDisplayCount = 16;

  // update gridCols based on number of columns
  switch (cols) {
    case 3:
      gridCols = "grid-cols-3";
      defaultDisplayCount = 12;
      break;
    case 5:
      gridCols = "grid-cols-5";
      defaultDisplayCount = 20;
      break;
    case 6:
      gridCols = "grid-cols-6";
      defaultDisplayCount = 24;
      break;
    default:
      gridCols = "grid-cols-4";
      defaultDisplayCount = 16;
  }

  // group articles into columns
  const todayArticleGroups = useMemo(
    () => groupArticles(todayHeadlines, cols),
    [todayHeadlines, cols]
  );

  const totalDisplayCount = Math.min(
    defaultDisplayCount + extendedCount,
    prevHeadlines.articles.length
  );

  const prevArticleGroups = useMemo(
    () => groupArticles(prevHeadlines, cols, totalDisplayCount),
    [prevHeadlines, cols, extendedCount]
  );

  return (
    <div className="p-6">
      <h1 className="font-serif text-2xl mb-4">Headlines</h1>
      <div className={cn("grid gap-x-5 my-3", gridCols)}>
        {todayArticleGroups.map((group, i) => (
          <div key={`col-${i}`} className="flex flex-col gap-4">
            {group.map((article) => (
              <NewsCard key={article.title} article={article} />
            ))}
          </div>
        ))}
      </div>
      <h1 className="font-serif text-2xl pb-2 mt-12">Previous</h1>
      <div className={cn("grid gap-x-5 my-3", gridCols)}>
        {prevArticleGroups.map((group, i) => (
          <div key={`col-${i}`} className="flex flex-col gap-4">
            {group.map((article) => (
              <NewsCard key={article.title} article={article} />
            ))}
          </div>
        ))}
      </div>
      {totalDisplayCount < prevHeadlines.articles.length && (
        <div className="flex w-full justify-center">
          <Button
            onClick={() =>
              handleSetExtendedCount(defaultDisplayCount)
            }
          >
            Load more
          </Button>
        </div>
      )}
    </div>
  );
};

export default Headlines;
