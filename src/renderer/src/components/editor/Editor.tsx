import { useAtomValue, useAtom } from "jotai";
import {
  currEditorAtom,
  includeSelectedArticlesAtom,
} from "@/atoms/foldersAtoms";
import EditorControlBar from "./EditorControlBar";
import { SubEditor } from "@shared/consts";
import { Button } from "@/components/ui/button";
import { Checkbox } from "../ui/checkbox";

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
  const [includeSelectedOnly, setIncludeSelectedOnly] = useAtom(
    includeSelectedArticlesAtom
  );
  const handleToggleIncludeSelected = () => {
    setIncludeSelectedOnly((prev) => !prev);
  };

  const title = EditorTitles(currEditor);
  return (
    <div className="h-full flex flex-col-reverse border-primary/25 border-dashed border-[1.75px] bg-background/60 shadow-md rounded-md">
      <EditorControlBar />
      <div className="flex-1 px-6 py-3">
        <h2 className="text-center font-serif font-semibold text-xl my-2">
          {title}
        </h2>
        <div className="font-serif">
          <label htmlFor="editor-instruction" className="text-sm">
            Extra instructions (optional):
          </label>
          <textarea
            id="editor-instruction"
            className="w-full h-24 px-2 py-1 mt-1 font-serif text-sm border border-primary/50 rounded-sm resize-none focus:outline-none focus:border-2 focus:border-primary"
          />
        </div>
        <div className="flex flex-col">
          <div className="flex items-center gap-2 font-serif text-sm">
            <Checkbox
              className="rounded-[5px]"
              checked={includeSelectedOnly}
              onClick={handleToggleIncludeSelected}
            />
            <p>Include selected news only</p>
          </div>
          <Button className="w-full font-sans my-2">
            Generate Summary
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Editor;
