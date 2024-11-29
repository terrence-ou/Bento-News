import { Checkbox } from "@/components/ui/checkbox";
import { Article } from "@shared/models/Articles";

const NewsCheckbox = ({
  article,
  selected,
  onClick,
}: {
  article: Article;
  selected: boolean;
  onClick: () => void;
}) => {
  return (
    <div className="flex items-center my-4 px-3 py-2 gap-3 border bg-background/60 shadow-news-card rounded-sm">
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
  );
};

export default NewsCheckbox;
