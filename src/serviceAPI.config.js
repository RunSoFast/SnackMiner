const BASEURL = "http://localhost:3000/"
const URL = {
    registerUser: BASEURL+'user/register',  //用户注册接口
    login:BASEURL+'user/login', //登录接口
    dietManagementadd:BASEURL+'diet/management/add', //商品后台管理添加商品接口
    dietManagementdefaultquery:BASEURL+'diet/management/defaultquery', // 商品后台管理查询所有商品接口
    dietManagementpaginationquery:BASEURL+'diet/management/paginationquery' //商品后台管理分页查询接口
}

module.exports = URL