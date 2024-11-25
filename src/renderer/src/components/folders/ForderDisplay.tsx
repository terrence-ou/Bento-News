import { FolderIcon } from "lucide-react";

const FolderDisplay = ({ folderName }: { folderName: string }) => {
  return (
    <div className="flex flex-col gap-1 justify-center items-center h-52 w-52 mx-auto border-[2px] border-dashed border-primary/40 bg-background/40 rounded-lg transition-all duration-150 hover:bg-background/90 hover:shadow-news-card hover:cursor-pointer">
      <FolderIcon
        className="stroke-[0.6px] stroke-primary/80 fill-background"
        height={100}
        width={100}
      />
      <p className="font-serif">{folderName}</p>
    </div>
  );
};

export default FolderDisplay;
