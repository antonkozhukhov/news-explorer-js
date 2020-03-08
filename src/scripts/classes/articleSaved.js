import {serverApi} from '../secondary';
export class Article{
  constructor(article){
    this.articleElement = this._createarticle(article);
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

  _createarticle(article){
    const articleResult = document.createElement('a');  /*создание элементов карточки*/
    articleResult.classList.add('article');
    articleResult.setAttribute('href', article.link);
    articleResult.setAttribute('target', '_blank');

    const articlePic = document.createElement('div');
    articlePic.classList.add('article__pic');
    const articleTitle = document.createElement('h3');
    articleTitle.classList.add('article__title');
    articleTitle.textContent =  article.title;
    const articleKeyword = document.createElement('h3');
    articleKeyword.classList.add('article__icon-name');
    articleKeyword.textContent =  article.keyword;

    const articleImg = document.createElement('img');
    articleImg.classList.add('article__img');
    articleImg.setAttribute('src', article.image);

    const articleIconSave = document.createElement('div');
    articleIconSave.classList.add('article__icon-save');
    articleIconSave.classList.add('article__icon-save_saved');

     const articleDate = document.createElement('p');
     articleDate.classList.add('article__date');
     articleDate.textContent = article.date;

     const articleContent = document.createElement('p');
     articleContent.classList.add('article__content');
     articleContent.textContent =  article.text;

     const articleSource = document.createElement('p');
     articleSource.classList.add('article__source');
     articleSource.textContent =  article.source;

     articlePic.appendChild(articleImg);
    articleResult.appendChild(articleIconSave);
    articleResult.appendChild(articlePic);
    articleResult.appendChild(articleKeyword);
    articleResult.appendChild(articleDate);
    articleResult.appendChild(articleTitle);
    articleResult.appendChild(articleContent);
    articleResult.appendChild(articleSource);
    return articleResult;
  }

}