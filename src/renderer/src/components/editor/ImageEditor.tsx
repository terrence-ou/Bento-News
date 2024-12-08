import { useEffect, useState } from "react";
import { useAtom, useAtomValue } from "jotai";
import { useParams } from "react-router-dom";
import { FolderContents } from "@shared/types";
import { Article } from "@shared/models/Articles";
import {
  useLoaderData,
  // useParams,
  // useNavigate,
} from "react-router-dom";
import {
  includeSelectedArticlesAtom,
  generatingImg,
  selectedArticlesAtom,
  // currEditorAtom,
  // toggleTyping,
} from "@/atoms/foldersAtoms";
import { CircleAlert, ImageOff } from "lucide-react";
import { Checkbox } from "../ui/checkbox";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ImageStyles } from "@shared/consts";

const styleDecscription = {
  [ImageStyles.stippled]: "B&W image with dots",
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
  const [imgSrc, setImgSrc] = useState<string | undefined>(undefined);
  const [generating, setGenerating] = useAtom(generatingImg);
  // const setTyping = useSetAtom(toggleTyping);

  // const navigate = useNavigate();
  const { folderName } = useParams();
  const handleToggleIncludeSelected = () => {
    setIncludeSelectedOnly((prev) => !prev);
  };

  const handleGenerateCoverImage = async () => {
    const newsTitles = generateNewsList(
      includeSelectedOnly ? selectedArticles : data.articles
    );
    if (newsTitles) {
      setGenerating(true);
      await window.context.getHuggingFaceResponse(
        newsTitles,
        ImageStyles.stippled
      );
      setGenerating(false);
    }
  };

  const loadCoverImage = async () => {
    const folderCoverImg = await window.context.loadFolderCoverImg(
      folderName!
    );
    if (folderCoverImg) {
      setImgSrc(folderCoverImg);
    }
  };

  useEffect(() => {
    loadCoverImage();
  }, []);

  return (
    <div className="flex-1 max-h-full flex flex-col overflow-auto px-6 py-3">
      <h2 className="text-center font-serif font-semibold text-xl mt-2 mb-5">
        Cover Image Generation
      </h2>
      <div>
        <h3 className="font-serif text-sm mb-2">
          Select an image style:
        </h3>
        <Select>
          <SelectTrigger className="w-full h-8 font-mono focus:ring-offset-0 focus:ring-[1.5px] rounded-sm">
            <SelectValue placeholder="image styles" />
          </SelectTrigger>
          <SelectContent className="font-mono">
            <SelectItem value={ImageStyles.stippled}>
              {ImageStyles.stippled}
              <span className="text-primary/50">
                {` - ${styleDecscription[ImageStyles.stippled]}`}
              </span>
            </SelectItem>
          </SelectContent>
        </Select>
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
            Generate Cover Image
          </Button>
        </div>
        <div>
          <p className="text-sm italic text-primary/40">
            <span>
              <CircleAlert className="inline h-4 stroke-[1.5px] stroke-primary/40" />
            </span>
            Image generation may take between 20 seconds to 2 minutes.
            Appreciate your patience.
          </p>
        </div>
      </div>
      <div className="overflow-y-auto px-2 h-full block content-center align-middle">
        {imgSrc ? (
          <img
            src={`data:image/png;base64,${imgSrc}`}
            alt="cover"
            className="max-h-[80%] mx-auto"
          />
        ) : (
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

export default ImageEditor;
