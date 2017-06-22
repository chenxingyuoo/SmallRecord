<template>
  <div id="app">
    <background></background>
    <header-view></header-view>

    <div class="router-content">
      <router-view></router-view>
    </div>

  </div>
</template>

<script>
  import Background from '@/components/Background.vue';
  import Header from '@base/components/Header.vue';

  export default {
    data() {
      return {};
    },
    components: {
      Background,
      headerView : Header
    }
  };
</script>

<style lang="scss" rel="stylesheet/scss">
  body{
    font-size: 14px;
    line-height: 1.4;
    color: #000;
  }
  #app{
    height: 100%;
    max-width: 1280px;
    margin: 0 auto;
    .router-content{
      padding: 80px 20px 20px;
    }
  }

  .card-box{
    width: 380px;
    padding: 20px;
    border: 1px solid #ddd;
    box-shadow: 0 0 5px #666;
    border-radius: 5px;
  }
</style>
