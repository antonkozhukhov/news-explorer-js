import {errorReset} from '../functions/functions';
const popupContainer = document.querySelector('.popup-forms')
export class Popup{
  constructor(popupElement){
    this.popupElement = popupElement;
    this.popupElement.querySelector('.form__close').addEventListener('click', this._close);
    // нажали вне попапа - закрылся
    this.popupElement.parentElement.addEventListener('click',this._closeOutOfPopup);
      // нажали esc
     window.onkeydown = function( event ) {
        if ( event.keyCode == 27 ) {
          popupContainer.classList.add('display-none' );
          document.querySelectorAll('.form').forEach(form=>form.classList.add('display-none'))
        }
    };
  }
  _close(){
    event.target.parentElement.classList.add('display-none' );
    popupContainer.classList.add('display-none' );
    errorReset();
  }
  _closeOutOfPopup(){
    if (event.target.classList.value == 'popup-forms'){
      popupContainer.classList.add('display-none' );
      event.target.querySelector('.form').classList.add('display-none' );
     }
      else return false;
    }

  open(){
    popupContainer.classList.remove('display-none' );
    this.popupElement.classList.remove('display-none');
    this.popupElement.reset();
    errorReset();

  }

  close(){
    this.popupElement.classList.add('display-none' );
    popupContainer.classList.add('display-none' );
    errorReset();
  }
}