const Router = require("koa-router");
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const fs = require("fs");
// const secret = "abc"; // 生成和验证token的私钥
let router = new Router();

//  后端验证token  rs256
router.post("/verifyToken", async ctx => {
  // 获取验证 JWT 时需要用的公钥
  const publicKey = fs.readFileSync("./config/public.key");
  let tokenRS256 = ctx.headers.authorization;
  // 验证 Token
  jwt.verify(tokenRS256, publicKey, (error, decoded) => {
    if (error) {
      console.log(error.message);
      ctx.body = { code: 500, message: error };
      return;
    } else {
      ctx.body = { code: 200, message: decoded };
    }
    console.log(decoded);
  });
});

//  后端验证token 使用hs256
// router.post("/verifyToken", async ctx => {
//   let token = JSON.parse(ctx.request.body.token);
//   console.log(token);
//   jwt.verify(token, secret, (error, decoded) => {
//     if (error) {
//       console.log(error.message)
//       ctx.body={code:500}
//     }
//     else{
//       ctx.body={code:200}
//     }
//     console.log(decoded)
//   })
// });

module.exports = router;
