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

// https://medium.freecodecamp.org/introduction-to-mongoose-for-mongodb-d2a7aa593c57
// https://mongoosejs.com/docs/index.html
// https://mongoosejs.com/docs/populate.html
