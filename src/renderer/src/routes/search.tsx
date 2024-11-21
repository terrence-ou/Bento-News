import { useState } from "react";
import { ScanSearch as SearchIcon } from "lucide-react";
import { cn } from "@/utils";
import SearchBox from "@/components/SearchBox";

const Search = () => {
  const [expanded, setExpanded] = useState<boolean>(false);
  const handleSetExpanded = (value: boolean) => {
    setExpanded(value);
  };
  return (
    <div className="relative h-full w-full">
      <div
        className={cn(
          "absolute flex justify-center items-center bottom-8 right-8 md:bottom-16 md:right-16 bg-primary transition-all duration-200 overflow-hidden",
          !expanded
            ? "w-16 h-16 rounded-[50%] opacity-40 hover:cursor-pointer hover:opacity-90"
            : "w-80 h-[475px] rounded-[10px] opacity-100 bg-background border-[1.5px] border-dashed border-primary/50 shadow-news-card"
        )}
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
