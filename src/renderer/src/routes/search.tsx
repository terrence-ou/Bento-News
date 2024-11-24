import { useEffect, useState } from "react";
import { useAtom } from "jotai";
import { useLoaderData } from "react-router-dom";
import {
  ScanSearch as SearchIcon,
  Newspaper,
  StickyNote,
  LayoutList,
  ArrowDownNarrowWide,
} from "lucide-react";
import { searchBoxExpandedAtom } from "@/atoms/searchAtoms";
import { cn } from "@/utils";
import { Articles } from "@shared/models/Articles";
import useResize from "@/hooks/useResize";
import SearchBox from "@/components/SearchBox";
import NewsCardFixed from "@/components/search/NewsCardFixed";
import { Button } from "@/components/ui/button";

const Search = () => {
  const data = useLoaderData() as Articles;
  const { defaultDisplayCount, gridCols } = useResize();
  const [expanded, setExpanded] = useAtom(searchBoxExpandedAtom);
  const handleSetExpanded = (value: boolean) => {
    setExpanded(value);
  };

  const [extendCount, setExtendCount] = useState<number>(0);
  const handleSetExpandedCount = () => {
    setExtendCount((prevCount) => prevCount + defaultDisplayCount);
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

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
          <div className="flex gap-4">
            <Newspaper className="w-6 stroke-[1.5px] stroke-primary/70" />
            <StickyNote className="w-6 stroke-[1.5px] stroke-primary/70" />
            <LayoutList className="w-6 stroke-[1.5px] stroke-primary/70" />
            <ArrowDownNarrowWide className="w-6 stroke-[1.5px] stroke-primary/70" />
          </div>
        </div>
        {/* No result */}
        {data.articles.length === 0 && (
          <div className="absolute w-full h-full text-center content-center">
            <h1 className="text-2xl text-primary/40">
              No search result available. Try to start a new search.
            </h1>
          </div>
        )}
        {data.articles.length > 0 && (
          <div
            className={cn(
              "grid gap-x-5 gap-y-3 transition-all duration-200",
              gridCols
            )}
          >
            {data.articles
              .slice(0, defaultDisplayCount + extendCount)
              .map((article) => (
                <NewsCardFixed
                  key={article.title}
                  article={article}
                />
              ))}
          </div>
        )}
      </div>
      {/* Load more button */}
      {defaultDisplayCount + extendCount < data.articles.length && (
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
