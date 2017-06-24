<template>
  <div class="header">
    <div class="logo">SmallRecord管理系统</div>
    <div class="user-info">

      <el-dropdown trigger="click" @command="handleCommand" v-if="userName">
          <span class="el-dropdown-link">
              <img class="user-logo" src="../../../assets/img/default-cover.png">
              {{ userName }}
          </span>

        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item command="loginOut">退出</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>

      <a v-else @click="loginShow" class="white-color">
        请登录
      </a>

    </div>
  </div>
</template>

<script>
  import createStore from '@/common/storage';
  const localStore = createStore('local');

  export default {
    data() {
      return {};
    },
    computed: {
      //获取当前公众号信息
      userInfo() {
        let localUserInfo = localStore.get('userInfo');
        if (!this.$store.state.global.userInfo._id && localUserInfo) {
          this.$store.commit('setUserInfo', localUserInfo);
        }
        return this.$store.state.global.userInfo;
      },
      //用户名
      userName(){
        return this.userInfo.name || this.userInfo.tel || '';
      }
    },
    mounted(){
    },
    methods: {
      handleCommand(command) {
        if (command === 'loginOut') {
          //退出
          this.loginOut();
        }
      },
      //登录显示
      loginShow(){
        this.$store.commit('showLogin');
      },
      //退出登录
      loginOut(){
        let params = {
          userId: this.userInfo._id
        };
        this.$store.dispatch('logoutById', params)
          .then(res => {
            this.$message({
              type : 'success',
              message : '退出登录成功!'
            });
          });
      }
    }
  };
</script>
<style scoped>
  .header {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 50px;
    font-size: 22px;
    line-height: 50px;
    color: #fff;
    background-color: #314058;
    z-index: 1000;
  }

  .header .logo {
    float: left;
    width: 250px;
    text-align: center;
  }

  .user-info {
    float: right;
    padding-right: 50px;
    font-size: 16px;
    color: #fff;
  }

  .user-info .el-dropdown-link {
    position: relative;
    display: inline-block;
    /*padding-left: 50px;*/
    color: #fff;
    cursor: pointer;
    vertical-align: middle;
  }

  .user-info .user-logo {
    width: 40px;
    height: 40px;
    border-radius: 50%;
    float: left;
    margin-top: 5px;
    margin-right: 10px;
  }

  .el-dropdown-menu__item {
    text-align: center;
  }
</style>
