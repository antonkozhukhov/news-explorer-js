## news-explorer-frontend
### https://www.news-explorer.fun/
### http://www.news-explorer.fun/
### http://news-explorer.fun/
### https://news-explorer.fun/
### ссылка на api http://api.news-explorer.fun
### Предварительный frontend для сервиса NewsExplorer.
#### Сервис News-explorer.fun осуществляет поиск актуальных новостей по заданному ключевому слову, пользователь вводит в поиске слово или фразу, отправляется запрос на https://newsapi.org/. Затем найденные статьи публикуются на главной странице https://www.news-explorer.fun/ (http://www.news-explorer.fun/, http://news-explorer.fun/, https://news-explorer.fun/). Пользователь может создать свою учетную запись и сохранять во вкладке "Сохраненные статьи" понравившиеся ему статьи. 
#### Вторая страница https://www.news-explorer.fun/secondary/ отображает все понравившиеся статьи пользователя.
#### Проект создан для демонстрации имеющихся у автора возможностей вебразработки. Предварительно автором был написан api https://www.api.news-explorer.fun/, на который обращается проект при авторизации и сохранении статей. 
#### Данный раздел относится к написанию Javascript-кода . 
#### Отображение сайта на разных разрешениях оптимизировано.
#### При реализации проекта используются HTML5, CSS3, javascript, БЭМ. Сборка проекта осуществляется Webpack(4.41.5), плагины и версии Node:
 ####   "@babel/cli": "7.7.7",
 ####   "@babel/core": "7.7.7",
 ####   "@babel/preset-env": "7.7.7",
 ####   "autoprefixer": "9.7.3",
 ####   "babel-loader": "8.0.6",
 ####   "css-loader": "3.4.1",
 ####   "cssnano": "4.1.10",
 ####   "file-loader": "5.0.2",
 ####   "gh-pages": "2.0.1",
 ####   "html-webpack-plugin": "3.2.0",
 ####   "mini-css-extract-plugin": "0.9.0",
 ####   "postcss-loader": "3.0.0",
 ####   "webpack": "4.41.5",
 ####   "webpack-cli": "3.3.10",
 ####   "webpack-dev-server": "3.10.1",
 ####   "webpack-md5-hash": "0.0.6"
 ####   "babel-polyfill": "6.26.0",
 ####   "core-js": "3.4.1",
 ####   "cors": "2.8.5",
 ####   "image-webpack-loader": "6.0.0",
 ####   "optimize-css-assets-webpack-plugin": "5.0.3"
 #### Для корректной сборки сайта необходимо установить эти Node зависимости. Вся информация по установке на сайтах https://nodejs.org/ru/, https://www.npmjs.com/.
