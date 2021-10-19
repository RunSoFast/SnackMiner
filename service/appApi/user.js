const Router = require("koa-router");
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const SALT_WORK_FACTOR = 10;
const secret = "A SECRET"; // 生成和验证token的私钥
let router = new Router();

router.get("/", async ctx => {
  ctx.body = "这是用户操作首页";
});

router.post("/testToken", async ctx => {
  ctx.body = ctx.request;
});

router.post("/register", async ctx => {
  ctx.set("Access-Control-Allow-Origin", ctx.request.headers.origin);
  //取得Model
  // console.log(ctx.request.body);
  const User = mongoose.model("User");
  //把从前端接收的POST数据封装成一个新的user对象，entity ：类似记录，由Model创建的实体，也具有影响数据库的操作能力。
  let newUser = new User(ctx.request.body);
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

/*登录的实践 */
router.post("/login", async ctx => {
  // console.log(ctx.request.body);
  //得到前端传递过来的数据
  let loginUser = ctx.request.body;
  // console.log(loginUser); // 打印前端请求过来的数据
  let userName = loginUser.userName;
  let password = loginUser.password;
  //引入User的model
  const User = mongoose.model("User");
  //查找用户名是否存在，如果存在开始比对密码
  await User.findOne({ userName: userName })
    .exec()
    .then(async result => {
      // console.log(result);// 得到查询到的用户名对应的记录，查询不到返回空
      if (result) {
        //console.log(User)
        //当用户名存在时，开始比对密码
        let newUser = new User(); //因为是实例方法，所以要new出对象，才能调用
        await newUser
          .comparePassword(password, result.password)
          .then(isMatch => {
            token = generateToken(userName);
            ctx.body = { code: 200, message: isMatch, token: token };
          })
          .catch(error => {
            //出现异常，返回异常
            // console.log(error);
            // console.log(111);
            ctx.body = { code: 400, message: error }; // 500:出现异常
          });
      } else {
        ctx.body = { code: 404, message: "用户名不存在" }; // 404：用户名不存在数据库中
      }
    })
    .catch(error => {
      // console.log(error);
      ctx.body = { code: 400, message: error }; // 500:出现异常
    });
});

// 生成token
function generateToken(userName) {
  let payload = {
    userName,
    time: new Date().getTime(),
    timeout: 1000 * 60 * 60 * 2
  };
  let token = jwt.sign(payload, secret); // 生成token
  return token;
}

module.exports = router;
