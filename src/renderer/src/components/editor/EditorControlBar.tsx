import { ReactNode } from "react";
import { useAtom } from "jotai";
import { editorAtom } from "@/atoms/foldersAtoms";
import { SubEditor } from "@shared/consts";
import { cn } from "@/utils";
import {
  ScanText,
  TrendingUpDown,
  Lightbulb,
  NotebookPen,
} from "lucide-react";

const EditorControlBar = () => {
  const [currEditor, setCurrEditor] = useAtom(editorAtom);
  const getIconStyle = (editor: SubEditor) => {
    const cmp = currEditor === editor;
    return cn(
      "w-6 h-6 mx-auto",
      cmp
        ? "stroke-[2px] stroke-primary/80"
        : "stroke-[1.5px] stroke-primary/40"
    );
  };

  const handleEditorChange = (editor: SubEditor) => {
    setCurrEditor(editor);
  };

  return (
    <div className="flex justify-center">
      <div className="flex py-1 px-6 gap-3 mb-3 bg-background border rounded-full">
        <ControlButton
          onClick={() => handleEditorChange(SubEditor.summary)}
        >
          <ScanText className={getIconStyle(SubEditor.summary)} />
        </ControlButton>
        <ControlButton
          onClick={() => handleEditorChange(SubEditor.trend)}
        >
          <TrendingUpDown className={getIconStyle(SubEditor.trend)} />
        </ControlButton>
        <ControlButton
          onClick={() => handleEditorChange(SubEditor.suggestion)}
        >
          <Lightbulb className={getIconStyle(SubEditor.suggestion)} />
        </ControlButton>
        <ControlButton
          onClick={() => handleEditorChange(SubEditor.write)}
        >
          <NotebookPen className={getIconStyle(SubEditor.write)} />
        </ControlButton>
      </div>
    </div>
  );
};

const ControlButton = ({
  onClick,
  children,
}: {
  onClick: () => void;
  children: ReactNode;
}) => {
  return (
    <div
      className="w-8 h-8 content-center rounded-sm hover:cursor-pointer hover:bg-accent"
      onClick={onClick}
    >
      {children}
    </div>
  );
};

export default EditorControlBar;
