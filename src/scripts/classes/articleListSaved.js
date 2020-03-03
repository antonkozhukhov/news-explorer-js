import {Article} from './articleSaved';
export class ArticleList{
  constructor(container, initialArticles){
    this.container = container;
    this.initialArticles = initialArticles;
    this.render(initialArticles);
  }

   addArticle(article){
      const {articleElement} = new Article(article);
      this.container.appendChild(articleElement);
  }
   render(initialArticles){
          initialArticles.forEach((article) => this.addArticle(article));
  }
}