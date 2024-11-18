import { useRef, ComponentProps } from "react";
import { Article } from "@shared/models/Articles";
import { cn } from "@/utils";
import useImageHeight from "@/hooks/useImgHeight";

type NewsCardProps = {
  article: Article;
} & ComponentProps<"div">;

const NewsCard = ({ article, ...props }: NewsCardProps) => {
  const imgRef = useRef<HTMLImageElement>(null);

  const { imgError, loading, imgHeight } = useImageHeight(
    article.urlToImage!,
    imgRef
  );

  return (
    <div
      className="p-2 border bg-background/80 rounded-lg transition-all duration-150 shadow-news-card"
      {...props}
    >
      <div
        className={cn(
          "transition-all duration-100 overflow-hidden rounded-sm",
          loading ? "opacity-0" : "opacity-100"
        )}
        style={{ height: `${imgHeight}px` }}
      >
        {loading && (
          <div className="w-full h-full bg-transparent rounded-sm flex items-center justify-center"></div>
        )}
        {article.urlToImage && !imgError && (
          <img
            ref={imgRef}
            className="overflow-hidden"
            src={article.urlToImage!}
          />
        )}
        {imgError && (
          <div className="w-full h-full bg-primary rounded-sm flex items-center justify-center">
            <span className="font-medium text-2xl text-background">
              {article.source.name}
            </span>
          </div>
        )}
      </div>
      <div className="p-1 pt-2">
        <h1 className="font-semibold leading-tight text-md hover:underline">
          <a href={article.url} target="_blank">
            {article.title}
          </a>
        </h1>
        <div className="flex justify-start items-center gap-2 my-3">
          <div className="flex items-center justify-center max-w-[60%] px-2 font-semibold text-xs text-background bg-primary/70 rounded">
            {article.source.name}
          </div>

          <p className="text-xs text-primary/50">
            {article.publishedAt.slice(0, 10)}
          </p>
        </div>
        <p className="font-serif text-[0.8rem]">
          {article.description}
        </p>
      </div>
    </div>
  );
};

export default NewsCard;
