const mongoose = require("mongoose"); //引入Mongoose
const Schema = mongoose.Schema; //声明Schema
let ObjectId = Schema.Types.ObjectId; //声明Object类型

//创建我们的用户Schema，即用户表的模板，不具备表的操作能力
const dietSchema = new Schema(
  {
    Id: ObjectId,
    Name: { unique: true, type: String },
    price: Number,
    quantity:Number
  },
  {
    collection: "diet"
  }
);

//发布模型,是具备某张表操作能力的一个集合
mongoose.model("Diet", dietSchema);
