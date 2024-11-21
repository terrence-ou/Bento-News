import { Button } from "@/components/ui/button";
import { X } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { LanguageCodes, SortBy } from "@shared/consts";

const SearchBox = ({ onClose }: { onClose: () => void }) => {
  return (
    <div className="w-full h-full py-4 px-5 flex flex-col gap-4">
      <div className="flex justify-between items-center">
        <h1 className="font-serif font-semibold text-lg">
          New Search
        </h1>
        <X className="w-5 hover:cursor-pointer" onClick={onClose} />
      </div>
      <SearchBlock title="Key Words (Separate by comma)">
        <textarea className="border resize-none w-full border-primary/30 rounded-[0.3rem] px-1 py-[2px] font-mono font-light tracking-tight focus-visible:outline-primary" />
      </SearchBlock>
      <SearchBlock title="Language">
        <SearchBoxOptions type={"languages"} placeholder="English" />
      </SearchBlock>
      <SearchBlock title="Sort By">
        <SearchBoxOptions type={"sortBy"} placeholder="Relevance" />
      </SearchBlock>
      <div className="flex justify-between">
        <SearchBlock title="From">
          <DatePicker />
        </SearchBlock>
        <SearchBlock title="To">
          <DatePicker />
        </SearchBlock>
      </div>
      <div className="flex-1 content-end">
        <Button className="w-full">Search</Button>
      </div>
    </div>
  );
};

// ======== Sub Components ========

const SearchBoxOptions = ({
  type,
  placeholder,
}: {
  type: "languages" | "sortBy";
  placeholder: string;
}) => {
  const options = type === "languages" ? LanguageCodes : SortBy;
  return (
    <div>
      <Select>
        <SelectTrigger className="h-7 rounded-[0.3rem] border-primary/30 px-2 py-[2px] font-mono focus:ring-offset-0">
          <SelectValue placeholder={placeholder} />
        </SelectTrigger>
        <SelectContent className="max-h-60">
          {Object.entries(options).map(([name, code]) => (
            <SelectItem
              key={`search-lan-${code}`}
              className="font-mono"
              value={code}
            >
              {name}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
};

const DatePicker = ({}) => {
  return (
    <input
      type="date"
      className="border w-full border-primary/30 rounded-[0.3rem] px-1 py-[2px] font-mono text-sm font-light tracking-tight focus-visible:outline-primary"
    />
  );
};

const SearchBlock = ({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) => {
  return (
    <div>
      <h3 className="text-sm mb-1">{title}</h3>
      {children}
    </div>
  );
};

export default SearchBox;
