import { memo, ComponentProps, useRef, useState } from "react";
import { useAtom } from "jotai";
import { searchLayoutAtom } from "@/atoms/searchAtoms";
import useImageHeight from "@/hooks/useImgHeight";
import { cn } from "@/utils";
import { Article } from "@shared/models/Articles";
import { Ellipsis } from "lucide-react";
import AddToFolderDropdown from "@/components/AddToFolderDropdown";

type NewsCardFixedProps = {
  article: Article;
} & ComponentProps<"div">;

const NewsCardFixedComponent = ({
  article,
  ...props
}: NewsCardFixedProps) => {
  const [showDropdown, setShowDropdown] = useState<boolean>(false);
  const imgRef = useRef<HTMLImageElement>(null);
  const divRef = useRef<HTMLDivElement>(null);
  const [layout] = useAtom(searchLayoutAtom);

  const { imgError, loading } = useImageHeight(
    article.urlToImage!,
    imgRef
  );

  return (
    <div
      ref={divRef}
      className="flex flex-col p-2 border bg-background/80 rounded-lg transition-all duration-150 shadow-news-card"
      {...props}
      onMouseOver={() => setShowDropdown(true)}
      onMouseLeave={() => setShowDropdown(false)}
    >
      <div
        className={cn(
          "relative transition-all duration-100 overflow-hidden rounded-sm",
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
          <div className="w-full h-36 bg-primary rounded-sm flex items-center justify-center">
            <span className="px-4 font-medium text-2xl text-background">
              {article.source.name}
            </span>
          </div>
        )}
        {showDropdown && (
          <AddToFolderDropdown article={article}>
            <button
              className="w-8 absolute top-2 right-2 rounded-full bg-background focus-visible:outline-none focus-visible:outline-offset-0 shadow-md animate-fadeIn"
              onMouseMove={(e) => e.stopPropagation()}
              onMouseLeave={(e) => e.stopPropagation()}
            >
              <Ellipsis className="stroke-primary mx-auto" />
            </button>
          </AddToFolderDropdown>
        )}
      </div>
      <div
        className={cn(
          "p-1 pt-2",
          layout === "mini" && "flex flex-col-reverse"
        )}
      >
        <h1 className="font-semibold leading-tight text-md hover:underline">
          <a href={article.url} target="_blank">
            {article.title}
          </a>
        </h1>
        <div className="flex justify-start items-center gap-2 my-3">
          <div className="flex items-center justify-center max-w-[60%] px-2 font-semibold text-xs text-background bg-primary/70 rounded">
            {article.source.name}
          </div>
          <p className="text-primary/50 text-xs">
            {article.publishedAt.slice(0, 10)}
          </p>
        </div>
        {layout === "full" && (
          <p className="font-serif text-[0.8rem]">
            {article.description}
          </p>
        )}
      </div>
    </div>
  );
};

const NewsCardFixed = memo(NewsCardFixedComponent, (prev, next) => {
  return prev.article === next.article;
});

export default NewsCardFixed;
