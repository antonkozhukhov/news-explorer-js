import {date} from '../functions/functionSave'
export class Api {
  constructor(options) {
    this.baseUrl = options['baseUrl'];
    this.headers = options['headers'];
  }
signup(name, email, password){
    return fetch(`${this.baseUrl}/signup`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
        name: name,
        email: email,
        password: password
      })
    })
    .then(res => {
       if (res.ok) {
       return res.json();
      }
      return Promise.reject(`Ошибка: ${res.message}`);
    })
        .catch((err) => {
      console.log(err);
    });
}
signin(email, password){
  return fetch(`${this.baseUrl}/signin`, {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
      email: email,
      password: password
    })
  })
  .then(res => {
    if (res.ok) {
     return res.json();
    }
    return Promise.reject(`Ошибка1: ${res.status}`);
  })
      .catch((err) => {
    console.log(err);
  });
}
getArticles(){
  return fetch(`${this.baseUrl}/articles`, {
  method: 'GET',
  headers: {

    authorization: `Bearer ${localStorage.getItem('token')}`
},
  })
  .then(res => {
    if (res.ok) {
     return res.json();
    }
    return Promise.reject(`Ошибка2: ${res.status}`);
  })
      .catch((err) => {
    console.log(err);
  });
}
 getMyArticles(){
  return fetch(`${this.baseUrl}/articles/me`, {
  method: 'GET',
  headers: {
    'Content-Type': 'application/json',
    authorization: `Bearer ${localStorage.getItem('token')}`
},
  })
  .then(res => {
    if (res.ok) {
     return res.json();
    }
    return Promise.reject(`Ошибка2: ${res.status}`);
  })
      .catch((err) => {
    console.log(err);
  });
}
postArticle(keyword, article){
  return fetch(`${this.baseUrl}/articles`, {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
     authorization: `Bearer ${localStorage.getItem('token')}`
},
body: JSON.stringify({
    keyword: keyword,
    title: article.title,
    text: article.description,
    date: date(article.publishedAt),
    source: article.source.name,
    link: article.url,
    image: article.urlToImage,
    })
  })
  .then(res => {
    if (res.ok) {
    return res.json();
    }
    return Promise.reject(`Ошибка2: ${res.status}`);
  })
    .catch((err) => {
    console.log(err);
  });
}
deleteArticle(id){
  return fetch(`${this.baseUrl}/${id}`, {
  method: 'DELETE',
  headers: {
    'Content-Type': 'application/json',
       authorization: `Bearer ${localStorage.getItem('token')}`
},
  })
  .then(res => {
    if (res.ok) {
    return res.json();
    }
    return Promise.reject(`Ошибка2: ${res.status}`);
  })
      .catch((err) => {
    console.log(err);
  });
}
getMe(){
  return fetch(`${this.baseUrl}/users/me`, {
  method: 'GET',
  headers: {
    'Content-Type': 'application/json',
     authorization: `Bearer ${localStorage.getItem('token')}`
},  })
  .then(res => {
    if (res.ok) {
    return res.json();
    }
    return Promise.reject(`Ошибка2: ${res.status}`);
  })
      .catch((err) => {
    console.log(err);
  });
}
}