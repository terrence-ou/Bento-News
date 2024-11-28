import { useEffect } from "react";
import { useSetAtom } from "jotai";
import { setFoldersAtom } from "@/atoms/foldersAtoms";
import { useLoaderData } from "react-router-dom";
import { cn } from "@/utils";
import FolderDisplay from "@/components/folders/ForderDisplay";
import useResize from "@/hooks/useResize";

// load user folders
export const loader = async () => {
  const folders = await window.context.loadUserFolders();
  return folders;
};

const Folders = () => {
  const setUserFolders = useSetAtom(setFoldersAtom);
  const folders = useLoaderData() as string[];
  useEffect(() => setUserFolders(folders), [folders]);
  const { gridCols } = useResize();
  return (
    <div className="max-h-full px-8 py-16">
      <div className={cn("grid items-center gap-y-6", gridCols)}>
        {folders.map((folder: string) => (
          <FolderDisplay
            key={`folders-${folder}`}
            folderName={folder}
          />
        ))}
        <FolderDisplay key={`folders-add`} type="add" />
      </div>
    </div>
  );
};

export default Folders;
