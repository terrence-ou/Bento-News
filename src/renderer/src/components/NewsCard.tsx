import { useState, ComponentProps } from "react";
import { Link } from "lucide-react";
import { Article } from "@shared/models/Articles";

type NewsCardProps = {
  article: Article;
} & ComponentProps<"div">;

const NewsCard = ({ article, ...props }: NewsCardProps) => {
  const [imgError, setImgError] = useState<boolean>(false);

  // TODO: Precheck if article.urlToImage is valid

  return (
    <div
      className="p-2 border bg-background/50 rounded-lg"
      {...props}
    >
      {article.urlToImage && !imgError ? (
        <img
          className="overflow-hidden rounded-sm"
          src={article.urlToImage!}
          onError={() => {
            setImgError(true);
          }}
        />
      ) : (
        <div className="w-full h-28 bg-destructive rounded-sm flex items-center justify-center">
          <span className="font-medium text-2xl text-background">
            {article.source.name}
          </span>
        </div>
      )}
      <h1 className="font-semibold leading-tight mt-2">
        {article.title}
      </h1>
      <div className="flex justify-start items-center gap-2 mt-2 mb-3">
        <div className="flex items-center justify-center px-2 h-5 font-semibold text-xs text-background bg-primary/70 rounded">
          {article.source.name}
        </div>
        <a href={article.url} target="_blank">
          <Link
            className="stroke-primary/70"
            strokeWidth={"2px"}
            size={15}
          />
        </a>
        <p className="text-xs text-primary/50">
          {article.publishedAt.slice(0, 10)}
        </p>
      </div>
      <p className="font-serif text-[0.8rem]">
        {article.description}
      </p>
    </div>
  );
};

export default NewsCard;
