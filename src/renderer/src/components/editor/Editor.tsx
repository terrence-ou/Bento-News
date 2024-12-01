import EditorControlBar from "./EditorControlBar";

const Editor = () => {
  return (
    <div className="h-full flex flex-col-reverse border-primary/25 border-dashed border-[1.75px] bg-background/60 shadow-md rounded-md">
      <EditorControlBar />
    </div>
  );
};

export default Editor;
