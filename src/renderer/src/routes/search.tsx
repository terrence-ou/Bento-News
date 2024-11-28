import { useMemo, useState } from "react";
import { useAtom } from "jotai";
import { useLoaderData } from "react-router-dom";
import { ScanSearch as SearchIcon } from "lucide-react";
import {
  searchBoxExpandedAtom,
  displaySortByAtom,
  searchLayoutAtom,
} from "@/atoms/searchAtoms";
import { cn } from "@/utils";
import { Article, Articles } from "@shared/models/Articles";
import useResize from "@/hooks/useResize";
import SearchBox from "@/components/SearchBox";
import NewsCardFixed from "@/components/search/NewsCardFixed";
import { Button } from "@/components/ui/button";
import LayoutControl from "@/components/search/LayoutControl";
import NewsCardRow from "@/components/search/NewsCardRow";

// ========== helper functions ==========

const sortArticles = (articles: Article[], sortBy: string) => {
  return articles.sort((a, b) => {
    if (sortBy === "date-new") {
      return (
        new Date(b.publishedAt).getTime() -
        new Date(a.publishedAt).getTime()
      );
    } else if (sortBy === "date-old") {
      return (
        new Date(a.publishedAt).getTime() -
        new Date(b.publishedAt).getTime()
      );
    } else if (sortBy === "source-a-z") {
      return a.source.name.localeCompare(b.source.name);
    } else {
      return b.source.name.localeCompare(a.source.name);
    }
  });
};

// load search results
export const loader = async () => {
  const searchResults = await window.context.loadSearchResults();
  return searchResults || new Articles([]);
};

// ========== The body of Search page ==========
const Search = () => {
  const data = useLoaderData() as Articles;
  const [sortBy] = useAtom(displaySortByAtom);
  const [layout] = useAtom(searchLayoutAtom);
  const { defaultDisplayCount, gridCols } = useResize();
  const [expanded, setExpanded] = useAtom(searchBoxExpandedAtom);

  const handleSetExpanded = (value: boolean) => {
    setExpanded(value);
  };

  const [extendCount, setExtendCount] = useState<number>(0);
  const handleSetExpandedCount = () => {
    setExtendCount((prevCount) => prevCount + defaultDisplayCount);
  };

  const sortedData = useMemo(
    () => sortArticles(data.articles, sortBy),
    [data, sortBy]
  );

  return (
    <div
      className="h-full w-full flex flex-col"
      // use onMouseDown instead of onClick to prevent the event triggered by selecting text in search box
      onMouseDown={() => expanded && handleSetExpanded(false)}
    >
      <div className="p-6">
        <div className="flex justify-between items-center">
          <h1 className="font-serif font-semibold text-3xl my-6 mx-2">
            Search Results
          </h1>
          <LayoutControl />
        </div>
        {/* No result */}
        {sortedData.length === 0 && (
          <div className="absolute w-full h-full text-center content-center">
            <h1 className="text-2xl text-primary/40">
              No search result available. Try to start a new search.
            </h1>
          </div>
        )}
        {/* Have results */}
        {sortedData.length > 0 && (
          <div
            className={cn(
              "grid gap-x-5 gap-y-3 transition-all duration-200",
              layout === "mini" && "gap-6",
              layout !== "list"
                ? gridCols
                : "grid-cols-1 xl:grid-cols-2 gap-y-4"
            )}
          >
            {sortedData
              .slice(0, defaultDisplayCount + extendCount)
              .map((article) => {
                if (layout === "list") {
                  return (
                    <NewsCardRow
                      key={article.title}
                      article={article}
                    />
                  );
                }
                return (
                  <NewsCardFixed
                    key={article.title}
                    article={article}
                  />
                );
              })}
          </div>
        )}
      </div>
      {/* Load more button */}
      {defaultDisplayCount + extendCount < sortedData.length && (
        <div className="flex w-full justify-center pb-6">
          <Button onClick={handleSetExpandedCount}>Load more</Button>
        </div>
      )}
      {/* Search box */}
      <div
        className={cn(
          "absolute flex justify-center items-center bottom-12 right-12 md:bottom-20 md:right-20 bg-primary transition-all duration-200 overflow-hidden",
          !expanded
            ? "w-16 h-16 rounded-[50%] opacity-40 hover:cursor-pointer hover:opacity-90"
            : "w-80 h-[475px] rounded-[10px] opacity-100 bg-background border-[1.5px] border-dashed border-primary/50 shadow-news-card"
        )}
        // use onMouseDown instead of onClick to prevent the event triggered by selecting text in search box
        onMouseDown={(e) => e.stopPropagation()}
      >
        {!expanded && (
          <SearchIcon
            size={46}
            strokeWidth={1.5}
            className="stroke-background"
            onClick={() => handleSetExpanded(true)}
          />
        )}
        {expanded && (
          <SearchBox onClose={() => handleSetExpanded(false)} />
        )}
      </div>
    </div>
  );
};

export default Search;
