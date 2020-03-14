import {serverApi} from '../secondary';
import {createBaseArticle} from '../functions/createBaseArticle'
export class Article{
  constructor(article){
    this.articleElement = this._createArticle(article);
    this.articleElement.querySelector('.article__icon-save_saved').addEventListener('click', function(){
      event.stopImmediatePropagation();
      event.preventDefault();
      const card = event.target.parentElement;
      serverApi.deleteArticle(article._id)
      .then(()=>{
        card.parentElement.removeChild(card);
        })
          .catch(err => {
          console.log(err);
         })
    });
  }
  _createArticle(article){
    const articleResult  = createBaseArticle(article);
    articleResult.setAttribute('href', article.link);
    articleResult.querySelector('.article__source').textContent =  article.source;
    articleResult.querySelector('.article__content').textContent =  article.text;
    articleResult.querySelector('.article__date').textContent = article.date;
    articleResult.querySelector('.article__img').setAttribute('src', article.image);
    articleResult.querySelector('.article__icon-save').classList.add('article__icon-save_saved');
    const articleKeyword = document.createElement('h3');
    articleKeyword.classList.add('article__icon-name');
    articleKeyword.textContent =  article.keyword;
    articleResult.appendChild(articleKeyword);
  return articleResult;
  }
}