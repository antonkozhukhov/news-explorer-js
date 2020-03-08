export function mobileMenuClose(){
 event.preventDefault();
  document.querySelector('.body-mobile').classList.remove('display-none')
};
export function mobileMenuOpen(){
 event.preventDefault();
  document.querySelector('.body-mobile').classList.add('display-none')
};
