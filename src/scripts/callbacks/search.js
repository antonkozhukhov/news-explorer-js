import {numberOfArticlesForOneLoad, emptyKeywordMessage, newsApiError} from '../variables/variables';
import { nothingNotFound,showmoreButton,results,finding, searchName, articleContainer} from '../script';
import {ArticleList} from '../classes/articleList';
import {NewsApi} from '../fetchs/newsApi';
import {formDisabled, formAbled } from '../functions/functions'
const searchMenuForm = document.querySelector('.search-menu__form');
const searchError = document.querySelector('.search-menu__error');
const newsApi = new NewsApi();
let numberOfLoadedArticles = 0;
let articles = [];
let keyWord = '';
let articlesAll;
let articleList;
let lengthArticles;

export function search(){
  formDisabled(searchMenuForm);
  numberOfLoadedArticles = 0;
  event.preventDefault();
  articles= [];
  while (articleContainer.firstChild) {
    articleContainer.removeChild(articleContainer.lastChild);
  }
  results.classList.remove('display-none')
  nothingNotFound.classList.add('display-none');
  showmoreButton.classList.add('display-none');
  finding.classList.remove('display-none');

  keyWord = searchName.value;
  if (!keyWord){searchError.textContent = emptyKeywordMessage;
    formAbled(searchMenuForm);
    finding.classList.add('display-none');
  }
  else{
    newsApi.getNews(keyWord).then((res)=>{
      formAbled(searchMenuForm);
      finding.classList.add('display-none');
    if (res.articles.length === 0){
      nothingNotFound.classList.remove('display-none');
    }
    if (res.articles.length!=0 && res.articles.length <= numberOfArticlesForOneLoad){
        articleList = new ArticleList(keyWord, articleContainer, res.articles);
        articleList.render(keyWord, res.articles);
      }
    if (res.articles.length > numberOfArticlesForOneLoad){

        for (let k = 0; k < numberOfArticlesForOneLoad; k++){
        articles[k] = res.articles[k];
       }
        articleList = new ArticleList(keyWord, articleContainer, articles);
        articleList.render(keyWord, articles);
        showmoreButton.classList.remove('display-none')
        lengthArticles = res.articles.length;
        articlesAll = res.articles;
        keyWord = searchName.value;
      }
      numberOfLoadedArticles = numberOfLoadedArticles + numberOfArticlesForOneLoad;
    })
    .catch(err => {
      searchError.textContent = newsApiError;
      formAbled(searchMenuForm);
      finding.classList.add('display-none');
      console.log(err);
 })
}
  }
  export function showMore() {
    if (lengthArticles - numberOfLoadedArticles > numberOfArticlesForOneLoad){
      for (let k = 0; k < numberOfArticlesForOneLoad; k++){
        articles[k] = articlesAll[numberOfLoadedArticles+k];
       }
        articleList = new ArticleList(keyWord, articleContainer, articles);
        articleList.render(keyWord, articles);
        numberOfLoadedArticles = numberOfLoadedArticles + numberOfArticlesForOneLoad;
    }
    else {
          for (let k = 0; k <= lengthArticles - numberOfLoadedArticles; k++){
           articles[k] = articlesAll[numberOfLoadedArticles+k];
          }
          showmoreButton.classList.add('display-none');
          articleList = new ArticleList(keyWord, articleContainer, articles);
          articleList.render(keyWord, articles);
        }
  }