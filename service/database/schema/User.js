const mongoose = require("mongoose"); //引入Mongoose
const Schema = mongoose.Schema; //声明Schema
let ObjectId = Schema.Types.ObjectId; //声明Object类型
const bcrypt = require("bcrypt");
const SALT_WORK_FACTOR = 10;

//创建我们的用户Schema，即用户表的模板，不具备表的操作能力
const userSchema = new Schema(
  {
    UserId: ObjectId,
    userName: { unique: true, type: String },
    password: String,
    createAt: { type: Date, default: Date.now() },
    lastLoginAt: { type: Date, default: Date.now() }
  },
  {
    collection: "user"
  }
);

//每次存储数据时都要执行
userSchema.pre("save", function(next) {
  //let user = this
  console.log(this);
  bcrypt.genSalt(SALT_WORK_FACTOR, (err, salt) => {
    if (err) return next(err);
    bcrypt.hash(this.password, salt, (err, hash) => {
      if (err) return next(err);
      this.password = hash;
      next();
    });
  });
});

//发布模型,是具备某张表操作能力的一个集合
mongoose.model("User", userSchema);
