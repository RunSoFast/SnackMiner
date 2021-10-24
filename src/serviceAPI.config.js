const BASEURL = "http://localhost:3000/"
const URL = {
    registerUser: BASEURL+'user/register',  //用户注册接口
    login:BASEURL+'user/login', //登录接口
    dietManagement:BASEURL+'diet/management/add' //商品后台管理接口
}

module.exports = URL