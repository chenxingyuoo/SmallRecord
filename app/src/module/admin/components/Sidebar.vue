<template>
  <div class="sidebar all-transition">
    <el-menu :default-active="onRoutes" class="el-menu-vertical-demo" theme="dark" unique-opened router>

      <el-menu-item index="/index">
        <i class="el-icon-setting"></i><span class="el-menu__text">自述</span>
      </el-menu-item>

      <el-submenu index="2">
        <template slot="title"><span class="el-menu__text">文章</span></template>
        <el-menu-item index="/createdArticle"><i class="el-icon-menu"></i><span class="el-menu__text">新建文章</span>
        </el-menu-item>
        <el-menu-item index="/articleList"><i class="el-icon-menu"></i><span class="el-menu__text">文章列表</span>
        </el-menu-item>
      </el-submenu>

    </el-menu>
  </div>
</template>

<script>
  export default {
    data (){
      return {};
    },
    beforeMount (){
    },
    computed: {
      onRoutes(){
        return this.$route.fullPath;
      }
    },
    methods: {

    }
  };
</script>

<style lang="scss" rel="stylesheet/scss">
  .sidebar {
    display: block;
    position: absolute;
    width: 150px;
    left: 0;
    top: 50px;
    bottom: 0;
    background: #2E363F;
    overflow: hidden;
    .el-menu-item {
      display: block;
    }
    ul {
      height: 100%;
    }

    .toggle-sidebar {
      text-align: center;
      height: 30px;
      line-height: 30px;
      color: #fff;
      cursor: pointer;
    }
    .el-menu [class^="el-icon-"] {
      vertical-align: baseline;
      margin-right: 10px;
    }
    .el-menu-item {
      padding: 0 20px !important;
    }
    .el-menu-item, .el-submenu__title {
      height: 45px !important;
      line-height: 45px !important;
    }
  }

  .sidebar-collapsed {
    .el-menu__text {
      display: none;
    }
  }

</style>
