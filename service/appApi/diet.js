const Router = require("koa-router");
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
let router = new Router();

router.post("/management/add", async ctx => {
    console.log(ctx.request.body);
});

module.exports = router;
