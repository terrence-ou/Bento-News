import FolderDisplay from "@/components/folders/ForderDisplay";
import useResize from "@/hooks/useResize";
import { cn } from "@/utils";
import { useLoaderData } from "react-router-dom";

const Folders = () => {
  const folders = useLoaderData() as string[];
  const { gridCols } = useResize();
  return (
    <div className="max-h-full px-8 py-16">
      <div className={cn("grid items-center", gridCols)}>
        {folders.map((folder: string) => (
          <FolderDisplay
            key={`folders-${folder}`}
            folderName={folder}
          />
        ))}
        <FolderDisplay key={`folders-add`} type="void" />
      </div>
    </div>
  );
};

export default Folders;
