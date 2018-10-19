<template>
  <div id="app">

    <background-view></background-view>
    <header-view></header-view>

    <back-top></back-top>

    <main id="main">
      <router-view></router-view>
    </main>

  </div>
</template>

<script>
  import Background from '@/components/Background.vue';

  import BackTop from '@pc/components/common/BackTop.vue';

  import Header from '@pc/components/layout/Header.vue';
  export default {
    data() {
      return {};
    },
    components: {
      backgroundView: Background,
      headerView: Header,
      BackTop
    }
  };
</script>

<style lang="scss" rel="stylesheet/scss">
  @import './../../assets/scss/variables';
  @import '../../assets/scss/mixin';

  body{
    font-size: 14px;
    line-height: 1.4;
    color: #333;
  }

  #app {
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }

  #main {
    position: relative;
    padding-top: 80px;

    .main-content {
      float: left;
      width: 42.5em;
      margin: 0 0 0 12.5em;
      position: relative;
      overflow: hidden;
      transition : width 0.35s;
      padding-top: 55px;
    }
  }

  .empty-box{
    text-align: center;
    width: 100%;
    @include absCenterY();
  }

</style>
