import { ReactNode } from "react";
import { useAtomValue } from "jotai";
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
  children,
}: {
  children: ReactNode;
}) => {
  const folders = useAtomValue(readFoldersAtom);
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>{children}</DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuLabel>Add to...</DropdownMenuLabel>
        <DropdownMenuSeparator />
        {folders.map((folder) => (
          <DropdownMenuItem key={folder}>{folder}</DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default AddToFolderDropdown;
