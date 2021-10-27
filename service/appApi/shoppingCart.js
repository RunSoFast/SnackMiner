const Router = require("koa-router");
const mongoose = require("mongoose");
let router = new Router();

// 增
router.post("/add", async ctx => {
  console.log(ctx.request.body);
  // ctx.body = "ok";
  const ShoppingCart = mongoose.model("ShoppingCart");
  let newShoppingCart = new ShoppingCart(ctx.request.body);
  await newShoppingCart
    .save()
    .then(() => {
      //成功返回code=200，并返回成功信息
      ctx.body = {
        code: 200,
        message: "商品保存成功"
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
