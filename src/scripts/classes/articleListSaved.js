import {Article} from './articleSaved';
export class ArticleList{
  constructor(container, initialArticles){
    this.container = container;
    this.initialArticles = initialArticles;
    this._render(initialArticles);
  }

   _addArticle(article){
      const {articleElement} = new Article(article);
      this.container.appendChild(articleElement);
  }
   _render(initialArticles){
          initialArticles.forEach((article) => this._addArticle(article));
  }
}