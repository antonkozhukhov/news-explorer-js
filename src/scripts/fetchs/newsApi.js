export class NewsApi {
  constructor() {
   }
getNews(url){

  let now = new Date();
  let sevenDayBefore = new Date(now.getFullYear(), now.getMonth(), now.getDate()-7);
  // преобразуем в шаблон "2020-02-15"
  let nowMoment = `${now.getFullYear()}`+'-'+`${(now.getMonth()+1).toString().padStart(2,0)}`+'-'+`${now.getDate()}`
  let sevenDaysBefore =`${sevenDayBefore.getFullYear()}`+'-'+`${(sevenDayBefore.getMonth()+1).toString().padStart(2,0)}`+'-'+`${sevenDayBefore.getDate()}`;
  return fetch('https://newsapi.org/v2/everything?' +
  `q=${url}&` +
  `from=${sevenDaysBefore}&` +
  `to=${nowMoment}&`+
  'sortBy=popularity&' +
  'language=ru&' +
   'pageSize=100&'+'apiKey=3811c0c95b1241fc8a93d4e6bd879b2d',{
  method: 'GET',
  })
  .then(res => {
    if (res.ok) {
     return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`);
  })
   .catch((err) => {
    console.log(err);
  });
}
}