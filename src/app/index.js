
const Koa = require('koa');
const userRouter = require('../router/user');

const app = new Koa();
app.use(userRouter.routes());
module.exports = app;
