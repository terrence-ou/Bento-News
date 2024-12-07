import { useAtomValue } from "jotai";
import { currEditorAtom } from "@/atoms/foldersAtoms";
import { SubEditor } from "@shared/consts";
import EditorControlBar from "./EditorControlBar";
import TextEditor from "./TextEditor";
import ImageEditor from "./ImageEditor";

// ========== The Editor component ==========

const Editor = () => {
  const currEditor = useAtomValue(currEditorAtom);
  return (
    <div className="h-full flex flex-col-reverse border-primary/25 border-dashed border-[1.75px] bg-background/60 shadow-md rounded-md">
      <EditorControlBar />
      {currEditor === SubEditor.image ? (
        <ImageEditor />
      ) : (
        <TextEditor />
      )}
    </div>
  );
};

export default Editor;
