const Koa = require('koa');
const koaBody = require('koa-body');
const router = require('./router.js');
cors = require('koa2-cors');

const app = new Koa();

app
    .use(cors())
    .use(koaBody())
    .use(router.routes())
    .use(router.allowedMethods());


app.listen(3000, console.log('http://localhost:3000'));