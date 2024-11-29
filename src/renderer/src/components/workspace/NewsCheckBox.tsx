import { Checkbox } from "@/components/ui/checkbox";
import { Article } from "@shared/models/Articles";
import { X, CircleX, CircleSlash } from "lucide-react";
import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

const NewsCheckbox = ({
  article,
  selected,
  onClick,
}: {
  article: Article;
  selected: boolean;
  onClick: () => void;
}) => {
  const { folderName } = useParams();
  const navigate = useNavigate();
  const [deleting, setDeleting] = useState<boolean>(false);

  return (
    <div
      className="group flex items-center justify-between my-4 px-3 py-2 border bg-background/60 shadow-news-card rounded-sm"
      onMouseLeave={() => deleting && setDeleting(false)}
    >
      <div className="flex items-center gap-3">
        <Checkbox
          id={article.title}
          checked={selected}
          className="rounded-[4px] border-[1.5px] focus-visible:ring-offset-0 focus-visible:ring-0"
          onClick={onClick}
        />
        <div>
          <h3 className="font-semibold">
            <a
              href={article.url}
              target="_blank"
              className="hover:cursor-pointer hover:underline"
            >
              {article.title}
            </a>
          </h3>
          <p className="font-serif font-light text-sm leading-tight">
            {article.description}
          </p>
          <div className="flex justify-start items-center gap-2 mt-2">
            <div className="flex items-center justify-center max-w-[60%] px-2 font-semibold text-xs text-background bg-primary/70 rounded">
              {article.source.name}
            </div>
            <p className="text-xs text-primary/50">
              {article.publishedAt.slice(0, 10)}
            </p>
          </div>
        </div>
      </div>
      {!deleting ? (
        <button
          className="group-hover:visible invisible"
          onClick={() => setDeleting(true)}
        >
          <X className="w-4 h-4" strokeWidth={"2px"} />
        </button>
      ) : (
        <div className="group-hover:visible invisible flex flex-wrap items-center gap-1">
          <button
            onClick={async () => {
              await window.context.removeArticleFromFolder(
                article,
                folderName!
              );
              navigate(`/folders/${folderName}`);
            }}
          >
            <CircleX
              className="w-6 h-6 stroke-destructive/80"
              strokeWidth={"1.5px"}
            />
          </button>
          <button>
            <CircleSlash
              className="w-6 h-6 stroke-primary/40"
              strokeWidth={"1.5px"}
              onClick={() => setDeleting(false)}
            />
          </button>
        </div>
      )}
    </div>
  );
};

export default NewsCheckbox;
