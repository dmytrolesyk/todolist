const Koa = require('koa')
const mongoose = require('mongoose')
const koaBody = require('koa-body')
const cors = require('koa2-cors')
const router = require('./modules/router.js')

const app = new Koa()

mongoose.connect('mongodb://dmytro:database123@ds119160.mlab.com:19160/todolist',
  {
    useNewUrlParser: true,
    useFindAndModify: false,
    useCreateIndex: true,
  })

app
  .use(cors())
  .use(koaBody())
  .use(router.routes())
  .use(router.allowedMethods())

app.listen(3000)
