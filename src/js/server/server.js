const Koa = require('koa')
const koaBody = require('koa-body')
const cors = require('koa2-cors')
const router = require('./router.js')

const app = new Koa()

app
  .use(cors())
  .use(koaBody())
  .use(router.routes())
  .use(router.allowedMethods())


app.listen(3000)
