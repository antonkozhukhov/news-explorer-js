import {numberOfArticlesForOneLoad, emptyKeywordMessage} from '../variables/variables';
import { nothingNotFound,showmoreButton,results,finding, searchName, articleContainer } from '../script';
import {ArticleList} from '../classes/articleList';
import {NewsApi} from '../fetchs/newsApi';
const newsApi = new NewsApi();
let numberOfLoadedArticles = 0;
let articles = [];
let keyWord = '';
let articlesAll;
let articleList;
let lengthArticles;
export function search(){
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
  if (!keyWord){alert(emptyKeywordMessage);
    finding.classList.add('display-none');
  }
  else{
    newsApi.getNews(keyWord).then((res)=>{
      finding.classList.add('display-none');
    if (res.articles.length === 0){
      nothingNotFound.classList.remove('display-none');
    }
    if (res.articles.length!=0 && res.articles.length <= numberOfArticlesForOneLoad){
        articleList = new ArticleList(keyWord, articleContainer, res.articles);
      }
    if (res.articles.length > numberOfArticlesForOneLoad){

        for (let k = 0; k < numberOfArticlesForOneLoad; k++){
        articles[k] = res.articles[k];
       }
        articleList = new ArticleList(keyWord, articleContainer, articles);
        showmoreButton.classList.remove('display-none')
        lengthArticles = res.articles.length;
        articlesAll = res.articles;
        keyWord = searchName.value;
      }
      numberOfLoadedArticles = numberOfLoadedArticles + numberOfArticlesForOneLoad;
    })
    .catch(err => {
      alert ('Во время запроса произошла ошибка. Возможно, проблема с соединением или сервер недоступен. Подождите немного и попробуйте ещё раз');
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
        numberOfLoadedArticles = numberOfLoadedArticles + numberOfArticlesForOneLoad;
    }
    else {
          for (let k = 0; k <= lengthArticles - numberOfLoadedArticles; k++){
           articles[k] = articlesAll[numberOfLoadedArticles+k];
          }
          showmoreButton.classList.add('display-none');
          articleList = new ArticleList(keyWord, articleContainer, articles);
        }
  }