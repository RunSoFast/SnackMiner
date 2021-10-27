const BASEURL = "http://localhost:3000/"
const URL = {
    registerUser: BASEURL+'user/register',  //用户注册接口
    login:BASEURL+'user/login', //登录接口
    dietManagementadd:BASEURL+'diet/management/add', //商品后台管理添加商品接口
    dietManagementdefaultquery:BASEURL+'diet/management/defaultquery', // 商品后台管理查询所有商品接口
    dietManagementpaginationquery:BASEURL+'diet/management/paginationquery', //商品后台管理分页查询接口
    dietManagementsinglequery:BASEURL+'diet/management/singlequery', //商品后台管理分页查询单个商品接口
    dietManagementdelone:BASEURL+'diet/management/delone', //商品后台管理分页查询单个商品接口
    dietManagementeditone:BASEURL+'diet/management/editone', //商品后台管理分页编辑单个商品接口
    shoppingCartAdd:BASEURL+'shoppingCart/add', //购买商品接口
}

module.exports = URL