import { ReactNode } from "react";
import { useAtomValue } from "jotai";
import { Article } from "@shared/models/Articles";
import { readFoldersAtom } from "@/atoms/foldersAtoms";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const AddToFolderDropdown = ({
  article,
  children,
}: {
  article: Article;
  children: ReactNode;
}) => {
  const folders = useAtomValue(readFoldersAtom);
  const addToFolder = async (folder: string) => {
    const result = await window.context.addArticleToFolder(
      article,
      folder
    );
    return result;
  };
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>{children}</DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuLabel>Add to...</DropdownMenuLabel>
        <DropdownMenuSeparator />
        {folders.map((folder) => (
          <DropdownMenuItem
            key={folder}
            onClick={() => addToFolder(folder)}
          >
            {folder}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default AddToFolderDropdown;
