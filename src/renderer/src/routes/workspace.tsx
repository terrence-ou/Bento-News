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

const Workspace = () => {
  const data = useLoaderData() as string;
  console.log(data);
  const setFolderRoute = useSetAtom(setFolderRouteAtom);
  const { folderName } = useParams();
  return (
    <div className="h-full w-full">
      <div className="p-6 pt-4">
        <div className="grid grid-cols-3 gap-2 justify-center items-center text-primary/60 text-base font-serif">
          <Link to="/folders">
            <CircleArrowLeft
              className="hover:text-primary hover:cursor-pointer transition-colors duration-150 stroke-[1.5px]"
              onClick={() => setFolderRoute(undefined)}
            />
          </Link>
          <div className="flex gap-2 justify-center">
            <Link
              to="/folders"
              className="hover:text-primary hover:underline"
              onClick={() => setFolderRoute(undefined)}
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
    </div>
  );
};

export default Workspace;
