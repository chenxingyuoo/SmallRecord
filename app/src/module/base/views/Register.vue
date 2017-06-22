<template>
  <div class="register">

    <div class="register-info">
      <h2>O(∩_∩)O~</h2>
      <h2>欢迎注册SmallRecord</h2>
    </div>

    <div class="register-box">
      <div class="mask"></div>
      <div class="card-box">
        <el-form :model="registerForm" :rules="rules" ref="registerForm" label-width="80px" class="demo-registerForm">
          <el-form-item label="手机号码" prop="tel">
            <el-input v-model.number="registerForm.tel"></el-input>
          </el-form-item>
          <el-form-item label="密码" prop="pass">
            <el-input type="password" v-model="registerForm.password" auto-complete="off"></el-input>
          </el-form-item>
          <el-form-item label="确认密码" prop="checkPass">
            <el-input type="password" v-model="registerForm.checkPass" auto-complete="off"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="submitForm('registerForm')">注册</el-button>
          </el-form-item>
        </el-form>

        <p class="text-align-center">
          <router-link to="/">
            已有账号 ? 去登录
          </router-link>
        </p>

      </div>
    </div>
  </div>
</template>

<script>

  import { post } from '@/common/require';
  import { checkPhone } from '@/common/validators';
  import api from '@base/common/api';
  export default {
    data() {

      const validatePass = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入密码'));
        } else {
          if (this.registerForm.checkPass !== '') {
            this.$refs.registerForm.validateField('checkPass');
          }
          callback();
        }
      };
      const validatePass2 = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请再次输入密码'));
        } else if (value !== this.registerForm.password) {
          callback(new Error('两次输入密码不一致!'));
        } else {
          callback();
        }
      };

      return {
        registerForm: {
          password: '',
          checkPass: '',
          tel: ''
        },
        rules: {
          tel: [
            { validator: checkPhone, trigger: 'blur' }
          ],
          password: [
            { validator: validatePass, trigger: 'blur' }
          ],
          checkPass: [
            { validator: validatePass2, trigger: 'blur' }
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

          //注册请求
          post({
            url : api.userSignup,
            data : this.registerForm
          }).then(res => {
          }).catch(err => {
          });

        });
      }
    }
  };
</script>

<style lang="scss" rel="stylesheet/scss">
  @import '../../../assets/scss/mixin.scss';
  .register-info{
    width: 300px;
    @include absCenterY(15%);
  }
  .register-box{
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
