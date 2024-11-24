import { useAtom } from "jotai";
import {
  displaySortByAtom,
  searchLayoutAtom,
} from "@/atoms/searchAtoms";
import {
  Newspaper,
  StickyNote,
  LayoutList,
  ArrowDownNarrowWide,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
} from "../ui/dropdown-menu";

const LayoutControl = () => {
  const [, setSortBy] = useAtom(displaySortByAtom);
  const [, setLayout] = useAtom(searchLayoutAtom);

  const handleSetSortBy = (
    value: "date-new" | "date-old" | "source-a-z" | "source-z-a"
  ) => {
    setSortBy(value);
  };

  const handleSetLayout = (value: "mini" | "full" | "list") => {
    setLayout(value);
  };

  return (
    <div className="flex gap-4 bg-background px-10 py-1 border rounded-full shadow-inner">
      <DropdownMenu>
        <DropdownMenuTrigger>
          <ArrowDownNarrowWide className="w-5 stroke-[1.5px] stroke-primary/70 focus-visible:outline-none hover:stroke-[2.2px]" />
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuLabel>Sort By</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem
            onClick={() => handleSetSortBy("date-new")}
          >
            Date: new to old
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={() => handleSetSortBy("date-old")}
          >
            Date: old to new
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={() => handleSetSortBy("source-a-z")}
          >
            Source: A-Z
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={() => handleSetSortBy("source-z-a")}
          >
            Source: Z-A
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      <p className="text-primary/40 px-2"> | </p>
      <Newspaper
        className="w-5 stroke-[1.5px] stroke-primary/70"
        onClick={() => handleSetLayout("full")}
      />
      <StickyNote
        className="w-5 stroke-[1.5px] stroke-primary/70"
        onClick={() => handleSetLayout("mini")}
      />
      <LayoutList className="w-5 stroke-[1.5px] stroke-primary/70" />
    </div>
  );
};

export default LayoutControl;
