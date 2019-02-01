const Koa = require('koa')
const mongoose = require('mongoose')
const koaBody = require('koa-body')
const cors = require('koa2-cors')
const router = require('./router.js')

const app = new Koa()

mongoose.connect('mongodb://127.0.0.1:27017/todo')

app
  .use(cors())
  .use(koaBody())
  .use(router.routes())
  .use(router.allowedMethods())

app.listen(3000)
