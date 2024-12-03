import { useAtomValue, useAtom } from "jotai";
import Markdown from "react-markdown";
import {
  currEditorAtom,
  includeSelectedArticlesAtom,
  selectedArticlesAtom,
} from "@/atoms/foldersAtoms";
import type { FolderContents } from "@shared/types";
import { Article } from "@shared/models/Articles";
import EditorControlBar from "./EditorControlBar";
import { SubEditor } from "@shared/consts";
import { Button } from "@/components/ui/button";
import { Checkbox } from "../ui/checkbox";
import {
  useLoaderData,
  useParams,
  useNavigate,
} from "react-router-dom";
import { useState } from "react";

// ========== Helper functions ==========

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

// ========== The Editor component ==========

const Editor = () => {
  const currEditor = useAtomValue(currEditorAtom);
  const selectedArticles = useAtomValue(selectedArticlesAtom);
  const [includeSelectedOnly, setIncludeSelectedOnly] = useAtom(
    includeSelectedArticlesAtom
  );

  const handleToggleIncludeSelected = () => {
    setIncludeSelectedOnly((prev) => !prev);
  };

  const { folderName } = useParams();
  const data = useLoaderData() as FolderContents;

  const [generating, setGenerating] = useState<boolean>(false);
  const navigate = useNavigate();

  const generatedContent = data.generated_contents[currEditor];

  // Get generated content
  const handleGenerate = async () => {
    const newsList = generateNewsList(
      includeSelectedOnly ? selectedArticles : data.articles
    );
    if (newsList) {
      setGenerating(true);
      await window.context.getOpenAIResponse(
        folderName!,
        currEditor,
        newsList
      );
      setGenerating(false);
      navigate(`/folders/${folderName}`);
    }
  };

  const title = EditorTitles(currEditor);
  return (
    <div className="h-full flex flex-col-reverse border-primary/25 border-dashed border-[1.75px] bg-background/60 shadow-md rounded-md">
      <EditorControlBar />
      <div className="flex-1 max-h-full flex flex-col overflow-auto px-6 py-3">
        <h2 className="text-center font-serif font-semibold text-xl mt-2 mb-5">
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
          <Button
            className="w-full font-sans my-2"
            onClick={handleGenerate}
            disabled={generating}
          >
            {generating ? "Generating..." : "Generate Summary"}
          </Button>
        </div>
        <div className="overflow-auto">
          <Markdown components={markdownComponents}>
            {generatedContent}
          </Markdown>
        </div>
      </div>
    </div>
  );
};

// Sub Component

const markdownComponents = {
  a: (props) => {
    return (
      <a
        {...props}
        className="text-primary underline"
        target="_blank"
      />
    );
  },
  h3: (props) => {
    return <h3 {...props} className="font-bold text-lg mt-3 mb-1" />;
  },
  h4: (props) => {
    return <h4 {...props} className="font-semibold text-base my-1" />;
  },
  p: (props) => {
    return (
      <div
        {...props}
        className="my-2 text-sm font-light font-serif"
      />
    );
  },
  strong: (props) => {
    return (
      <span
        {...props}
        className="font-semibold font-serif text-sm mb-1"
      />
    );
  },
  li: (props) => {
    return (
      <li
        {...props}
        className="list-disc ml-4 text-sm font-light font-serif"
      />
    );
  },
  br: () => {
    return <></>;
  },
};

export default Editor;
