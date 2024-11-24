import { memo, ComponentProps, useRef } from "react";
import useImageHeight from "@/hooks/useImgHeight";
import { cn } from "@/utils";
import { Article } from "@shared/models/Articles";

type NewsCardFixedProps = {
  article: Article;
} & ComponentProps<"div">;

const NewsCardFixedComponent = ({
  article,
  ...props
}: NewsCardFixedProps) => {
  const imgRef = useRef<HTMLImageElement>(null);

  const { imgError, loading } = useImageHeight(
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
      >
        {loading && (
          <div className="w-full h-full bg-transparent rounded-sm flex items-center justify-center"></div>
        )}
        {article.urlToImage && !imgError && (
          <img
            ref={imgRef}
            className="overflow-hidden h-40 w-full object-cover"
            src={article.urlToImage!}
          />
        )}
        {imgError && (
          <div className="w-full h-28 bg-primary rounded-sm flex items-center justify-center">
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

const NewsCardFixed = memo(NewsCardFixedComponent, (prev, next) => {
  return prev.article === next.article;
});

export default NewsCardFixed;
