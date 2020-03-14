import {Article} from './article';
const createCard = (keyword, article, saved)=>new Article(keyword, article, saved);
export class ArticleList{
  constructor(keyword, container, initialArticles){
    this.keyword = keyword;
    this.container = container;
    this.initialArticles = initialArticles;
    }

  _addArticle(keyword, article, saved){
      const {articleElement} = createCard(keyword, article, saved);
      this.container.appendChild(articleElement);
  }
  // добавляем карточки в контейнер
  render(keyword, initialArticles){
          initialArticles.forEach((article) => this._addArticle(keyword, article, false))
  }
}
