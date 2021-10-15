const Koa = require("koa");
const app = new Koa();

// #######让路由模块化#########################
// 1.首先在index.js的文件顶部，引入koa-router
const Router = require("koa-router");
// 2.引入我们的user.js模块
let user = require("./appApi/user.js");
// 3.装载所有子路由
let router = new Router();
router.use("/user", user.routes());
// 4.加载路由中间件
app.use(router.routes());//注册路由中间件
app.use(router.allowedMethods());// 当有不被允许的方法的请求时，默认响应结果和设置状态码

const bodyParser = require("koa-bodyparser");
app.use(bodyParser());

const cors = require("koa2-cors");
app.use(cors());

const { connect, initSchemas } = require("./database/init.js");

//立即执行函数
(async () => {
  await connect();
  initSchemas();
})();





app.use(async ctx => {
  ctx.body = "<h1>hello Koa2</h1>";
});

app.listen(3000, () => {
  console.log("[Server] starting at port 3000");
});
