import { useNavigate } from "react-router-dom";
import { FolderIcon, CircleX } from "lucide-react";
import { cn } from "@/utils";

import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import AddFolder from "./AddFolder";
import { ReactNode } from "react";
import { Button } from "../ui/button";
import { useSetAtom } from "jotai";
import { setFolderRouteAtom } from "@/atoms/routesAtoms";

// ========== FolderDisplay Component ==========
const FolderDisplay = ({
  folderName,
  type = "empty",
}: {
  folderName?: string;
  type?: "empty" | "content" | "void";
}) => {
  const navigate = useNavigate();
  const setFolderRoute = useSetAtom(setFolderRouteAtom);

  const handleNavigate = () => {
    navigate("/folders/" + folderName);
    setFolderRoute(folderName);
  };

  return (
    <div
      className={cn(
        "relative flex flex-col gap-1 justify-center items-center h-52 w-52 mx-auto border-[2px] border-dashed border-primary/20 rounded-lg hover:cursor-pointer group",
        type !== "void" &&
          "border-primary/40 bg-background/40 hover:bg-background/90 hover:shadow-news-card transition-all duration-150"
      )}
      onClick={handleNavigate}
    >
      {type === "empty" && (
        <>
          <FolderIcon
            className="stroke-[0.6px] stroke-primary/80 fill-background"
            height={100}
            width={100}
          />
          {folderName !== undefined && folderName !== "default" && (
            <DeleteModal folderName={folderName}>
              <CircleX
                className="absolute top-2 right-2 invisible group-hover:visible stroke-primary/50 hover:stroke-primary transition-colors duration-150"
                height={20}
              />
            </DeleteModal>
          )}
          <p className="font-serif">{folderName}</p>
        </>
      )}
      {type === "void" && <AddFolder />}
    </div>
  );
};

// ========== Sub Components ==========

// Delete confirmation modal
const DeleteModal = ({
  folderName,
  children,
}: {
  folderName: string;
  children: ReactNode;
}) => {
  const navigate = useNavigate();

  const handleRemoveFolder = async () => {
    await window.context.removeUserFolder(folderName);
    navigate("/folders");
  };

  return (
    <Dialog>
      <DialogTrigger>{children}</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="font-serif mb-2">
            Deleting Folder
          </DialogTitle>
          <DialogDescription>
            You're deleteing the folder:{" "}
            <span className="font-bold text-primary/80">
              {folderName}.
            </span>
            <br />
            This action cannot be undone.
          </DialogDescription>
        </DialogHeader>
        <div className="flex gap-2 justify-end mt-6">
          <DialogClose asChild>
            <Button
              variant={"ghost"}
              className="h-8 focus-visible:ring-0 focus-visible:ring-offset-0"
            >
              Cancel
            </Button>
          </DialogClose>
          <DialogClose asChild>
            <Button
              variant={"destructive"}
              className="h-8"
              onClick={handleRemoveFolder}
            >
              Confirm
            </Button>
          </DialogClose>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default FolderDisplay;
