export function createBaseArticle(article){
    const articleResult = document.createElement('a');
    articleResult.classList.add('article');
    articleResult.setAttribute('target', '_blank');
    const articlePic = document.createElement('div');
    articlePic.classList.add('article__pic');
    const articleTitle = document.createElement('h3');
    articleTitle.classList.add('article__title');
    articleTitle.textContent =  article.title;
    const articleImg = document.createElement('img');
    articleImg.classList.add('article__img');
    const articleIconSave = document.createElement('div');
    articleIconSave.classList.add('article__icon-save');
    const articleDate = document.createElement('p');
    articleDate.classList.add('article__date');
    const articleContent = document.createElement('p');
    articleContent.classList.add('article__content');
    const articleSource = document.createElement('p');
    articleSource.classList.add('article__source');

    articlePic.appendChild(articleImg);
    articleResult.appendChild(articleIconSave);
    articleResult.appendChild(articlePic);
    articleResult.appendChild(articleDate);
    articleResult.appendChild(articleTitle);
    articleResult.appendChild(articleContent);
    articleResult.appendChild(articleSource);
  return articleResult;
}



