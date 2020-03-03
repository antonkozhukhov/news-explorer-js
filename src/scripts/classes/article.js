import {api} from '../script'
import {date} from '../functions/functionSave'
import {islogin} from '../functions/functions'
export class Article{
  constructor(keyword, article, saved){
    this.id;
    this.keyword = keyword;
    this.saved = saved;
    this.articleElement = this.createarticle(keyword, article, saved);

    // нажали на "сохранить" при разных состояниях логина
    this.articleElement.querySelector('.article__icon-save').addEventListener('click', function( event){
      event.stopPropagation();
      event.preventDefault();
      if(islogin){
          if(!saved){
            event.target.classList.add('article__icon-save_active');
            event.target.classList.remove('article__icon-save_hover');
            saved = true;
            api.postArticle(keyword, article)
            .then(res=>{ this.id = res;})

          }
          else {
            event.target.classList.remove('article__icon-save_active');
            saved = false;
            api.deleteArticle(this.id)

          }
        }
    else{event.preventDefault(); }
    })

// подвели мышь и отвели мышь при разных состояниях логина
    this.articleElement.querySelector('.article__icon-save').addEventListener('mouseover', function( event){
       if (!islogin){
          event.target.parentElement.querySelector('.article__icon-delete').classList.remove('display-none');
          event.target.classList.add('article__icon-save_hover');
        }
       else if(saved) {event.target.classList.add('article__icon-save_active');}
       else if(!saved) {event.target.classList.add('article__icon-save_hover');}
    })
    this.articleElement.querySelector('.article__icon-save').addEventListener('mouseout', function( event){
      if (!islogin){
        event.target.parentElement.querySelector('.article__icon-delete').classList.add('display-none');
        event.target.classList.remove('article__icon-save_hover');
    }
      else if(!saved) {event.target.classList.remove('article__icon-save_hover');}
    })

}
//  элементы статьи
 createarticle(keyword, article, saved){

    const articleResult = document.createElement('a');  /*создание элементов карточки*/
    articleResult.classList.add('article');
    articleResult.setAttribute('href', article.url);
    articleResult.setAttribute('target', '_blank');
    const articlePic = document.createElement('div');
    articlePic.classList.add('article__pic');
    const articleTitle = document.createElement('h3');
    articleTitle.classList.add('article__title');
    articleTitle.textContent =  article.title;

    const articleIconNotLogin = document.createElement('h3');
    articleIconNotLogin.classList.add('article__icon-delete');
    articleIconNotLogin.classList.add('display-none');
    articleIconNotLogin.textContent = 'Войдите, чтобы сохранять статьи';

    const articleImg = document.createElement('img');
    articleImg.classList.add('article__img');
    articleImg.setAttribute('src', article.urlToImage);

    const articleIconSave = document.createElement('div');
    articleIconSave.classList.add('article__icon-save');

     const articleDate = document.createElement('p');
     articleDate.classList.add('article__date');
     articleDate.textContent = date( article.publishedAt);

     const articleContent = document.createElement('p');
     articleContent.classList.add('article__content');
     articleContent.textContent =  article.description;

     const articleSource = document.createElement('p');
     articleSource.classList.add('article__source');
     articleSource.textContent =  article.source.name;

     articlePic.appendChild(articleImg);
    articleResult.appendChild(articleIconSave);
    articleResult.appendChild(articlePic);
    articleResult.appendChild(articleDate);
    articleResult.appendChild(articleTitle);
    articleResult.appendChild(articleContent);
    articleResult.appendChild(articleSource);
    articleResult.appendChild(articleIconNotLogin);

    return articleResult;
  }
}