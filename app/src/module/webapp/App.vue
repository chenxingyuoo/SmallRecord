<template>
  <div id="app">

    <v-sidebar :isSidebarOpen="isSidebarOpen"></v-sidebar>

    <div id="app-main" :class="{'open' : isSidebarOpen}" >

      <div class="app-mask" v-show="isSidebarOpen" @click="closeSidebar"></div>

      <v-header></v-header>

      <router-view></router-view>
    </div>

  </div>
</template>

<script>
  import vHeader from './components/layout/Header.vue';
  import vSidebar from './components/layout/Sidebar.vue';
  export default {
    data() {
      return {};
    },
    components: {
      vHeader,
      vSidebar
    },
    computed: {
      isSidebarOpen() {
        return this.$store.state.sidebar.isSidebarOpen;
      }
    },
    mounted(){

    },
    methods : {
      closeSidebar(){
        if (this.isSidebarOpen) {
          this.$store.commit('setSidebarVisible', false);
        }
      }
    }
  };
</script>

<style lang="scss" rel="stylesheet/scss">
  @import '../../assets/scss/mixin';
  body{
    font-size: 0.28rem;
  }
  #app{
    overflow-x: hidden;
    height: 100%;
  }
  .iconfont{
    font-size: 0.4rem;
  }
  .empty-box{
    text-align: center;
    width: 100%;
    @include absCenterY();
  }

  #app-main{
    height: 100%;
    transition: all .3s ease-out;
    .app-mask{
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      z-index: 100;
    }
  }

  #app-main.open{
    transform: translateX(3.8rem);
  }
</style>
