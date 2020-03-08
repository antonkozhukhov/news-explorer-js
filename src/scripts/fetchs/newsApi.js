import {numberOfDays} from '../variables/variables'
export class NewsApi {
  constructor() {
   }
getNews(url){
  const now = new Date();
  const sevenDayBefore = new Date(now.getFullYear(), now.getMonth(), now.getDate()-numberOfDays);
  // преобразуем в шаблон "2020-02-15"
  const nowMoment = `${now.getFullYear()}`+'-'+`${(now.getMonth()+1).toString().padStart(2,0)}`+'-'+`${now.getDate()}`
  const sevenDaysBefore =`${sevenDayBefore.getFullYear()}`+'-'+`${(sevenDayBefore.getMonth()+1).toString().padStart(2,0)}`+'-'+`${sevenDayBefore.getDate()}`;
  return fetch('https://newsapi.org/v2/everything?' +
  `q=${url}&` +
  `from=${sevenDaysBefore}&` +
  `to=${nowMoment}&`+
  'sortBy=popularity&' +
  'language=ru&' +
   'pageSize=100&'+'apiKey=3811c0c95b1241fc8a93d4e6bd879b2d',{
  method: 'GET',
  })
  .then((res) => {
    return res.json()
        .then((body) => {
           return res.ok ?
                Promise.resolve(body) :
                Promise.reject(body)
        });
  });
}
}