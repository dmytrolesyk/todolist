const Router = require('koa-router');
const router = new Router();

router.get('/tasks', async ctx => {
    ctx.body = tasks;
});

router.get('/tasks/:id', async ctx => {
    let taskItem;
    const id = parseInt(ctx.params.id);
    tasks.forEach(item => {
        if(item.id === id) {
            taskItem = item;
        }
    });
    ctx.body = taskItem;
});

router.post('/tasks', async ctx => {
    const newItem = ctx.request.body;
    tasks.push(newItem);
    ctx.body = newItem;
});

router.delete('/tasks/:id', async ctx => {
    let index;
    const id = parseInt(ctx.params.id);
    tasks.forEach((taskItem, ind) => {
        if(taskItem.id === id) {
            index = ind;
        }
    });

    const deletedItem = tasks.splice(index, 1);
    ctx.body = deletedItem;
});

router.put('/tasks/', async ctx => {
    const updatedItem = ctx.request.body;
    tasks.forEach((item, index) => {
        if(item.id === updatedItem.id) {
            tasks[index] = updatedItem;
        }
    });
    ctx.body = updatedItem;
})



module.exports = router;