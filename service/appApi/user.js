const Router = require("koa-router");
const mongoose = require("mongoose");

let router = new Router();

router.get("/", async ctx => {
  ctx.body = "这是用户操作首页";
});

router.post("/register", async ctx => {
  ctx.set('Access-Control-Allow-Origin',ctx.request.headers.origin)
  //取得Model
  console.log(ctx.request.body);
  const User = mongoose.model("User");
  //把从前端接收的POST数据封装成一个新的user对象，entity ：类似记录，由Model创建的实体，也具有影响数据库的操作能力。
  let newUser = new User(ctx.request.body);
  //    await connect();
  //   initSchemas();
  // const User = mongoose.model("User");
  // let oneUser = new User({ userName: "zhangsan1", password: "123456" });

  // oneUser.save().then(() => {
  //   console.log("插入成功");
  // });
  //用mongoose的save方法直接存储，然后判断是否成功，返回相应的结果
  await newUser
    .save()
    .then(() => {
      //成功返回code=200，并返回成功信息
      ctx.body = {
        code: 200,
        message: "注册成功"
      };
    })
    .catch(error => {
      //失败返回code=500，并返回错误信息
      ctx.body = {
        code: 500,
        message: error
      };
    });
});

module.exports = router;
