const Koa = require("koa");
const Router = require("koa-router");

const app = new Koa();
const router = new Router();

// 处理不同的 HTTP 方法
router
  .get("/users", ctx => {
    ctx.body = "获取用户列表";
  })
  .post("/users", ctx => {
    ctx.body = "创建用户";
  })
  .put("/users/:id", ctx => {
    // 解析 URL 参数
    ctx.body = `更新 ID 为 ${ctx.params.id} 的用户`;
  })
  .delete("/users/:id", ctx => {
    // 解析 URL 参数
    ctx.body = `删除 ID 为 ${ctx.params.id} 的用户`;
  });

// 注册路由中间件
app.use(router.routes());

app.listen(3000);
