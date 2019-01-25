const Koa = require('koa');
const KoaRouter = require('koa-router');
const bodyParser = require('koa-bodyparser');

const app = new Koa();
const router = new KoaRouter();

const data = [{id: 1, name: 'John Doe'}, {id: 2, name: 'Jessica'}];


app.use(bodyParser());
app.use(router.routes()).use(router.allowedMethods());

router.get('/', getDataFromServer);
router.post('/', putDataToServer);


async function getDataFromServer(ctx) {
    ctx.response.body = JSON.stringify(data);
}

async function putDataToServer(ctx) {
    data = ctx.request.body;
}



app.listen(3002, () => console.log('Server started...'));