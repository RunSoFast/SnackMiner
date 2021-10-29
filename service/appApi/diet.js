const Router = require("koa-router");
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
let router = new Router();

// 增
router.post("/management/add", async ctx => {
  // console.log(ctx.request.body);
  const Diet = mongoose.model("Diet");
  let newDiet = new Diet(ctx.request.body);
  await newDiet
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
router.get("/management/defaultquery", async ctx => {
  try {
    const Diet = mongoose.model("Diet");
    let result = await Diet.find().exec();
    ctx.body = { code: 200, message: result };
  } catch (err) {
    ctx.body = { code: 500, message: err };
  }
});

// 分页查询
router.post("/management/paginationquery", async ctx => {
  try {
    // console.log(ctx.request.body);
    let queryInfo = ctx.request.body;
    let currentPage = queryInfo.currentPage;
    let pageSize = queryInfo.pageSize;
    const Diet = mongoose.model("Diet");
    // let result = await Diet.find().exec();
    // let result = await Diet.find().skip(pageSize*currentPage-pageSize).limit(pageSize).sort({'_id':-1}).exec();
    let result = await Diet.find()
      .skip(pageSize * currentPage - pageSize)
      .limit(pageSize)
      .exec();
    ctx.body = { code: 200, message: result };
  } catch (err) {
    ctx.body = { code: 500, message: err };
  }
});

// 查询单个商品
router.post("/management/singlequery", async ctx => {
  console.log(ctx.request.body);
  let queryInfo = ctx.request.body;
  let queryname = queryInfo.queryname;
  const Diet = mongoose.model("Diet");
  await Diet.findOne({ name: queryname })
    .exec()
    .then(res => {
      console.log(res);
      ctx.body = { code: 200, message: res };
    })
    .catch(err => {
      ctx.body = { code: 500, message: err };
    });
});

// 删除单个商品
router.post("/management/delone", async ctx => {
  try {
    // console.log(ctx.request.body);
    let queryInfo = ctx.request.body;
    let name = queryInfo.name;
    const Diet = mongoose.model("Diet");
    let result = await Diet.deleteOne({ name: name }).exec();
    ctx.body = { code: 200, message: result };
  } catch (err) {
    ctx.body = { code: 500, message: err };
  }
});

// 编辑单个商品
router.post("/management/editone", async ctx => {
  try {
    console.log(ctx.request.body);
    let queryInfo = ctx.request.body;
    let name = queryInfo.name;
    const Diet = mongoose.model("Diet");
    await Diet.findOneAndUpdate(
      { name: name },
      {
        $set: {
          price: queryInfo.price,
          quantity: queryInfo.quantity
        }
      }
    )
      .exec()
      .then(res => {
        console.log(res);
        ctx.body = { code: 200, message: res };
      });
  } catch (err) {
    ctx.body = { code: 500, message: err };
  }
});

module.exports = router;
