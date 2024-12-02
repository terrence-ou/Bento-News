import {
  useLoaderData,
  LoaderFunctionArgs,
  redirect,
  useParams,
  Link,
} from "react-router-dom";
import { CircleArrowLeft } from "lucide-react";
import { useSetAtom } from "jotai";
import { setFolderRouteAtom } from "@/atoms/routesAtoms";
import SavedNews from "@/components/workspace/SavedNews";
import { FolderContents } from "@shared/types";
import Editor from "@/components/editor/Editor";

// Folders loader
export const loader = async ({ params }: LoaderFunctionArgs) => {
  const folderName = params.folderName;
  if (!folderName) {
    redirect("/folders");
    return undefined;
  }
  const contents =
    await window.context.loadFolderContents(folderName);
  return contents;
};

// ========== The Workspace component ==========

const Workspace = () => {
  const data = useLoaderData() as FolderContents;
  const { articles } = data;
  const setFolderRoute = useSetAtom(setFolderRouteAtom);
  const { folderName } = useParams();

  const handleBack = () => {
    setFolderRoute(undefined);
  };

  return (
    <div className="h-full w-full flex flex-col">
      <div className="p-6 pt-4">
        <div className="grid grid-cols-3 gap-2 justify-center items-center text-primary/60 text-base font-serif">
          <Link to="/folders">
            <CircleArrowLeft
              className="hover:text-primary hover:cursor-pointer transition-colors duration-150 stroke-[1.5px]"
              onClick={handleBack}
            />
          </Link>
          <div className="flex gap-2 justify-center">
            <Link
              to="/folders"
              className="hover:text-primary hover:underline"
              onClick={handleBack}
            >
              Folders
            </Link>
            <span>{">"}</span>
            <p className="font-semibold text-primary/80">
              {folderName}
            </p>
          </div>
        </div>
      </div>
      {/* folder contents */}
      <div className="flex-1 max-h-full grid grid-cols-2 gap-6 p-4 overflow-auto">
        <div className="flex flex-col max-h-full overflow-auto">
          <SavedNews articles={articles} />
        </div>
        <div className="max-h-full overflow-auto">
          <Editor />
        </div>
      </div>
    </div>
  );
};

export default Workspace;
