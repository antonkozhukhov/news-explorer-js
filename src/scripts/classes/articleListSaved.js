import {Article} from './articleSaved';
const createCard = (article)=>new Article(article);
export class ArticleList{
  constructor(container, initialArticles){
    this.container = container;
    this.initialArticles = initialArticles;

  }

   _addArticle(article){
      const {articleElement} = createCard(article);
      this.container.appendChild(articleElement);
  }
   render(initialArticles){
          initialArticles.forEach((article) => this._addArticle(article));
  }
}