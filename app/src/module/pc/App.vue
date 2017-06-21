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
  import BackTop from '@pc/components/common/BackTop.vue';

  import Background from '@pc/components/layout/Background.vue';
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

  body{
    font-size: 14px;
    line-height: 1.4;
    color: #333;
  }

  #app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }

  #app-main {
    transition: $mobile-aisde-transition;

    &.open {
      transition: $mobile-aisde-transition;
      transform: translateX(68%);
    }


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

      &.full-column {
        width: 62.5em;
        transition : width 0.35s;
      }

      &.error-column {
        width: 100%;
        margin: 0;
        transition : width 0.35s;
      }

      &.mobile-layout {
        width: 100%;
        margin: 0;
        padding: 1rem;
        padding-top: $navbar-height + 1;
      }
    }
  }

</style>
