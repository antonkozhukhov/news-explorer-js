import {serverApi} from '../script'
import {date} from '../functions/functionSave'
import {islogin} from '../functions/functions'
import {createBaseArticle} from '../functions/createBaseArticle'
export class Article{
  constructor(keyword, article, saved){
    this.id;
    this.keyword = keyword;
    this.saved = saved;
    this.articleElement = this._createArticle(keyword, article, saved);

    // нажали на "сохранить" при разных состояниях логина
    this.articleElement.querySelector('.article__icon-save').addEventListener('click', function(event){
      event.stopPropagation();
      event.preventDefault();
      if(islogin){
          if(!saved){
            serverApi.postArticle(keyword, article)
            .then(res=>{
               this.id = res;
               event.target.classList.add('article__icon-save_active');
               event.target.classList.remove('article__icon-save_hover');
               saved = true;
              })
              .catch(err => {
               console.log(err);
              })

        }
          else {
            serverApi.deleteArticle(this.id)
            .then(()=>{
            event.target.classList.remove('article__icon-save_active');
            saved = false;
            })
            .catch(err => {
              console.log(err);
             })
        }
        }
    else{event.preventDefault();}
    });
// подвели мышь и отвели мышь при разных состояниях логина
    this.articleElement.querySelector('.article__icon-save').addEventListener('mouseover', function(){
      if (!islogin){
        event.target.parentElement.querySelector('.article__icon-delete').classList.remove('display-none');
        event.target.classList.add('article__icon-save_hover');
      }
     else if(saved) {event.target.classList.add('article__icon-save_active');
     event.target.classList.remove('article__icon-save_hover');}
     else if(!saved) {event.target.classList.add('article__icon-save_hover');}

    });
    this.articleElement.querySelector('.article__icon-save').addEventListener('mouseout', function(){
      if (!islogin){
        event.target.parentElement.querySelector('.article__icon-delete').classList.add('display-none');
        event.target.classList.remove('article__icon-save_hover');
    }
      else if(!saved) {event.target.classList.remove('article__icon-save_hover');}
      else if(saved) {event.target.classList.add('article__icon-save_active');}
    });
}

  _createArticle(keyword, article, saved){
    const articleResult = createBaseArticle(article);
    articleResult.setAttribute('href', article.url);
    articleResult.querySelector('.article__source').textContent =  article.source.name;
    articleResult.querySelector('.article__content').textContent =  article.description;
    articleResult.querySelector('.article__date').textContent = date( article.publishedAt);
    articleResult.querySelector('.article__img').setAttribute('src', article.urlToImage);
    const articleIconNotLogin = document.createElement('h3');
    articleIconNotLogin.classList.add('article__icon-delete');
    articleIconNotLogin.classList.add('display-none');
    articleIconNotLogin.textContent = 'Войдите, чтобы сохранять статьи';
    articleResult.appendChild(articleIconNotLogin);
  return articleResult;
  }
}