function mobileMenuClose(){
 event.preventDefault();
  document.querySelector('.body-mobile').classList.remove('display-none')
};
function mobileMenuOpen(){
 event.preventDefault();
  document.querySelector('.body-mobile').classList.add('display-none')
};

export function mobileMenu(){
  document.querySelector('.header__menu-mobile-img').addEventListener('click', mobileMenuClose);
  document.querySelector('#exit').addEventListener('click',mobileMenuOpen);
}