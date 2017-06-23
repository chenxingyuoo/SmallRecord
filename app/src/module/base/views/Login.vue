<template>
  <div class="login">

    <div class="login-info">
      <h2>O(∩_∩)O~</h2>
      <h2>欢迎登录SmallRecord</h2>
    </div>

    <div class="login-box">
      <div class="mask"></div>
      <div class="card-box">
        <el-form :model="loginForm" :rules="rules" ref="loginForm" label-width="80px" class="demo-loginForm">
          <el-form-item label="手机号码" prop="tel">
            <el-input v-model.number="loginForm.tel"></el-input>
          </el-form-item>
          <el-form-item label="密码" prop="pass">
            <el-input type="password" v-model="loginForm.password" auto-complete="off"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="submitForm('loginForm')">登录</el-button>
          </el-form-item>
        </el-form>

        <p class="text-align-center">
          <router-link to="/register">
            还没账号 ? 去注册
          </router-link>
        </p>
      </div>
    </div>
  </div>
</template>

<script>
  import { post } from '@/common/require';
  import api from '@base/common/api';
  import createStore from '@/common/storage';
  import { checkPhone } from '@/common/validators';

  const store = createStore('local');

  export default {
    data() {
      const validatePass = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入密码'));
        } else {
          callback();
        }
      };
      return {
        loginForm: {
          password: '',
          tel: ''
        },
        rules: {
          tel: [
            { validator: checkPhone, trigger: 'blur' }
          ],
          password: [
            { validator: validatePass, trigger: 'blur' }
          ]
        }
      };
    },
    components: {},
    computed: {},
    beforeMount(){

    },
    mounted(){

    },
    methods: {
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (!valid) {
            return;
          }

          //登录请求
          post({
            url : api.userSignin,
            data : this.loginForm
          }).then(res => {

            store.set('authToken', res.token);
            location.href = '/module/admin.html#/index';
          }).catch(err => {
          });

        });
      }
    }
  };
</script>

<style lang="scss" rel="stylesheet/scss">
  @import '../../../assets/scss/mixin.scss';
  .login-info{
    width: 300px;
    @include absCenterY(15%);
  }
  .login-box{
    position: absolute;
    top:50%;
    transform: translateY(-50%);
    right: 15%;
    .mask{
      width: 100%;
      height: 100%;
      background-color: #fff;
      opacity: 0.2;
      @include absolute(0,0);
    }
    .card-box{
      position: relative;
      padding-top: 40px;
      z-index: 200;
    }
    label{
      color: #000;
    }
    input{
      border-color: #ddd;
      background-color: transparent;
      &:hover{
        border-color: #fff;
      }
    }
    button{
      width: 100%;
    }
  }
</style>
