<template>
  <div>
    <!-- 导航栏 -->
    <el-menu
      :default-active="activeIndex2"
      class="el-menu-demo"
      mode="horizontal"
      background-color="#545c64"
      text-color="#fff"
      active-text-color="#ffd04b"
    >
      <el-menu-item index="1" @click="home">首页推荐</el-menu-item>
      <el-submenu index="2">
        <template slot="title">点餐</template>
        <el-menu-item index="2-1">营养早餐</el-menu-item>
        <el-menu-item index="2-2">特色小吃</el-menu-item>
        <el-menu-item index="2-3">美味主食</el-menu-item>
        <el-submenu index="2-4">
          <template slot="title">甜点饮品</template>
          <el-menu-item index="2-4-1">奶茶果茶</el-menu-item>
          <el-menu-item index="2-4-2">醒脑咖啡</el-menu-item>
          <el-menu-item index="2-4-3">面包蛋糕</el-menu-item>
        </el-submenu>
      </el-submenu>
      <el-menu-item index="3" disabled>消息中心</el-menu-item>
      <el-menu-item index="4"
        ><a href="https://www.ele.me" target="_blank">订单管理</a></el-menu-item
      >
      <span class="right">
        <span v-if="!islogin">
          <el-menu-item index="5"
            ><el-button type="text" @click="changeDialogVisible"
              >登录</el-button
            ></el-menu-item
          >
        </span>
        <span v-else>
          <el-menu-item index="5">
            <el-dropdown>
              <span class="el-dropdown-link">
                {{ user.username
                }}<i class="el-icon-arrow-down el-icon--right"></i>
              </span>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item>个人中心</el-dropdown-item>
                <el-dropdown-item>我的订单</el-dropdown-item>
                <span @click="quitlogin"
                  ><el-dropdown-item divided>退出</el-dropdown-item></span
                >
              </el-dropdown-menu>
            </el-dropdown>
          </el-menu-item>
        </span>
      </span>
    </el-menu>

    <el-dialog
      title="登录"
      :visible.sync="dialogVisible"
      width="30%"
      :before-close="handleClose"
    >
      <div>
        <table>
          <tr>
            <td>用户名:</td>
            <td>
              <el-input
                v-model="user.username"
                placeholder="请输入用户名"
              ></el-input>
            </td>
          </tr>
          <tr>
            <td>密码:</td>
            <td>
              <el-input
                type="password"
                v-model="user.password"
                placeholder="请输入密码"
                @keydown.enter.native="doLogin"
              ></el-input>
            </td>
          </tr>
        </table>
      </div>
      <span slot="footer" class="dialog-footer">
        <i
          style="width: 70px;
    border-bottom: solid 0.2px blue;"
          @click="doRigister"
          class="login"
          >前往注册</i
        >
        <el-button @click="dialogVisible = false" class="btn">取 消</el-button>
        <el-button type="primary" @click="doLogin">登录</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import axios from "axios";
import url from "@/serviceAPI.config.js";
export default {
  name: "MainNavBar",
  data() {
    return {
      user: {
        username: "admin",
        password: "123456"
        //为了登录方便，可以直接在这里写好用户名和密码的值
      },
      activeIndex: "1",
      activeIndex2: "1",
      dialogVisible: false,
      islogin: false
    };
  },
  methods: {
    // handleSelect(key, keyPath) {
    //   console.log(key, keyPath); //打印点击的导航栏按钮
    // },
    home() {
      this.$router.push("/").catch(err => {});
    },
    handleClose(done) {
      this.$confirm("确认关闭？")
        .then(_ => {
          done();
        })
        .catch(_ => {});
    },
    changeDialogVisible() {
      this.dialogVisible = true;
    },
    doLogin() {
      //一点击登录按钮，这个方法就会执行
      // alert(JSON.stringify(this.user)); //可以直接把this.user对象传给后端进行校验用户名和密码
      axios({
        url: url.login,
        method: "post",
        data: {
          userName: this.user.username,
          password: this.user.password
        }
      })
        .then(response => {
          // console.log(response);
          if (response.data.code == 200) {
            if (response.data.message == true) {
              this.islogin = true;
              this.dialogVisible = false;
            }
            else{
              alert("用户账号或密码错误");
            }
          } else if (response.data.code == 404) {
            alert("用户账号或密码错误");
          } else {
            alert("出现异常" + response.data.message);
          }
        })
        .catch(error => {
          console.log(error);
        });
    },
    doRigister() {
      this.dialogVisible = false;
      this.$router.push("/register");
    },
    quitlogin() {
      this.islogin = false;
    }
  }
};
</script>

<style scoped>
/* 导航栏 */
.btn {
  position: relative;
}
.login {
  position: absolute;
  right: 480px;
  bottom: 30px;
}
.el-carousel__item h3 {
  color: #475669;
  font-size: 14px;
  opacity: 0.75;
  line-height: 200px;
  margin: 0;
}

.el-carousel__item:nth-child(2n) {
  background-color: #99a9bf;
}

.el-carousel__item:nth-child(2n + 1) {
  background-color: #d3dce6;
}

.right {
  position: absolute;
  right: 0px;
  /* width: 300px; */
  /* border: 3px solid #73AD21; */
  /* padding: 10px; */
}
.el-dropdown-link {
  cursor: pointer;
  color: #409eff;
}
.el-icon-arrow-down {
  font-size: 12px;
}
</style>
