const articleContainer = document.querySelector('.table');
const menuName = document.querySelector('.header__name');
import { count, keyWordsShow, numberOfArticles } from './functions/functionSave';
import { ArticleList } from './classes/articleListSaved';
import { Api } from './fetchs/api';
import {mainPage, badToken, baseUrl} from './variables/variables'

export const api = new Api({
      baseUrl: baseUrl,
      headers: {
        'Content-Type': 'application/json'
      }
      });

// выход и автоматический переход на главную страницу
document.querySelector('.header__name-image').addEventListener('click',function(){
   event.preventDefault();
   localStorage.setItem('token', badToken);
   window.location.href = mainPage;
});
document.querySelector('.header__name-icon_mobile').addEventListener('click',function(){
  event.preventDefault();
  localStorage.setItem('token', badToken);
  window.location.href = mainPage;

})
// проверяем аутентификацию - находим имя, если нет то - автоматический переход на главную страницу
api.getMe()
.then(res=>{
  if(res){
    menuName.textContent = `${res.name}`
    document.querySelector('.header__name_mobile').textContent = `${res.name}`
    document.querySelector('.search-menu__tittle_saved').textContent = `${res.name}`+' у вас'}
    else window.location.href = mainPage;
})
// количество наших статей
api.getMyArticles()
.then(res=>{
  document.querySelector('.search-menu__tittle_saved').textContent = document.querySelector('.search-menu__tittle_saved').textContent+' '+numberOfArticles(res.length);
})
/* рисуем наши статьи, перед этим сортируем по ключевым словам функцией count - считает кол-во статей с заданным
 кючевым словом. Далее получаем массив из ключевых слов и выкидываем повторяющиеся - считаем кол-во уникальных
 ключ. слов и находим первые. Лучше, конечно, это рассписать подробнее, но пока так)*/
api.getMyArticles()
.then(res=>{
 let articleList = new ArticleList(articleContainer, res.sort(function(a,b){return count(b,res)-count(a,res);
  }))
return Array.from(new Set(res.sort(function(a,b){return count(b,res)-count(a,res);}).map(function(item){return item.keyword;})))})
.then( res=>{keyWordsShow(res) })

// открытие/закрытие меню в мобильной версии
document.querySelector('.header__menu-mobile-img').addEventListener('click', function() {
  event.preventDefault();
  document.querySelector('.body-mobile').classList.remove('display-none')
});
document.querySelector('#exit').addEventListener('click', function() {
  event.preventDefault();
  document.querySelector('.body-mobile').classList.add('display-none')
});
