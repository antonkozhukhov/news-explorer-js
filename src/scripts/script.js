const articleContainer = document.querySelector('.table');
const registrationButton = document.querySelector('.registration-button');
const enterButton = document.querySelector('.enter-button');
const showmoreButton = document.querySelector('.show-more');
const registrationOkForm = document.forms.registrationOk;
const registrationForm = document.forms.registration;
const registrationName = registrationForm.elements.name;
const registrationEmail = registrationForm.elements.email;
const registrationPassword = registrationForm.elements.password;
export const menuName = document.querySelector('.header__name');
export const menuAuth = document.querySelector('.header__auth');
const enterForm = document.forms.enter;
const enterEmail = enterForm.elements.enteremail;
const enterPassword = enterForm.elements.enterpassword;
const searchForm = document.forms.search;
const searchName = searchForm.elements.name;
export const formEnter = document.querySelector('.form__enter');
export const formRegistration = document.querySelector('.form__registration');
export const formRegistrationOk = document.querySelector('.form__registration-ok');
let articleList;
let articles = [];
let articlesAll = [];
let lengthArticles;
let numb;
let keyWord = '';

import {Api} from './fetchs/api';
import {NewsApi} from './fetchs/newsApi';
import {ArticleList} from './classes/articleList';
import {ValidateRegistration, ValidateEnter} from './classes/validation';
import {Popup} from './classes/popup';
import {islogged, isNotlogged } from './functions/functions';
import { baseUrl, badToken, emailOrPasswordError, userError, emptyString } from './variables/variables';

const newsApi = new NewsApi();
const enterPopup = new Popup(formEnter);
const registrationPopup = new Popup(formRegistration);
const registrationOkPopup = new Popup (formRegistrationOk);
const registrationValidate = new ValidateRegistration(registrationButton, formRegistration);
const enterValidate = new ValidateEnter(enterButton, formEnter);

export const api = new Api({
  baseUrl: baseUrl,
  headers: {
    'Content-Type': 'application/json'
  }
  });
api.getMe()
    .then(res=>{
      if(res){islogged()}
      else isNotlogged();
})
// выход
document.querySelector('.header__name-image').addEventListener('click',function(){
  event.preventDefault();
  localStorage.setItem('token', badToken);
  isNotlogged();
})
// авторизироваться
document.querySelector('.header__auth').addEventListener('click', function() {
  event.preventDefault();
  registrationPopup.open();
  registrationValidate.buttonIsNotValid();
});
// выход в мобильной версии
document.querySelector('.header__name-icon_mobile').addEventListener('click',function(){
  event.preventDefault();
  document.querySelector('.body-mobile').classList.add('display-none')
  localStorage.setItem('token', badToken);
  isNotlogged();
})
// авторизоваться в мобильной версии
document.querySelector('.header__auth_mobile').addEventListener('click', function() {
  event.preventDefault();
  document.querySelector('.body-mobile').classList.add('display-none')
  registrationPopup.open();
  registrationValidate.buttonIsNotValid();
});

// валидация инпутов
registrationName.addEventListener('input',function(){
  registrationValidate.handleValidate(event);
});
registrationEmail.addEventListener('input',function(){
  document.querySelector('#user-is').textContent = emptyString;
  registrationValidate.handleValidate(event);
});
registrationPassword.addEventListener('input',function(){
  registrationValidate.handleValidate(event);
});
enterEmail.addEventListener('input',function(){
  document.querySelector('#error-email-or-password').textContent = emptyString;
  enterValidate.handleValidate(event);
});
enterPassword.addEventListener('input',function(){
  document.querySelector('#error-email-or-password').textContent = emptyString;
  enterValidate.handleValidate(event);
});
// переход между попапами
document.querySelector('.or-registration__link_enter').addEventListener('click', function() {
  event.preventDefault();
  registrationPopup.close();
  enterPopup.open();
  enterValidate.buttonIsNotValid();
});
document.querySelector('.or-registration__link_registration').addEventListener('click', function() {
  event.preventDefault();
  enterPopup.close();
  registrationPopup.open();
  registrationValidate.buttonIsNotValid();
});

// регистрация пользователя
registrationForm.addEventListener('submit', function(event){
    event.preventDefault();
    api.signup(registrationName.value, registrationEmail.value, registrationPassword.value)
    .then(res=>{
      if (res){
        registrationPopup.close();
        registrationOkPopup.open();
        registrationValidate.buttonIsNotValid();
        document.querySelector('#user-is').textContent = emptyString;
      }
      else document.querySelector('#user-is').textContent = userError;
    })
})
// Аутентификация
enterForm.addEventListener('submit', function(){
  event.preventDefault();
  api.signin( enterEmail.value, enterPassword.value).then((res)=>{
    if(res){
      localStorage.setItem('token', res.token);
      api.getMe()
      .then(()=>{
       enterPopup.close();
       islogged();})
  }
    else document.querySelector('#error-email-or-password').textContent = emailOrPasswordError;
})
})
// попап при успешной регистрации
registrationOkForm.addEventListener('submit', function(){
    event.preventDefault();
    registrationOkPopup.close();
    enterPopup.open();
})

// поиск по ключевому слову
searchForm.addEventListener('submit', function(){
  numb = 0;
  event.preventDefault();
  articles= [];
  while (articleContainer.firstChild) {
    articleContainer.removeChild(articleContainer.lastChild);
  }
  document.querySelector('.results').classList.remove('display-none')
  document.querySelector('.nothing-not-found').classList.add('display-none');
  document.querySelector('.show-more').classList.add('display-none');
  document.querySelector('.finding').classList.remove('display-none');

  if (!searchName){ event.preventDefault();}
  keyWord = searchName.value;
    newsApi.getNews(keyWord).then((res)=>{
    document.querySelector('.finding').classList.add('display-none');
    if (res.articles.length === 0){
      document.querySelector('.nothing-not-found').classList.remove('display-none');
    }
    if (res.articles.length!=0 && res.articles.length<=3){
        articleList = new ArticleList(keyWord, articleContainer, res.articles);
      }
    if (res.articles.length > 3){
        articles = [res.articles[0],res.articles[1],res.articles[2] ]
        articleList = new ArticleList(keyWord, articleContainer, articles);
        document.querySelector('.show-more').classList.remove('display-none')
        lengthArticles = res.articles.length;
        articlesAll = res.articles;
        keyWord = searchName.value;
      }
    })
    searchForm.reset();
    numb = numb+3;
  })

  // кнопка "показать ещё"
showmoreButton.addEventListener('click', function() {
  if (lengthArticles - numb > 3){
      articles = [articlesAll[numb],articlesAll[numb+1],articlesAll[numb+2]]
      articleList = new ArticleList(keyWord, articleContainer, articles, keyWord);
      numb = numb+3;
  }
  else {
        for (let k = 0; k < lengthArticles - numb; k++){
         articles[k] = articlesAll[numb+k];
        }
        document.querySelector('.show-more').classList.add('display-none');
        articleList = new ArticleList(keyWord, articleContainer, articles);
      }
})

// функционал открытия/закрытия меню в мобильной версии
document.querySelector('.header__menu-mobile-img').addEventListener('click', function() {
  event.preventDefault();
  document.querySelector('.body-mobile').classList.remove('display-none')
});
document.querySelector('#exit').addEventListener('click', function() {
  event.preventDefault();
  document.querySelector('.body-mobile').classList.add('display-none')
});