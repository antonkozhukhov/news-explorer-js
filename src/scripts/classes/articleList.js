import {Article} from './article';
export class ArticleList{
  constructor(keyword, container, initialArticles){
    this.keyword = keyword;
    this.container = container;
    this.initialArticles = initialArticles;
    this._render(keyword, initialArticles);
  }

  _addArticle(keyword, article, saved){
      const {articleElement} = new Article(keyword, article, saved);
      this.container.appendChild(articleElement);
  }
  // добавляем карточки в контейнер
  _render(keyword, initialArticles){
          initialArticles.forEach((article) => this._addArticle(keyword, article, false))
  }
}
