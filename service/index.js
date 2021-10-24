const Koa = require("koa");
const app = new Koa();
const bodyParser = require("koa-bodyparser");
const cors = require("koa2-cors");
const Router = require("koa-router");
const { connect, initSchemas } = require("./database/init.js");
let user = require("./appApi/user.js");
let diet = require("./appApi/diet.js");
(async () => {
  await connect();
  initSchemas();
})();
app.use(cors());

app.use(bodyParser());

// #######让路由模块化#########################
// 1.首先在index.js的文件顶部，引入koa-router
// 2.引入我们的user.js模块

// 3.装载所有子路由
let router = new Router();
router.use("/user", user.routes());
router.use("/diet", diet.routes());
// 4.加载路由中间件
app.use(router.routes()); //注册路由中间件
app.use(router.allowedMethods()); // 当有不被允许的方法的请求时，默认响应结果和设置状态码

app.use(async ctx => {
  ctx.body = "<h1>hello Koa2</h1>";
});

app.listen(3000, () => {
  console.log("[Server] starting at port 3000");
});
