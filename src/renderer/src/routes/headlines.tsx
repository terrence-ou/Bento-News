import { useState, useMemo } from "react";
import { Article, Articles } from "@shared/models/Articles";
import { useLoaderData } from "react-router-dom";
import { Settings } from "lucide-react";
import { cn } from "@/utils";
import NewsCard from "@/components/NewsCard";
import useResize from "@/hooks/useResize";
import { Button } from "@/components/ui/button";

type HeadlinesLoaderData = {
  todayHeadlines: Articles;
  prevHeadlines: Articles;
  prevDays: number;
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

// loader
export const loader = async () => {
  const [todayHeadlines, prevHeadlines, prevDays] = await Promise.all(
    [
      // load today's headlines
      window.context.loadTodayHeadlines().then(async (headlines) => {
        if (headlines === undefined) {
          await window.context.getHeadlines();
          return window.context.loadTodayHeadlines();
        }
        return headlines;
      }),
      // load previous headlines
      window.context.loadPrevHeadlines(),
      window.context
        .loadHeadlineSettings()
        .then(async (settings) => settings.previous_days),
    ]
  );
  return {
    todayHeadlines: todayHeadlines || new Articles([]),
    prevHeadlines: prevHeadlines || new Articles([]),
    prevDays,
  };
};

// ========== The body of Headlines page =========

const Headlines = () => {
  const data = useLoaderData() as HeadlinesLoaderData;
  const { todayHeadlines, prevHeadlines, prevDays } = data;
  const [todayExtendCount, setTodayExtendCount] = useState<number>(0);
  const [prevExtendCount, setPrevExtendCount] = useState<number>(0);

  const handleSetTodayExtendedCount = (count: number) => {
    setTodayExtendCount((prevCount) => prevCount + count);
  };

  const handleSetPrevExtendedCount = (count: number) => {
    setPrevExtendCount((prevCount) => prevCount + count);
  };

  // get number of columns based on window width
  const { cols, defaultDisplayCount, gridCols } = useResize();

  // group articles into columns
  const totalTodayDisplayCount = Math.min(
    defaultDisplayCount + todayExtendCount,
    todayHeadlines.articles.length
  );

  const totalPrevDisplayCount = Math.min(
    defaultDisplayCount + prevExtendCount,
    prevHeadlines.articles.length
  );

  const todayArticleGroups = useMemo(
    () => groupArticles(todayHeadlines, cols, totalTodayDisplayCount),
    [todayHeadlines, cols, todayExtendCount]
  );

  const prevArticleGroups = useMemo(
    () => groupArticles(prevHeadlines, cols, totalPrevDisplayCount),
    [prevHeadlines, cols, prevExtendCount]
  );

  return (
    <div className="p-6">
      <h1 className="font-serif font-semibold text-3xl my-6 mx-2">
        Today's Headlines
      </h1>
      <div className={cn("grid gap-x-5 my-3", gridCols)}>
        {todayHeadlines.articles &&
          todayArticleGroups.map((group, i) => (
            <div key={`col-${i}`} className="flex flex-col gap-4">
              {group.map((article) => (
                <NewsCard key={article.title} article={article} />
              ))}
            </div>
          ))}
      </div>
      {todayHeadlines.articles.length === 0 && (
        <div className="px-5 h-36 w-full content-center">
          <p className="flex text-primary/40 text-xl items-center justify-center">
            Failed to fetch today's headlines. Please click the
            <span>
              <Settings
                className="stroke-primary/40 w-6 h-6 mx-2"
                strokeWidth={"1.5px"}
              />
            </span>{" "}
            button and check NewAPI key.
          </p>
        </div>
      )}
      {totalTodayDisplayCount < todayHeadlines.articles.length && (
        <div className="flex w-full justify-center">
          <Button
            onClick={() =>
              handleSetTodayExtendedCount(defaultDisplayCount)
            }
          >
            Load more
          </Button>
        </div>
      )}
      <div className="w-full my-10 h-2 border-b-2 border-dotted border-primary/50"></div>
      <h1 className="font-serif font-semibold text-3xl mt-14 mb-6 mx-2">
        {`Past ${prevDays} Days`}
      </h1>
      <div className={cn("grid gap-x-5 my-3", gridCols)}>
        {prevArticleGroups.map((group, i) => (
          <div key={`col-${i}`} className="flex flex-col gap-4">
            {group.map((article) => (
              <NewsCard key={article.title} article={article} />
            ))}
          </div>
        ))}
      </div>
      {prevHeadlines.articles.length === 0 && (
        <div className="px-5 h-36 w-full content-center">
          <p className="text-center text-primary/40 text-xl">
            No previous headlines available.
          </p>
        </div>
      )}
      {totalPrevDisplayCount < prevHeadlines.articles.length && (
        <div className="flex w-full justify-center">
          <Button
            onClick={() =>
              handleSetPrevExtendedCount(defaultDisplayCount)
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
