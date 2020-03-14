import {date} from '../functions/functionSave'
export class ServerApi {
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

.then((res) => {
  return res.json()
      .then((body) => {
        return res.ok ?
              Promise.resolve(body) :
              Promise.reject(body)
      });
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
  .then((res) => {
    return res.json()
        .then((body) => {
          return res.ok ?
                Promise.resolve(body) :
                Promise.reject(body)
        });
  });


}
getArticles(){
  return fetch(`${this.baseUrl}/articles`, {
  method: 'GET',
  headers: {

    authorization: `Bearer ${localStorage.getItem('token')}`
},
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
 getMyArticles(){
  return fetch(`${this.baseUrl}/articles/me`, {
  method: 'GET',
  headers: {
    'Content-Type': 'application/json',
    authorization: `Bearer ${localStorage.getItem('token')}`
},
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
  .then((res) => {
    return res.json()
        .then((body) => {
          return res.ok ?
                Promise.resolve(body) :
                Promise.reject(body)
        });
  });


}
deleteArticle(id){
  return fetch(`${this.baseUrl}/articles/${id}`, {
  method: 'DELETE',
  headers: {
    'Content-Type': 'application/json',
       authorization: `Bearer ${localStorage.getItem('token')}`
},
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
getMe(){
  return fetch(`${this.baseUrl}/users/me`, {
  method: 'GET',
  headers: {
    'Content-Type': 'application/json',
     authorization: `Bearer ${localStorage.getItem('token')}`
},  })
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