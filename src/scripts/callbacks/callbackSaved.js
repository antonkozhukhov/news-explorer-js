import {badToken, mainPage} from '../variables/variables';
import {serverApi } from '../secondary';
export function logOutFromSaved(){
  event.preventDefault();
  localStorage.setItem('token', badToken);
  serverApi.getMe()
.then(res=>{
  if(res){
    menuName.textContent = `${res.name}`
    document.querySelector('.header__name_mobile').textContent = `${res.name}`
    document.querySelector('.search-menu__tittle_saved').textContent = `${res.name}`+' у вас'}
    else window.location.href = mainPage;
})
.catch(err => {
  window.location.href = mainPage;
  console.log(err);
 })
};