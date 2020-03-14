export const articleContainer = document.querySelector('.table');
export const registrationButton = document.querySelector('.registration-button');
export const enterButton = document.querySelector('.enter-button');
export const showmoreButton = document.querySelector('.show-more');
export const results = document.querySelector('.results');
export const finding = document.querySelector('.finding');
export const nothingNotFound = document.querySelector('.nothing-not-found')
const registrationOkForm = document.forms.registrationOk;
const registrationForm = document.forms.registration;
export const registrationName = registrationForm.elements.name;
export const registrationEmail = registrationForm.elements.email;
export const registrationPassword = registrationForm.elements.password;
export const menuName = document.querySelector('.header__name');
export const menuAuth = document.querySelector('.header__auth');
const enterForm = document.forms.enter;
export const enterEmail = enterForm.elements.enteremail;
export const enterPassword = enterForm.elements.enterpassword;
const searchForm = document.forms.search;
export const searchName = searchForm.elements.name;
export const formEnter = document.querySelector('.form__enter');
export const formRegistration = document.querySelector('.form__registration');
export const formRegistrationOk = document.querySelector('.form__registration-ok');

import {ServerApi} from './fetchs/ServerApi';
import {ValidateRegistration, ValidateEnter} from './classes/validation';
import {Popup} from './classes/popup';
import {islogged, isNotlogged } from './functions/functions';
import { baseUrl } from './variables/variables';
import {logOut, registrationOpen, validationOfRegistration,
   validationEmailOfRegistration, validationOfEnter, enterOpenFromRegistration,
   registrationOpenFromEnter } from './callbacks/callbackMain';
import {registration, enter, registrationOkFromRegistration}  from './callbacks/enterAndRegistration';
import {search, showMore} from './callbacks/search';
import {mobileMenuOpen, mobileMenuClose} from './functions/mobileMenu';
export const enterPopup = new Popup(formEnter);
export const registrationPopup = new Popup(formRegistration);
export const registrationOkPopup = new Popup (formRegistrationOk);
export const registrationValidate = new ValidateRegistration(registrationButton, formRegistration);
export const enterValidate = new ValidateEnter(enterButton, formEnter);

export const serverApi = new ServerApi({
  baseUrl: baseUrl,
  headers: {
    'Content-Type': 'application/json'
  }
  });

serverApi.getMe()
    .then(()=>{
      islogged()
    })
    .catch(err => {
    isNotlogged();
    console.log(err);
     })
// выход
document.querySelector('.header__name-image').addEventListener('click',logOut);
// авторизироваться
document.querySelector('.header__auth').addEventListener('click', registrationOpen);
// выход в мобильной версии
document.querySelector('.header__name-icon_mobile').addEventListener('click',logOut)
// авторизоваться в мобильной версии
document.querySelector('.header__auth_mobile').addEventListener('click', registrationOpen);

// валидация инпутов
registrationName.addEventListener('input', validationOfRegistration);
registrationEmail.addEventListener('input', validationEmailOfRegistration);
registrationPassword.addEventListener('input', validationOfRegistration);
enterEmail.addEventListener('input', validationOfEnter);
enterPassword.addEventListener('input', validationOfEnter);
// переход между попапами
document.querySelector('.or-registration__link_enter').addEventListener('click', enterOpenFromRegistration);
document.querySelector('.or-registration__link_registration').addEventListener('click', registrationOpenFromEnter);

// регистрация пользователя
registrationForm.addEventListener('submit', registration)
// Аутентификация
enterForm.addEventListener('submit', enter)
// попап при успешной регистрации
registrationOkForm.addEventListener('submit', registrationOkFromRegistration)

// поиск по ключевому слову
searchForm.addEventListener('submit', search)

  // кнопка "показать ещё"
showmoreButton.addEventListener('click', showMore)

// функционал открытия/закрытия меню в мобильной версии

document.querySelector('.header__menu-mobile-img').addEventListener('click', mobileMenuClose);
document.querySelector('#exit').addEventListener('click',mobileMenuOpen);