const Koa = require('koa');
const Router = require('koa-router');
const cors = require('koa-cors');
const app = new Koa();
const Routers = new Router();

Routers.post('/http/307', ctx => {
  ctx.status = 307;
  ctx.redirect('/hello');
});
Routers.post('/hello', ctx => {
  ctx.body = 'hello,http/307';
});

app.use(cors());
app.use(Routers.routes());

app.listen(3307);

console.log(`Server listen on 3307`);
