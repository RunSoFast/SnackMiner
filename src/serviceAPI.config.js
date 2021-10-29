const BASEURL = "http://localhost:3000/"
const URL = {
    registerUser: BASEURL+'user/register',  //用户注册
    login:BASEURL+'user/login', //用户登录
    dietManagementadd:BASEURL+'diet/management/add', //商品后台管理添加商品
    dietManagementdefaultquery:BASEURL+'diet/management/defaultquery', // 商品后台管理查询所有商品
    dietManagementpaginationquery:BASEURL+'diet/management/paginationquery', //商品后台管理分页查询
    dietManagementsinglequery:BASEURL+'diet/management/singlequery', //商品后台管理分页查询单个商品
    dietManagementdelone:BASEURL+'diet/management/delone', //商品后台管理分页查询单个商品
    dietManagementeditone:BASEURL+'diet/management/editone', //商品后台管理分页编辑单个商品
    
    shoppingCartAdd:BASEURL+'shoppingCart/add', //首页添加商品到购物车
    shoppingCartQueryAll:BASEURL+'shoppingCart/queryAll', //购物车页面 查询所有商品
    shoppingCartAPaginationQuery:BASEURL+'shoppingCart/paginationQuery', //购物车页面 分页查询
    shoppingCartDelone:BASEURL+'shoppingCart/delone', //购物车页面 删除商品
    shoppingCartAddOne:BASEURL+'shoppingCart/addOne', //购物车页面 增加商品
    pay:BASEURL+'shoppingCart/pay', //购物车页面 支付

    verifyToken:BASEURL+'verifyToken', //验证token
}

module.exports = URL