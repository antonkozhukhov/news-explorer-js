import { serverApi, registrationPopup, enterPopup, registrationOkPopup,registrationValidate, enterValidate,
  enterEmail, enterPassword, registrationName, registrationEmail, registrationPassword,   } from '../script';
  import { islogged, formDisabled, formAbled } from '../functions/functions'
  import {emptyString } from '../variables/variables'
const popupRegistration = document.querySelector('.form__registration');
const popupEnter = document.querySelector('.form__enter');
  export function registration(event){
  event.preventDefault();
  formDisabled(popupRegistration)
  serverApi.signup(registrationName.value, registrationEmail.value, registrationPassword.value)
  .then(()=>{
     formAbled(popupRegistration)
      registrationPopup.close();
      registrationOkPopup.open();
      registrationValidate.buttonIsNotValid();
      document.querySelector('#user-is').textContent = emptyString;

  })

  .catch(err => {
    formAbled(popupRegistration)
    document.querySelector('#user-is').textContent = err.message;
    console.log(err)
  })
}
export function enter(){
    event.preventDefault();
    formDisabled(popupEnter)
  serverApi.signin( enterEmail.value, enterPassword.value).then((res)=>{
    formAbled(popupEnter);
    localStorage.setItem('token', res.token);
       islogged();
       enterPopup.close();
           })
       .catch(err => {
        formAbled(popupEnter);
        document.querySelector('#error-email-or-password').textContent = err.message;
        console.log(err)})



}
export function registrationOkFromRegistration(){
  event.preventDefault();
  registrationOkPopup.close();
  enterPopup.open();
  enterValidate.buttonIsNotValid();

}