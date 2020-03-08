import{islogged, isNotlogged } from '../functions/functions';
import { badToken, emptyString } from '../variables/variables'
import { registrationPopup,enterPopup, registrationValidate, enterValidate, serverApi } from '../script'

export function logOut(){
  event.preventDefault();
  document.querySelector('.body-mobile').classList.add('display-none')
  localStorage.setItem('token', badToken);
  serverApi.getMe()
    .then(()=>{
      islogged()
    })
    .catch(err => {
    isNotlogged();
    console.log(err);
     })

};
export function registrationOpen() {
  event.preventDefault();
  document.querySelector('.body-mobile').classList.add('display-none')
  registrationPopup.open();
  registrationValidate.buttonIsNotValid();
};

export function validationOfRegistration(){
  registrationValidate.handleValidate(event);
}
export function validationEmailOfRegistration(){
  document.querySelector('#user-is').textContent = emptyString;
  registrationValidate.handleValidate(event);
}

export function validationOfEnter(){
  document.querySelector('#error-email-or-password').textContent = emptyString;
  enterValidate.handleValidate(event);
}
export function enterOpenFromRegistration() {
  event.preventDefault();
  registrationPopup.close();
  enterPopup.open();
  enterValidate.buttonIsNotValid();
}
export function registrationOpenFromEnter() {
  event.preventDefault();
  enterPopup.close();
  registrationPopup.open();
  registrationValidate.buttonIsNotValid();
}


