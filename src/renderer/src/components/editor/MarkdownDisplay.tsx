import { useEffect, useState } from "react";
import Markdown from "react-markdown";
import { useAtom } from "jotai";
import { typingEffectAtom } from "@/atoms/foldersAtoms";

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

const MarkdownDisplay = ({
  generatedContent,
}: {
  generatedContent: string;
}) => {
  const [length, setLength] = useState<number>(0);
  const [isTyping, setIsTyping] = useAtom(typingEffectAtom);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    setLength(0); // Reset length when generatedContent changes
    interval = setInterval(() => {
      setLength((prev) => {
        if (isTyping && prev < generatedContent.length) {
          return prev + 15;
        } else {
          clearInterval(interval);
          setIsTyping(false);
          return prev;
        }
      });
    }, 50);
    return () => clearInterval(interval);
  }, [generatedContent]);

  // turn off typing effect when component unmounts
  useEffect(() => {
    return () => setIsTyping(false);
  }, []);

  const displayContent = isTyping
    ? generatedContent.slice(0, length)
    : generatedContent;
  return (
    <div className="overflow-auto my-2">
      <Markdown components={markdownComponents}>
        {displayContent}
      </Markdown>
    </div>
  );
};

export default MarkdownDisplay;
