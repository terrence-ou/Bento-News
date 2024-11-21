import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const SearchBox = () => {
  return (
    <div className="w-full h-full p-5">
      <h1>New Search</h1>
      <h3>Key Words</h3>
      <input className="border w-full border-primary/30 rounded-[0.3rem] px-1 py-[4px] font-mono font-light tracking-tight text-xs focus-visible:outline-primary" />
      <h3>Language</h3>
      <SearchBoxOptions />
      <h3>Sort By</h3>
      <SearchBoxOptions />
      <h3>From</h3>
      <h3>To</h3>
      <Button>Search</Button>
    </div>
  );
};

const SearchBoxOptions = () => {
  return (
    <div>
      <Select>
        <SelectTrigger>
          <SelectValue placeholder={"English"} />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value={"fr"}>Franch</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
};

export default SearchBox;
