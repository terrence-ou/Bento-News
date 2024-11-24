import {
  Newspaper,
  StickyNote,
  LayoutList,
  ArrowDownNarrowWide,
} from "lucide-react";

const LayoutControl = () => {
  return (
    <div className="flex gap-4">
      <Newspaper className="w-6 stroke-[1.5px] stroke-primary/70" />
      <StickyNote className="w-6 stroke-[1.5px] stroke-primary/70" />
      <LayoutList className="w-6 stroke-[1.5px] stroke-primary/70" />
      <ArrowDownNarrowWide className="w-6 stroke-[1.5px] stroke-primary/70" />
    </div>
  );
};

export default LayoutControl;
