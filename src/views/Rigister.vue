<template>
  <div>
    <!--flex弹性盒子模型，justify-content：主抽 -->
    <div style="display: flex;justify-content: center;margin-top: 150px">
      <el-card style="width: 400px">
        <div slot="header">
          <span>注册</span>
        </div>
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
                v-model="user.password"
                type="password"
                placeholder="请输入密码"
                @keydown.enter.native="doRigister"
              ></el-input>
              <!-- @keydown.enter.native="doLogin"当按下enter键的时候也会执行doLogin方法-->
            </td>
          </tr>
          <tr>
            <!-- 占两行-->
            <td colspan="2">
              <el-button style="width: 100px" type="primary" @click="doReturn"
                >返回</el-button
              >
              <el-button
                style="width: 100px"
                type="primary"
                @click="axiosRegisterUser"
                :disabled="isDisabled"
                >确定</el-button
              >
            </td>
          </tr>
        </table>
      </el-card>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import url from "@/serviceAPI.config.js";
import { Toast } from "vant";
export default {
  data() {
    //相当于以前的function data(){},这是es5之前的写法，新版本可以省略掉function
    return {
      //之前是在里面直接写username，password等等，但是这里要写return
      //因为一个组件不管要不要被其他组件用，只要这样定义了，它就会认为可能这个组件会在其他的组件中使用
      //比如说在这里定义了一个变量，然后把这个组件引入到A组件中，A组件中修改了这个变量
      //同时这个组件也在B组件中引用了，这时候A里面一修改，B里面也变了，它们用的是一个值
      //可是一般来说可能希望在不同的组件中引用的时候，使用不同的值，所以这里要用return
      //这样在A组件和B组件分别引用这个变量的时候是不会互相影响的
      user: {
        username: "",
        password: ""
        //为了登录方便，可以直接在这里写好用户名和密码的值
      },
      isDisabled: false
    };
  },
  methods: {
    doReturn() {
      this.$router.go(-1);
    },
    axiosRegisterUser() {
      this.isDisabled = true;
      axios({
        url: url.registerUser,
        method: "post",
        data: {
          userName: this.user.username,
          password: this.user.password
        }
      })
        .then(response => {
          console.log(response);
          //如果返回code为200，代表注册成功，我们给用户作Toast提示
          if (response.data.code == 200) {
            Toast.success("注册成功");
          } else {
            console.log(response.data.message);
            Toast.fail("注册失败");
          }
          console.log(response.data.code);
          this.isDisabled = false;
        })
        .catch(error => {
          Toast.fail("注册失败");
          console.log(error);
          this.isDisabled = false;
        });
    }
  }
};
</script>
