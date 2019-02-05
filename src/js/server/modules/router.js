const Router = require('koa-router')

const secureRoutes = require('./secure/secure.js')
const publicRoutes = require('./public/public.js')


const router = new Router()

router.use(publicRoutes.routes(), secureRoutes.routes())

module.exports = router
