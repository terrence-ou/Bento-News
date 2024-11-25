import FolderDisplay from "@/components/folders/ForderDisplay";
import { useLoaderData } from "react-router-dom";

const Folders = () => {
  const folders = useLoaderData() as string[];
  return (
    <div className="max-h-full px-8 py-16">
      <div className="grid grid-cols-4 items-center">
        {folders.map((folder: string) => (
          <FolderDisplay key={folder} folderName={folder} />
        ))}
        <div>+</div>
      </div>
    </div>
  );
};

export default Folders;
