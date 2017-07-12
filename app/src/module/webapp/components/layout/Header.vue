<template>
  <header class="header flex-start-center">
    <div class="left flex-center" @click.stop.prevent="toggleSidebar">
      <i class="ic-caidan iconfont"></i>
    </div>
    <div class="flex1-center">
      <div class="logo">SmallRecord</div>
    </div>
    <div class="right flex-center">
      <i class="ic-sousuo iconfont"></i>
    </div>
  </header>
</template>

<script>

  export default {
    data() {
      return {};
    },
    components: {},
    computed: {
      isSidebarOpen() {
        return this.$store.state.sidebar.isSidebarOpen;
      }
    },
    beforeMount(){

    },
    mounted(){

    },
    methods: {
      toggleSidebar(){
        this.$store.commit('setSidebarVisible', !this.isSidebarOpen);
      }

    }
  };
</script>

<style lang="scss" rel="stylesheet/scss">
  .header{
    height: 0.8rem;
    background-color: #20a0ff;
    color: #fff;
    position: fixed;
    top: 0;
    left: 0;
    z-index: 100;
  }
  .left,.right{
    width: 1rem;
    height: 100%;
  }
  .logo{
    font-family: 'Comic Sans MS';
    font-size: 0.4rem;
  }
</style>
