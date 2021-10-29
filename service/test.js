// const Koa = require("koa");
// const Router = require("koa-router");

// const app = new Koa();
// const router = new Router();

// // 处理不同的 HTTP 方法
// router
//   .get("/users", ctx => {
//     ctx.body = "获取用户列表";
//   })
//   .post("/users", ctx => {
//     ctx.body = "创建用户";
//   })
//   .put("/users/:id", ctx => {
//     // 解析 URL 参数
//     ctx.body = `更新 ID 为 ${ctx.params.id} 的用户`;
//   })
//   .delete("/users/:id", ctx => {
//     // 解析 URL 参数
//     ctx.body = `删除 ID 为 ${ctx.params.id} 的用户`;
//   });

// // 注册路由中间件
// app.use(router.routes());

// app.listen(3000);


// sign with default (HMAC SHA256)
var jwt = require('jsonwebtoken');
var token = jwt.sign({ foo: 'bar' }, 'shhhhh');
//backdate a jwt 30 seconds
var older_token = jwt.sign({ foo: 'bar', iat: Math.floor(Date.now() / 1000) - 30 }, 'shhhhh');

// sign with RSA SHA256
var cert = fs.readFileSync('private.key');  // get private key
var token = jwt.sign({ foo: 'bar' }, privateKey, { algorithm: 'RS256'});

// sign asynchronously
jwt.sign({ foo: 'bar' }, cert, { algorithm: 'RS256' }, function(err, token) {
  console.log(token);
});
