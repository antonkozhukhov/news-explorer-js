import {emailTemplate, nameTemplate, emptyString, emailWrongForm, nameWrongForm, lengthError} from '../variables/variables'

export class Validate{
  constructor(button, popuptype){
    this.button = button;
    this.popuptype = popuptype;
  }
  buttonIsValid(){
    this.button.removeAttribute('disabled');
    this.button.classList.add('button__isvalid');
  }
  buttonIsNotValid(){
    this.button.setAttribute('disabled', true);
    this.button.classList.remove('button__isvalid');
  }


  handleValidate(event){
// выводим текст ошибок при валидации
    this.buttonValidate();
      if (event.target.value.length === 0){
        this.popuptype.querySelector(`#error-${event.target.name}`).classList.remove('display-none');
        return false
      }
      if (event.target.value.length < 2 || event.target.value.length > 30){
        this.popuptype.querySelector(`#error-${event.target.name}`).textContent = lengthError;
        return false
      }
      if ((event.target.name == 'enteremail'|| event.target.name == 'email')&&(!emailTemplate.test(event.target.value))){
          this.popuptype.querySelector(`#error-${event.target.name}`).textContent = emailWrongForm;
          return false}
      if (event.target.name == 'name' && !nameTemplate.test(event.target.value)){
            this.popuptype.querySelector(`#error-${event.target.name}`).textContent = nameWrongForm;
            return false}

      else {

        this.popuptype.querySelector(`#error-${event.target.name}`).textContent = emptyString;
         return true;
      }
  }
}
// валидируем поля входа
export class ValidateEnter extends Validate{

  buttonValidate(){
    const form = document.forms.enter;
    const email = form.elements.enteremail;
    const password = form.elements.enterpassword;
    if (email.value.length > 1 && email.value.length < 30 && password.value.length > 1 && password.value.length < 30 && emailTemplate.test(email.value) ){
      this.buttonIsValid();
      return true;
    }
    else {
    this.buttonIsNotValid();
    return false;
    }
  }
}
// валидируем поля регистрации
export class ValidateRegistration extends Validate{
  buttonValidate(){
    const form = document.forms.registration;
    const name = form.elements.name;
    const email = form.elements.email;
    const password = form.elements.password;
     if (name.value.length > 1 && name.value.length < 30 && email.value.length > 1 && email.value.length < 30 && password.value.length > 1 && password.value.length < 30 && emailTemplate.test(email.value) &&nameTemplate.test(name.value)){
    this.buttonIsValid();
    return true;
    }
    else {
      this.buttonIsNotValid();
      return false;
    }
  }
}