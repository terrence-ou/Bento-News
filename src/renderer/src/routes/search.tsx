import { useAtom } from "jotai";
import { searchBoxExpandedAtom } from "@/atoms/searchAtoms";
import { ScanSearch as SearchIcon } from "lucide-react";
import { cn } from "@/utils";
import SearchBox from "@/components/SearchBox";

const Search = () => {
  const [expanded, setExpanded] = useAtom(searchBoxExpandedAtom);
  const handleSetExpanded = (value: boolean) => {
    setExpanded(value);
  };
  return (
    <div
      className="relative h-full w-full flex flex-col"
      onClick={() => expanded && handleSetExpanded(false)}
    >
      <div className="p-6">
        <h1 className="font-serif font-semibold text-3xl my-6 mx-2">
          Search Results
        </h1>
      </div>
      {/* No result */}
      <div className="absolute w-full h-full text-center content-center">
        <h1 className="text-2xl text-primary/40">
          No search result available. Try to start a new search.
        </h1>
      </div>
      {/* Search box */}
      <div
        className={cn(
          "absolute flex justify-center items-center bottom-8 right-8 md:bottom-16 md:right-16 bg-primary transition-all duration-200 overflow-hidden",
          !expanded
            ? "w-16 h-16 rounded-[50%] opacity-40 hover:cursor-pointer hover:opacity-90"
            : "w-80 h-[475px] rounded-[10px] opacity-100 bg-background border-[1.5px] border-dashed border-primary/50 shadow-news-card"
        )}
        onClick={(e) => e.stopPropagation()}
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
