import {menuAuth, serverApi} from '../script';
import {emptyString} from '../variables/variables'

export let islogin = false
export function islogged(){
  menuAuth.classList.add('display-none');
  document.querySelector('.header__auth_mobile').classList.add('display-none');
  document.querySelector('.header__name-menu').classList.remove('display-none');
  document.querySelector('.header__saved-articles').classList.remove('display-none');
  document.querySelector('.header__saved-articles_mobile').classList.remove('display-none');
  document.querySelector('.header__name-menu_mobile').classList.remove('display-none');
  document.querySelector('.header__saved-articles_mobile').classList.remove('display-none');
  islogin = true;
  serverApi.getMe()
  .then(res=>{document.querySelector('.header__name').textContent = `${res.name}`})
  .catch(err => {
    console.log(err);
   })
  serverApi.getMe()
  .then(res=>{document.querySelector('.header__name_mobile').textContent = `${res.name}`})
  .catch(err => {
    console.log(err);
   })
}
export function isNotlogged(){
  menuAuth.classList.remove('display-none');
  document.querySelector('.header__auth_mobile').classList.remove('display-none');
  document.querySelector('.header__name-menu').classList.add('display-none');
  document.querySelector('.header__saved-articles').classList.add('display-none');
  document.querySelector('.header__saved-articles_mobile').classList.add('display-none');
  document.querySelector('.header__name-menu_mobile').classList.add('display-none');
  document.querySelector('.header__saved-articles_mobile').classList.add('display-none');
  islogin = false;
}

export function errorReset(){
  document.querySelector('#error-enteremail').textContent = emptyString;
  document.querySelector('#error-enterpassword').textContent = emptyString;
  document.querySelector('#error-email').textContent = emptyString;
  document.querySelector('#error-password').textContent = emptyString;
  document.querySelector('#error-email-or-password').textContent = emptyString;
  document.querySelector('#error-name').textContent = emptyString;
  document.querySelector('#user-is').textContent = emptyString;
  document.querySelector('.search-menu__error').textContent = emptyString;

}
export function formDisabled(popup){
  popup.querySelectorAll('input').forEach(form=>form.setAttribute('disabled', true));
  popup.querySelectorAll('button').forEach(form=>form.setAttribute('disabled', true));
}
export function formAbled(popup){
  popup.querySelectorAll('input').forEach(form=>form.removeAttribute('disabled'));
  popup.querySelectorAll('button').forEach(form=>form.removeAttribute('disabled'));
}