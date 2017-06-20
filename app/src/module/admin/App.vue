<template>
  <div id="app">
    <div class="wrapper">
      <v-header></v-header>
      <v-sidebar></v-sidebar>

      <div class="view-wrapper">
        <div class="view-body">
          <router-view class="all-transition"></router-view>
        </div>
      </div>

    </div>

  </div>
</template>

<script>

  import vHeader from './components/Header.vue';
  import vSidebar from './components/Sidebar.vue';
  export default {
    name: 'app',
    data (){
      return {};
    },
    beforeMount (){
        //
    },
    components: {
      vHeader,
      vSidebar
    }
  };
</script>

<style>
  body {
    font-family: "Helvetica Neue", Helvetica, "microsoft yahei", arial, STHeiTi, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    color: #2c3e50;
  }

  html, body, #app, .wrapper {
    width: 100%;
    height: 100%;
    overflow: hidden;
  }


  .view-wrapper{
    margin-top: 50px;
    margin-left: 150px;
    width: auto;
    position: absolute;
    top: 0px;
    left: 0px;
    bottom: 0px;
    right: 0px;
    overflow: auto;
    background: #FFF;
  }
  .view-body{
    width: auto;
    position: absolute;
    top: 0px;
    left: 0px;
    bottom: 0px;
    right: 0px;
    overflow: hidden;
    overflow-y: auto;
    padding: 25px 25px 50px;
  }

</style>
