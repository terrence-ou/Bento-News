import { useRef } from "react";
import useImageHeight from "@/hooks/useImgHeight";
import { Article } from "@shared/models/Articles";

const NewsCardRow = ({ article }: { article: Article }) => {
  const imgRef = useRef<HTMLImageElement>(null);

  const { imgError, loading } = useImageHeight(
    article.urlToImage!,
    imgRef
  );

  return (
    <div className="grid grid-cols-7 gap-6 p-2 bg-background/80 rounded-lg transition-all duration-150 shadow-news-card">
      <div className="transition-all duration-100 overflow-hidden rounded-sm">
        {loading && (
          <div className="w-full h-full bg-transparent rounded-sm flex items-center justify-center"></div>
        )}
        {article.urlToImage && !imgError && (
          <img
            ref={imgRef}
            className="overflow-hidden w-full h-full object-cover max-h-32"
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
      </div>
      <div className="col-span-2 content-end">
        <h1 className="font-semibold text-base text-primary leading-tight hover:underline">
          <a href={article.url} target="_blank">
            {article.title}
          </a>
        </h1>
        <div className="flex justify-start items-center gap-2 mt-1">
          <div className="flex items-center justify-center max-w-[60%] px-2 py-[2px] font-semibold text-xs text-background bg-primary/70 rounded">
            {article.source.name}
          </div>
          <p className="text-primary/50 text-xs">
            {article.publishedAt.slice(0, 10)}
          </p>
        </div>
      </div>
      <div className="col-span-4 content-end">
        <p className="text-sm font-serif">{article.description}</p>
      </div>
    </div>
  );
};

export default NewsCardRow;
