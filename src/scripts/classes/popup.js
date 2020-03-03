import {formEnter, formRegistration, formRegistrationOk} from '../script';
import {errorReset} from '../functions/functions';

export class Popup{
  constructor(popupElement){
    this.popupElement = popupElement;
    this.popupElement.querySelector('.form__close').addEventListener('click',this.close);
    // нажали вне попапа - закрылся
    this.popupElement.parentElement.addEventListener('click',function(){
      if (event.target.classList.value == 'popup-forms'){
        document.querySelector('.popup-forms').classList.add('display-none' );
        event.target.querySelector('.form').classList.add('display-none' );
       }
        else return false;
      })
      // нажали esc
      window.onkeydown = function( event ) {
        if ( event.keyCode == 27 ) {
          console.log(document.querySelectorAll('.form')[1])
          document.querySelector('.popup-forms').classList.add('display-none' );
          for(let i=0; i<document.querySelectorAll('.form').length; i++){
            document.querySelectorAll('.form')[i].classList.add('display-none' );
          }
        }
    };


  }
  open(){
    document.querySelector('.popup-forms').classList.remove('display-none' );
    this.popupElement.classList.remove('display-none');
    this.popupElement.reset();
    errorReset();

  }
  close(){
    formEnter.classList.add('display-none');
    formRegistration.classList.add('display-none');
    formRegistrationOk.classList.add('display-none');
    document.querySelector('.popup-forms').classList.add('display-none' );
    this.popupElement.reset();
    errorReset();
  }
}