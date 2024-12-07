import { useState, useRef } from "react";
import { useAtomValue, useSetAtom, useAtom } from "jotai";
import {
  useLoaderData,
  useParams,
  useNavigate,
} from "react-router-dom";
import { LoaderCircle } from "lucide-react";
import {
  currEditorAtom,
  includeSelectedArticlesAtom,
  selectedArticlesAtom,
  toggleTyping,
} from "@/atoms/foldersAtoms";
import type { FolderContents } from "@shared/types";
import { Article } from "@shared/models/Articles";
import { SubEditor } from "@shared/consts";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import MarkdownDisplay from "./MarkdownDisplay";

// ========== Helper functions ==========

const EditorTitles = (editor: SubEditor) => {
  switch (editor) {
    case SubEditor.trend:
      return "Trend Analysis";
    case SubEditor.suggestion:
      return "Suggested Topics";
    case SubEditor.write:
      return "Writing";
    default:
      return "Summarization";
  }
};

const ButtonLabel = (editor: SubEditor) => {
  switch (editor) {
    case SubEditor.trend:
      return ["Analyze", "Analyzing..."];
    case SubEditor.suggestion:
      return ["Suggest", "Suggesting..."];
    case SubEditor.write:
      return ["Write", "Writing..."];
    default:
      return ["Summarize", "Summarizing..."];
  }
};

const generateNewsList = (
  articles: Article[]
): string | undefined => {
  if (articles.length === 0) {
    return undefined;
  }
  const message = articles.map((article, index) => {
    return `News ${index} - title: ${article.title}, publish date: ${article.publishedAt}, news url: ${article.url}`;
  });
  return message.join(";\n");
};

// ========= Text Editor component ==========
const TextEditor = () => {
  const currEditor = useAtomValue(currEditorAtom);
  const selectedArticles = useAtomValue(selectedArticlesAtom);
  const [includeSelectedOnly, setIncludeSelectedOnly] = useAtom(
    includeSelectedArticlesAtom
  );
  const setTyping = useSetAtom(toggleTyping);

  const navigate = useNavigate();
  const { folderName } = useParams();
  const data = useLoaderData() as FolderContents;

  const textAreaRef = useRef<HTMLTextAreaElement>(null);
  const [generating, setGenerating] = useState<boolean>(false);

  const handleToggleIncludeSelected = () => {
    setIncludeSelectedOnly((prev) => !prev);
  };
  // Get generated content
  const handleGenerate = async () => {
    const newsList = generateNewsList(
      includeSelectedOnly ? selectedArticles : data.articles
    );
    if (newsList) {
      setGenerating(true);
      setTyping(false);
      await window.context.getOpenAIResponse(
        folderName!,
        currEditor,
        newsList,
        textAreaRef.current?.value
      );
      setGenerating(false);
      setTyping(true);
      navigate(`/folders/${folderName}`);
    }
  };

  const generatedContent = data.generated_contents[currEditor];
  const title = EditorTitles(currEditor);

  return (
    <div className="flex-1 max-h-full flex flex-col overflow-auto px-6 py-3">
      <h2 className="text-center font-serif font-semibold text-xl mt-2 mb-5">
        {title}
      </h2>
      <div className="font-serif">
        <label htmlFor="editor-instruction" className="text-sm">
          Extra instructions (optional):
        </label>
        <textarea
          ref={textAreaRef}
          id="editor-instruction"
          className="w-full h-24 px-2 py-1 mt-1 font-serif text-sm border border-primary/50 rounded-sm resize-none focus:outline-2 focus:outline-primary"
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
        <Button
          className="w-full font-sans my-2 h-9 rounded-sm"
          onClick={handleGenerate}
          disabled={generating}
        >
          {generating && <LoaderCircle className="animate-spin" />}
          {generating
            ? ButtonLabel(currEditor)[1]
            : ButtonLabel(currEditor)[0]}
        </Button>
      </div>
      <MarkdownDisplay generatedContent={generatedContent} />
    </div>
  );
};

export default TextEditor;
