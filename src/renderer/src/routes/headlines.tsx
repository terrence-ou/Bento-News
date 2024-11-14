import { useMemo, useState } from "react";
import { Article, Articles } from "@shared/models/Articles";
import { useLoaderData } from "react-router-dom";
import NewsCard from "@/components/NewsCard";
import { cn } from "@/utils";

const Headlines = () => {
  const data = useLoaderData() as Articles;
  const [cols, _] = useState<number>(4);

  const articleGroups = useMemo(() => {
    // create empty groups
    const groups: Article[][] = Array.from(
      { length: cols },
      () => []
    );
    // fill groups with articles
    for (let i = 0; i < data.articles.length; i++) {
      groups[i % cols].push(data.articles[i]);
    }
    return groups;
  }, [data, cols]);

  let gridCols = "grid-cols-4";

  switch (cols) {
    case 2:
      gridCols = "grid-cols-2";
      break;
    case 3:
      gridCols = "grid-cols-3";
      break;
    case 4:
      gridCols = "grid-cols-4";
      break;
    default:
      gridCols = "grid-cols-4";
  }

  return (
    <div className="p-6 max-h-full">
      <h1 className="font-serif text-2xl">Headlines</h1>
      <div className={cn("grid gap-3 my-3", gridCols)}>
        {articleGroups.map((group, i) => (
          <div key={`col-${i}`} className="flex flex-col gap-3">
            {group.map((article) => (
              <NewsCard key={article.title} article={article} />
            ))}
          </div>
        ))}
      </div>
      <h1 className="font-serif text-2xl pb-2">Previous</h1>
    </div>
  );
};

export default Headlines;
