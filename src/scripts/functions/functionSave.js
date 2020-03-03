// преобразуем 2020-02-15 в 15 февраля 2020
export function date(str){
  function month(n){
  switch (n) {
    case 1:  return 'января';
    case 2:  return 'февраля';
    case 3:  return 'марта';
    case 4:  return 'апреля';
    case 5:  return 'мая';
    case 6:  return 'июня';
    case 7:  return 'июля';
    case 8:  return 'августа';
    case 9:  return 'сентября';
    case 10: return 'октября';
    case 11: return 'ноября';
    case 12: return 'декабря';
    default: alert( "Нет таких значений" );
    }
  }
return(String(Number(str.substr(8,2))) + ' '+ month(Number(str.substr(5,2)))+', ' + str.substr(0,4));
}
// преобразуем 1 в "1 статья" и так далее
export function numberOfArticles(numb){
if (numb<5 || numb>20){
switch(numb%10){
  case 1:    return `${numb}`+' сохраненная статья';
  case 2:    return `${numb}`+' сохраненных статьи';
  case 3:    return `${numb}`+' сохраненных статьи';
  case 4:    return `${numb}`+' сохраненных статьи';
  default:   return `${numb}`+' сохраненных статей';
}
}
else return `${numb}`+' сохраненных статей'
}

// вставляем текст в зависимости от количества ключевых слов.
export function keyWordsShow(keywords){
if (keywords.length > 3){
  document.querySelector('#first-bold').textContent = `${keywords[0]}`+', '+`${keywords[1]}`;
  document.querySelector('#second-bold').textContent = `${keywords.length-2}`+' другим';
  document.querySelector('#and').textContent = ' и';
}
if (keywords.length == 3){
  document.querySelector('#first-bold').textContent = `${keywords[0]}`+', '+`${keywords[1]}`;
  document.querySelector('#second-bold').textContent = `${keywords[2]}`;
  document.querySelector('#and').textContent = ' и ';
}
if (keywords.length == 2){
  document.querySelector('#first-bold').textContent = `${keywords[0]}`;
  document.querySelector('#second-bold').textContent = `${keywords[1]}`;
  document.querySelector('#and').textContent = ' и ';
}
if (keywords.length == 1){
  document.querySelector('#first-bold').textContent = `${keywords[0]}`;
  document.querySelector('#second-bold').textContent = ``;
  document.querySelector('#and').textContent = '';
}
if (keywords.length == 0){
  document.querySelector('#first-bold').textContent = 'Ваш список пуст';
  document.querySelector('#second-bold').textContent = ``;
  document.querySelector('#and').textContent = '';
}
}

export function count(item, massive){
let numbItem = 0;
for (let i=0; i<massive.length; i++){
  if(massive[i].keyword == item.keyword){ numbItem = numbItem+1;}
  else(numbItem = numbItem)
}
return numbItem;
}