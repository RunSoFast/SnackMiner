const Router = require("koa-router");
const mongoose = require("mongoose");
let router = new Router();

// 首页添加购物车接口
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

// (默认)查询所有商品
router.get("/queryAll/:username", async ctx => {
  try {
    console.log(ctx.request.params);
    const ShoppingCart = mongoose.model("ShoppingCart");
    let result = await ShoppingCart.find({
      username: ctx.request.params.username
    }).exec();
    ctx.body = { code: 200, message: result };
  } catch (err) {
    ctx.body = { code: 500, message: err };
  }
});

// 分页查询
// router.post("/paginationQuery", async ctx => {
//   try {
//     console.log(ctx.request.body);
//     let queryInfo = ctx.request.body;
//     let currentPage = queryInfo.currentPage;
//     let pageSize = queryInfo.pageSize;
//     let username = queryInfo.username;
//     const ShoppingCart = mongoose.model("ShoppingCart");
//     let result = await ShoppingCart.find({ username: username })
//       .skip(pageSize * currentPage - pageSize)
//       .limit(pageSize)
//       .exec();
//     ctx.body = { code: 200, message: result };
//   } catch (err) {
//     ctx.body = { code: 500, message: err };
//   }
// });

// 删除单个商品
// router.post("/delone", async ctx => {
//   try {
//     console.log(ctx.request.body);
//     let queryInfo = ctx.request.body;
//     let username = queryInfo.username;
//     let name = queryInfo.name;
//     let quantity = queryInfo.quantity;
//     let result;
//     const ShoppingCart = mongoose.model("ShoppingCart");
//     if (quantity <= 0) {
//       result = await ShoppingCart.deleteOne({
//         username: username,
//         name: name
//       }).exec();
//     } else {
//       result = await ShoppingCart.findOneAndUpdate(
//         { name: name },
//         { username: username },
//         {
//           $set: {
//             price: queryInfo.price,
//             quantity: queryInfo.quantity
//           }
//         }
//       ).exec();
//     }
//     ctx.body = { code: 200, message: result };
//   } catch (err) {
//     ctx.body = { code: 500, message: err };
//   }
// });

// 购物车页面 删除单个商品
router.post("/delone", async ctx => {
  console.log(ctx.request.body);
  let queryInfo = ctx.request.body;
  let username = queryInfo.username;
  let name = queryInfo.name;
  const ShoppingCart = mongoose.model("ShoppingCart");
  result = await ShoppingCart.deleteOne({
    username: username,
    name: name
  })
    .exec()
    .then(res => {
      ctx.body = { code: 200, message: result };
    })
    .catch(err => {
      ctx.body = { code: 500, message: err };
    });
});

// 购物车页面 支付
router.post("/pay", async ctx => {
  console.log(ctx.request.body);
  let queryInfo = ctx.request.body;
  let username = queryInfo.username;
  const ShoppingCart = mongoose.model("ShoppingCart");
  result = await ShoppingCart.deleteMany({
    username: username
  })
    .exec()
    .then(res => {
      ctx.body = { code: 200, message: result };
    })
    .catch(err => {
      ctx.body = { code: 500, message: err };
    });
});

// 购物车页面增加商品
// router.post("/addOne", async ctx => {
//   try {
//     console.log(ctx.request.body);
//     let queryInfo = ctx.request.body;
//     let username = queryInfo.username;
//     let name = queryInfo.name;
//     const ShoppingCart = mongoose.model("ShoppingCart");
//     await ShoppingCart.findOneAndUpdate(
//       { name: name },
//       { username: username },
//       {
//         $set: {
//           price: queryInfo.price,
//           quantity: queryInfo.quantity
//         }
//       }
//     )
//       .exec()
//       .then(res => {
//         console.log(res);
//         ctx.body = { code: 200, message: res };
//       });
//   } catch (err) {
//     ctx.body = { code: 500, message: err };
//   }
// });

module.exports = router;
