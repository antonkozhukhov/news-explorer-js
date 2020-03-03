import {menuAuth, api } from '../script';
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
  api.getMe().then(res=>{document.querySelector('.header__name').textContent = `${res.name}`});
  api.getMe().then(res=>{document.querySelector('.header__name_mobile').textContent = `${res.name}`});
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
}