<template>
  <div class="sidebar-main" :class="{'open' : isSidebarOpen}">

    <div class="sidebar-user">
      <div class="avatar">
        <img class="avatar-img" :src="avatar" alt="蜗牛先生">
      </div>
      <div class="profile">
        <h3 class="name">蜗牛先生</h3>
        <!--<p class="email">Talk is cheap. Show me the code</p>-->
      </div>
    </div>

    <div class="sidebar-nav">
      <nav class="nav-list" @click="closeSidebar">

        <router-link to="/all" class="nav-item" :class="{'router-link-active' : isArticleRouter}" exact>
          <i class="iconfont icon-home"></i>
          <span>Home</span>
        </router-link>

        <router-link to="/music" class="nav-item">
          <i class="iconfont icon-netease-music"></i>
          <span>Music</span>
        </router-link>
      </nav>
    </div>

  </div>
</template>

<script>
  import avatarImg from '@/assets/img/avatar.jpeg';
  export default {
    props : ['isSidebarOpen'],
    data() {
      return {
        avatar : avatarImg
      };
    },
    components: {},
    computed: {
      isArticleRouter () {
        let routePath = this.$route.path.replace('/','');
        let keys = Object.keys(this.$store.state.article.article);
        let keyStr = keys.join(' ');
        let reg = new RegExp(routePath,'g');

        return reg.test(keyStr);
      }
    },
    beforeMount(){

    },
    mounted(){

    },
    methods: {
      closeSidebar(){
        if (this.isSidebarOpen) {
          this.$store.commit('setSidebarVisible', false);
        }
      }
    }
  };
</script>

<style scoped>
  .sidebar-main{
    width: 3.8rem;
    height: 100%;
    position: fixed;
    top: 0;
    left: 0;
    z-index: 9999;
    background-color: rgba(52,57,61,0.9);
    transform: translateX(-100%);
    transition: all .3s ease-out;
  }

  .open{
    transform: translateX(0);
  }

  .sidebar-user {
    width: 100%;
    display: flex;
    align-items: flex-start;
    flex-direction: column;
    padding: 0.3rem;
    border-bottom: 1px solid #34393d;
  }

  .avatar {
    width: 1.8rem;
    height: 1.7rem;
    margin-bottom: 0.2rem;
  }

  .avatar-img {
    height: 100%;
    width: 100%;
    border: 2px solid rgba(255,255,255,0.6);
  }

  .profile {
    color: #eee;
    width: 100%;
  }

  .name {
    font-weight: bold;
  }

  .email {
    color: #20a0ff;
    margin: 0;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  .sidebar-nav {
    width: 100%;
  }

  .nav-item {
    border: none;
    display: block;
    height: 0.7rem;
    line-height: 0.7rem;
    padding: 0 0.3rem;
    text-decoration: none;
    text-transform: uppercase;
    font-size: 0.25rem;
    font-weight: 700;
    border-radius: 1px;
    color: #777;
  }

  .nav-item:last-child {
    margin-bottom: 0;
  }

  .router-link-active {
    font-weight: bold;
    color: #20a0ff;
    background-color: #eee;
  }

</style>
