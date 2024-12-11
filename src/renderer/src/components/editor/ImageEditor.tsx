import { useEffect, useState } from "react";
import { useAtom, useAtomValue, useSetAtom } from "jotai";
import { useParams, useLoaderData } from "react-router-dom";
import {
  CircleAlert,
  ImageOff,
  LoaderCircle,
  WandSparkles,
} from "lucide-react";
import { FolderContents } from "@shared/types";
import { ImageStyles } from "@shared/consts";
import { Article } from "@shared/models/Articles";
import {
  includeSelectedArticlesAtom,
  generatingImgAtom,
  selectedArticlesAtom,
  getGenerateStartAtom,
  setGenerateStartAtom,
  generatingFolderAtom,
} from "@/atoms/foldersAtoms";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const styleDecscription = {
  [ImageStyles.stippled]: "B&W image with dots",
  [ImageStyles.watercolor]: "Soft watercolor effect",
  [ImageStyles.lineart]: "Simplistic high-contrast line art",
  [ImageStyles.cartoon]: "Vibrant color and dramatic expressions",
  [ImageStyles.kids]: "Soft, cozy, and colorful",
};

const generateNewsList = (
  articles: Article[]
): string | undefined => {
  if (articles.length === 0) {
    return undefined;
  }
  const message = articles.map((article, index) => {
    return `News ${index} - title: ${article.title}`;
  });
  return message.join(";\n");
};

// ========== The ImageEditor component ==========

const ImageEditor = () => {
  const data = useLoaderData() as FolderContents;

  const selectedArticles = useAtomValue(selectedArticlesAtom);
  const [includeSelectedOnly, setIncludeSelectedOnly] = useAtom(
    includeSelectedArticlesAtom
  );

  // start time is used to track the time taken to generate the image
  const setStartTime = useSetAtom(setGenerateStartAtom);
  // generatingFolder is used to track the folder for which the image is being generated
  const [generatingFolder, setGeneratingFolder] = useAtom(
    generatingFolderAtom
  );

  const [imgSrc, setImgSrc] = useState<string | undefined>(undefined);
  const [imgStyle, setImgStyle] = useState<ImageStyles>(
    ImageStyles.stippled
  );
  const [generating, setGenerating] = useAtom(generatingImgAtom);

  const { folderName } = useParams();

  const handleToggleIncludeSelected = () => {
    setIncludeSelectedOnly((prev) => !prev);
  };

  const handleGenerateCoverImage = async () => {
    const newsTitles = generateNewsList(
      includeSelectedOnly ? selectedArticles : data.articles
    );
    if (newsTitles) {
      setGenerating(true); // turn on the generating state
      setGeneratingFolder(folderName!); // set the generating folder
      setStartTime(new Date().getTime()); // set start time
      await window.context.getHuggingFaceResponse(
        newsTitles,
        folderName!,
        imgStyle
      );
      setGenerating(false);
    }
  };

  const handleStyleChange = (style: ImageStyles) => {
    setImgStyle(style);
  };

  useEffect(() => {
    const loadCoverImage = async () => {
      const folderCoverImg = await window.context.loadFolderCoverImg(
        folderName!
      );
      if (folderCoverImg) {
        setImgSrc(folderCoverImg);
      }
    };
    loadCoverImage();
  }, [generating]);

  return (
    <div className="flex-1 max-h-full flex flex-col overflow-auto px-6 py-3">
      <h2 className="text-center font-serif font-semibold text-xl mt-2 mb-5">
        Cover Image Generation
      </h2>
      {/* style selection */}
      <div>
        <h3 className="font-serif text-sm mb-2">
          Select an image style:
        </h3>
        <Select
          onValueChange={(value) =>
            handleStyleChange(value as ImageStyles)
          }
        >
          <SelectTrigger className="w-full h-8 font-mono focus:ring-offset-0 focus:ring-[1.5px] rounded-sm">
            <SelectValue placeholder="Stippled - Default" />
          </SelectTrigger>
          <SelectContent className="font-mono">
            {Object.entries(styleDecscription).map(
              ([style, desc]) => (
                <SelectItem key={`img-${style}`} value={style}>
                  {style}
                  <span className="text-primary/50">
                    {` - ${desc}`}
                  </span>
                </SelectItem>
              )
            )}
          </SelectContent>
        </Select>
        {/* include selection checkbox and generate button */}
        <div className="flex flex-col mt-2">
          <div
            className="flex items-center gap-2 font-serif text-sm hover:cursor-pointer w-fit"
            onClick={handleToggleIncludeSelected}
          >
            <Checkbox
              className="rounded-[5px]"
              checked={includeSelectedOnly}
            />
            <p>Include selected news only</p>
          </div>
          <Button
            className="w-full font-sans mt-3 mb-1 h-9 rounded-sm"
            disabled={
              generating ||
              (includeSelectedOnly && selectedArticles.length === 0)
            }
            onClick={handleGenerateCoverImage}
          >
            {generating && <LoaderCircle className="animate-spin" />}
            {generating
              ? generatingFolder === folderName
                ? "Generating..."
                : "Generating in background"
              : "Generate Cover Image"}
          </Button>
        </div>
        <div>
          <p className="text-sm italic text-primary/40">
            <span>
              <CircleAlert className="inline h-4 stroke-[1.5px] stroke-primary/40" />
            </span>
            Image generation may take between 30 seconds to 5 minutes.
            Appreciate your patience.
          </p>
        </div>
      </div>
      {/* image display */}
      <div className="overflow-y-auto px-2 h-full block content-center align-middle">
        {generating && generatingFolder === folderName && (
          <LoadingUI />
        )}
        {(!generating || generatingFolder !== folderName) &&
          imgSrc && (
            <img
              src={`data:image/png;base64,${imgSrc}`}
              alt="cover"
              className="max-h-[80%] mx-auto"
            />
          )}
        {!generating && !imgSrc && (
          <div>
            <ImageOff className="w-28 h-28 stroke-[0.6px] mx-auto stroke-zinc-300" />
            <p className="text-center text-primary/30">
              No cover image available
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

// ========== Sub components ==========
const LoadingUI = () => {
  const startTime = useAtomValue(getGenerateStartAtom);
  const [elapsedTime, setElapsedTime] = useState<number | undefined>(
    undefined
  );
  useEffect(() => {
    const interval = setInterval(() => {
      const currentTime = new Date().getTime();
      setElapsedTime(Math.floor((currentTime - startTime) / 1000));
    }, 1000);
    return () => {
      clearInterval(interval);
    };
  }, []);
  return (
    <div>
      <WandSparkles className="w-32 h-32 stroke-[0.4px] mx-auto stroke-zinc-300 animate-waiting" />
      {elapsedTime ? (
        <p className="text-center text-primary/30 text-sm">
          {elapsedTime > 60 && `${Math.floor(elapsedTime / 60)}m `}
          {elapsedTime % 60}s
        </p>
      ) : (
        <p className="text-center text-primary/30 text-sm">
          generating...
        </p>
      )}
    </div>
  );
};

export default ImageEditor;
