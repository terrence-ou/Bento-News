import { FolderIcon } from "lucide-react";
import { cn } from "@/utils";
import AddFolder from "./AddFolder";

const FolderDisplay = ({
  folderName,
  type = "empty",
}: {
  folderName?: string;
  type?: "empty" | "filled" | "void";
}) => {
  return (
    <div
      className={cn(
        "flex flex-col gap-1 justify-center items-center h-52 w-52 mx-auto border-[2px] border-dashed border-primary/20 rounded-lg hover:cursor-pointer",
        type !== "void" &&
          "border-primary/40 bg-background/40 hover:bg-background/90 hover:shadow-news-card transition-all duration-150"
      )}
    >
      {type === "empty" && (
        <>
          <FolderIcon
            className="stroke-[0.6px] stroke-primary/80 fill-background"
            height={100}
            width={100}
          />
          <p className="font-serif">{folderName}</p>
        </>
      )}
      {type === "void" && <AddFolder />}
    </div>
  );
};

export default FolderDisplay;
