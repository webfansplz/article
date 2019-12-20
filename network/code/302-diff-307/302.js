const Koa = require('koa');
const Router = require('koa-router');
const cors = require('koa-cors');
const app = new Koa();
const Routers = new Router();

Routers.post('/http/302', ctx => {
  ctx.redirect('/hello');
});
Routers.get('/hello', ctx => {
  ctx.body = 'hello,Http/302';
});

app.use(cors());
app.use(Routers.routes());

app.listen(3302);

console.log(`Server listen on 3302`);
