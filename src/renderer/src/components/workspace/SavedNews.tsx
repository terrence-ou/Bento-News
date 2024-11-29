import { useAtom } from "jotai";
import { selectedArticlesAtom } from "@/atoms/foldersAtoms";
import { Article } from "@shared/models/Articles";
import NewsCheckbox from "@/components/workspace/NewsCheckBox";
import { useMemo } from "react";

const SavedNews = ({ articles }: { articles: Article[] }) => {
  const [selectedArticles, setSelectedArticles] = useAtom(
    selectedArticlesAtom
  );

  const selectedArticlesSet = useMemo(
    () => new Set(selectedArticles.map((article) => article.title)),
    [selectedArticles]
  );

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

  return (
    <div>
      {articles.map((article) => (
        <NewsCheckbox
          key={`checkbox-${article.title}`}
          article={article}
          selected={selectedArticlesSet.has(article.title)}
          onClick={() => handleSelect(article)}
        />
      ))}
    </div>
  );
};

export default SavedNews;
