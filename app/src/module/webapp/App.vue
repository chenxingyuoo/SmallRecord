<template>
  <div id="app">
    <v-header></v-header>

    <router-view></router-view>

  </div>
</template>

<script>
  import vHeader from './components/layout/Header.vue';
  export default {
    data() {
      return {};
    },
    components: {
      vHeader
    }
  };
</script>

<style lang="scss" rel="stylesheet/scss">
  @import '../../assets/scss/mixin';
  body{
    font-size: 0.3rem;
  }
  .iconfont{
    font-size: 0.4rem;
  }
  .empty-box{
    text-align: center;
    width: 100%;
    @include absCenterY();
  }
</style>
