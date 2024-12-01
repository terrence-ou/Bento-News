import { useAtom } from "jotai";
import { selectedArticlesAtom } from "@/atoms/foldersAtoms";
import { Article } from "@shared/models/Articles";
import { Button } from "@/components/ui/button";
import NewsCheckbox from "@/components/workspace/NewsCheckBox";
import { useMemo } from "react";
import { ListChecks, ListX } from "lucide-react";

const SavedNews = ({ articles }: { articles: Article[] }) => {
  const [selectedArticles, setSelectedArticles] = useAtom(
    selectedArticlesAtom
  );

  const selectedArticlesSet = useMemo(
    () => new Set(selectedArticles.map((article) => article.title)),
    [selectedArticles]
  );

  // Selection handlers
  const handleSelect = (article: Article) => {
    if (selectedArticlesSet.has(article.title)) {
      setSelectedArticles((prevArticles) =>
        prevArticles.filter((prev) => prev.title !== article.title)
      );
    } else {
      setSelectedArticles((prevArticles) => [
        ...prevArticles,
        article,
      ]);
    }
  };

  const handleSelectAll = () => {
    setSelectedArticles(articles);
  };

  const handleUncheckAll = () => {
    setSelectedArticles([]);
  };

  return (
    <>
      <div className="flex gap-2">
        <Button
          variant="outline"
          className="h-8"
          onClick={handleSelectAll}
        >
          <ListChecks />
          Select all
        </Button>
        <Button
          variant="outline"
          className="h-8"
          onClick={handleUncheckAll}
        >
          <ListX />
          Uncheck all
        </Button>
      </div>
      <div className="flex-1 max-h-full overflow-auto">
        {articles.map((article) => (
          <NewsCheckbox
            key={`checkbox-${article.title}`}
            article={article}
            selected={selectedArticlesSet.has(article.title)}
            onClick={() => handleSelect(article)}
          />
        ))}
      </div>
    </>
  );
};

export default SavedNews;
