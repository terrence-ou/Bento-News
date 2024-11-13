type ArticleParams = {
  source: { id: string | null; name: string };
  author: string | null;
  title: string;
  description: string;
  url: string;
  urlToImage: string | null;
  publishedAt: string;
  content: string;
};

// Class for a list of articles
export class Articles {
  private _articles: Article[];

  constructor(articles: ArticleParams[]) {
    this._articles = [];
    for (const article of articles) {
      if (article.title === "[Removed]") continue;
      this._articles.push(new Article(article));
    }
  }

  // Getter
  get articles() {
    return this._articles;
  }
}

// Class for an article
export class Article {
  private _source: { id: string | null; name: string };
  private _author: string | null;
  private _title: string;
  private _description: string;
  private _url: string;
  private _urlToImage: string | null;
  private _publishedAt: string;
  private _content: string;

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
    this._source = source;
    this._author = author;
    this._title = title;
    this._description = description;
    this._url = url;
    this._urlToImage = urlToImage;
    this._publishedAt = publishedAt;
    this._content = content;
  }

  // Getters
  get source() {
    return this._source;
  }

  get author() {
    return this._author;
  }

  get title() {
    return this._title;
  }

  get description() {
    return this._description;
  }

  get url() {
    return this._url;
  }

  get urlToImage() {
    return this._urlToImage;
  }

  get publishedAt() {
    return this._publishedAt;
  }

  get content() {
    return this._content;
  }
}
