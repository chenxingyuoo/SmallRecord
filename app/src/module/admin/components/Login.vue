<template>
  <el-dialog title="登录" :visible.sync="isShowLogin" :before-close="closeLogin" :close-on-press-escape="false"
             :close-on-click-modal="false">
    <el-form :model="loginForm" :rules="rules" ref="loginForm" label-width="80px" class="demo-loginForm">
      <el-form-item label="手机号码" prop="tel">
        <el-input v-model.number="loginForm.tel"></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="pass">
        <el-input type="password" v-model="loginForm.password" auto-complete="off"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="login('loginForm')"  :loading="btnLoading">登录</el-button>
      </el-form-item>
    </el-form>
  </el-dialog>
</template>

<script>
  import { mapActions,mapGetters } from 'vuex';
  import { post } from '@admin/common/require';
  import api from '@admin/common/api';
  import { checkPhone } from '@/common/validators';

  import {localStore} from '@/common/storage';

  export default {
    data() {
      return {
        btnLoading : false,
        loginForm: {
          password: '',
          tel: ''
        },
        rules: {
          tel: [
            {validator: checkPhone, trigger: 'blur'}
          ],
          password: [
            { required: true, message: '请输入密码', trigger: 'blur' }
          ]
        }
      };
    },
    components: {},
    computed: {
      ...mapGetters({
        isShowLogin : 'getIsShowLogin'
      })
    },
    beforeMount(){

    },
    mounted(){

    },
    methods: {
      //提交，登录
      login(formName) {
        this.$refs[formName].validate((valid) => {
          if (!valid) {
            return;
          }

          this.btnLoading = true;

          //登录
          this.$store.dispatch('loginByPass', this.loginForm).then(res => {
            //存储数据到本地
            localStore.set('userInfo', res.data);
            localStore.set('authToken', res.token);

            this.$message({
              type : 'success',
              message : '登录成功!'
            });

            this.btnLoading = false;

            this.closeLogin();

          }).catch(err => {
            this.btnLoading = false;
          });

        });
      },
      //关闭登录
      closeLogin(){
        this.$store.commit('hideLogin');
      }
    }
  };
</script>

<style lang="" rel="stylesheet/">

</style>
