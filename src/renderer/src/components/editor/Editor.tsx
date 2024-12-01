import { useAtomValue } from "jotai";
import { currEditorAtom } from "@/atoms/editorAtoms";
import EditorControlBar from "./EditorControlBar";
import { SubEditor } from "@shared/consts";
import { Button } from "@/components/ui/button";

const EditorTitles = (editor: SubEditor) => {
  switch (editor) {
    case SubEditor.trend:
      return "Trend Prediction";
    case SubEditor.suggestion:
      return "Suggested Topics";
    case SubEditor.write:
      return "Writing";
    default:
      return "Summarization";
  }
};

const Editor = () => {
  const currEditor = useAtomValue(currEditorAtom);
  const title = EditorTitles(currEditor);
  return (
    <div className="h-full flex flex-col-reverse border-primary/25 border-dashed border-[1.75px] bg-background/60 shadow-md rounded-md">
      <EditorControlBar />
      <div className="flex-1 px-6 py-3 flex flex-col">
        <h2 className="text-center font-serif text-xl">{title}</h2>
        <div className="font-serif">
          <label htmlFor="editor-instruction">
            Extra instructions (optional):
          </label>
          <textarea
            id="editor-instruction"
            className="w-full h-24 px-2 py-1 font-serif text-sm border border-primary/50 rounded-sm resize-none focus:outline-none focus:border-2 focus:border-primary"
          />
        </div>
        <Button className="w-36 font-sans">Generate Summary</Button>
      </div>
    </div>
  );
};

export default Editor;
