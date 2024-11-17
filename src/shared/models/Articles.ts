type ArticleParams = {
  source: { id: string | null; name: string };
  author: string | null;
  title: string;
  description: string;
  url: string;
  urlToImage: string | null;
  publishedAt: string;
  content: string | null;
};

// Class for a list of articles
export class Articles {
  public articles: Article[];

  constructor(articles: Article[]) {
    this.articles = [];
    for (const article of articles) {
      if (article.title === "[Removed]") continue;
      if (!article.description || !article.content) continue;
      this.articles.push(new Article(article));
    }
  }
}

// Class for an article
export class Article {
  public source: { id: string | null; name: string };
  public author: string | null;
  public title: string;
  public description: string;
  public url: string;
  public urlToImage: string | null;
  public publishedAt: string;
  public content: string | null;

  constructor({
    source,
    author,
    title,
    description,
    url,
    urlToImage,
    publishedAt,
    content,
  }: ArticleParams) {
    this.source = source;
    this.author = author;
    this.title = title;
    this.description = description;
    this.url = url;
    this.urlToImage = urlToImage;
    this.publishedAt = publishedAt;
    this.content = content;
  }
}
