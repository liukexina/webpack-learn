/*
  服务器代码
  启动服务器命令：
   npm i nodemon -g
   nodemon server.js

   node server.js
 */
const Koa = require('koa');
const path = require('path');
const staticFiles = require('koa-static');

const app = new Koa();

app.use(staticFiles(path.join(__dirname, 'build'), {maxAge: 1000 * 3600}));

app.listen(3000);
