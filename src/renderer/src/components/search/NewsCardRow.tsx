import { useRef, useState } from "react";
import useImageHeight from "@/hooks/useImgHeight";
import { Plus } from "lucide-react";
import { Article } from "@shared/models/Articles";
import AddToFolderDropdown from "@/components/AddToFolderDropdown";

const NewsCardRow = ({ article }: { article: Article }) => {
  const [showDropdown, setShowDropdown] = useState<boolean>(false);
  const imgRef = useRef<HTMLImageElement>(null);

  const { imgError, loading } = useImageHeight(
    article.urlToImage!,
    imgRef
  );

  return (
    <div
      className="grid grid-cols-7 gap-6 p-2 bg-background/80 rounded-lg transition-all duration-150 shadow-news-card"
      onMouseOver={() => setShowDropdown(true)}
      onMouseLeave={() => setShowDropdown(false)}
    >
      <div className="relative transition-all duration-100 overflow-hidden rounded-sm">
        {loading && (
          <div className="w-full h-full bg-transparent rounded-sm flex items-center justify-center"></div>
        )}
        {article.urlToImage && !imgError && (
          <img
            ref={imgRef}
            className="overflow-hidden w-full h-full object-cover"
            src={article.urlToImage!}
          />
        )}
        {imgError && (
          <div className="h-full w-full bg-primary rounded-sm flex items-center justify-center">
            <span className="font-medium text-2xl text-background">
              {article.source.name.replace(/[a-z]/g, "")}
            </span>
          </div>
        )}
        {showDropdown && (
          <AddToFolderDropdown article={article}>
            <button
              className="w-9 h-9 absolute top-[50%] left-[50%] -translate-x-[50%] -translate-y-[50%] rounded-full bg-background focus-visible:outline-none focus-visible:outline-offset-0 shadow-md animate-fadeIn"
              onMouseMove={(e) => e.stopPropagation()}
              onMouseLeave={(e) => e.stopPropagation()}
            >
              <Plus className="stroke-primary mx-auto" />
            </button>
          </AddToFolderDropdown>
        )}
      </div>
      <div className="col-span-2 content-center">
        <h1 className="font-semibold text-base text-primary leading-tight hover:underline">
          <a href={article.url} target="_blank">
            {article.title}
          </a>
        </h1>
        <div className="flex justify-start items-center gap-2 mt-2">
          <div className="flex items-center justify-center max-w-[60%] px-2 py-[2px] font-semibold text-xs text-background bg-primary/70 rounded">
            {article.source.name}
          </div>
          <p className="text-primary/50 text-xs">
            {article.publishedAt.slice(0, 10)}
          </p>
        </div>
      </div>
      <div className="col-span-4 content-center">
        <p className="text-sm font-serif">{article.description}</p>
      </div>
    </div>
  );
};

export default NewsCardRow;
