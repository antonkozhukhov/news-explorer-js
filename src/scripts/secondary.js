const articleContainer = document.querySelector('.table');
const menuName = document.querySelector('.header__name');
import { countOfArticlessWithOneKeyword, keyWordsShow, numberOfArticles } from './functions/functionSave';
import { ArticleList } from './classes/articleListSaved';
import { ServerApi } from './fetchs/ServerApi';
import {mainPage, baseUrl} from './variables/variables';
import {logOutFromSaved} from './callbacks/callbackSaved';
import {mobileMenuOpen, mobileMenuClose} from './functions/mobileMenu';
export const serverApi = new ServerApi({
      baseUrl: baseUrl,
      headers: {
        'Content-Type': 'application/json'
      }
      });

// выход и автоматический переход на главную страницу
document.querySelector('.header__name-image').addEventListener('click',logOutFromSaved);
document.querySelector('.header__name-icon_mobile').addEventListener('click',logOutFromSaved);
// проверяем аутентификацию - находим имя, если нет то - автоматический переход на главную страницу
serverApi.getMe()
.then(res=>{
  if(res){
    menuName.textContent = `${res.name}`
    document.querySelector('.header__name_mobile').textContent = `${res.name}`
    document.querySelector('.search-menu__tittle_saved').textContent = `${res.name}`+' у вас'}
    else window.location.href = mainPage;
})
.catch(err => {
  window.location.href = mainPage;
  console.log(err);
 })
// количество наших статей
serverApi.getMyArticles()
.then(res=>{
  document.querySelector('.search-menu__tittle_saved').textContent = document.querySelector('.search-menu__tittle_saved').textContent+' '+numberOfArticles(res.length);
})
.catch(err => {
  console.log(err);
 })
/* рисуем наши статьи, перед этим сортируем по ключевым словам функцией count - считает кол-во статей с заданным
 кючевым словом. Далее получаем массив из ключевых слов и выкидываем повторяющиеся - считаем кол-во уникальных
 ключ. слов и находим первые. Лучше, конечно, это рассписать подробнее, но пока так)*/
 serverApi.getMyArticles()
.then(res=>{
 let articleList = new ArticleList(articleContainer, res.sort(function(a,b){return countOfArticlessWithOneKeyword(b,res)-countOfArticlessWithOneKeyword(a,res);
  }))
return Array.from(new Set(res.sort(function(a,b){return countOfArticlessWithOneKeyword(b,res)-countOfArticlessWithOneKeyword(a,res);}).map(function(item){return item.keyword;})))})
.then( res=>{keyWordsShow(res) })
.catch(err => {
  console.log(err);
 })

// открытие/закрытие меню в мобильной версии
document.querySelector('.header__menu-mobile-img').addEventListener('click', mobileMenuClose);
document.querySelector('#exit').addEventListener('click',mobileMenuOpen);
