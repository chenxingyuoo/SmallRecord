<template>
  <div class="aside-nav">
    <nav class="nav-list">

      <router-link to="/all" class="item" :class="{'router-link-active' : activeIndex === 1}" exact>
        <i class="iconfont icon-home"></i>
        <span>Home</span>
      </router-link>

      <router-link to="/music" class="item">
        <i class="iconfont icon-netease-music"></i>
        <span>Music</span>
      </router-link>

    </nav>
  </div>
</template>

<script>
  export default {
    name: 'nav',
    props : ['activeIndex'],
    data() {
      return {

      };
    },
    components: {

    },
    computed: {

    },
    beforeMount(){
    },
    mounted(){
    }
  };
</script>

<style lang="scss" scoped>
  @import '../../../../assets/scss/variables';

  .aside-nav {
    position: fixed;
    top: 80px;
    display: inline-block;
    width: 11.5em;

    .nav-list {
      padding: 0;
      margin: 0;

      > .item-hr {
        margin: 2em 1em 1em 1em;
        border-top: 1px dashed #d6d6d6;
      }

      > .item {
        border: none;
        display: block;
        height: 3em;
        line-height: 3em;
        padding: 0 1em;
        text-decoration: none;
        text-transform: uppercase;
        font-weight: 700;
        border-radius: 1px;
        color: #777;
        font-family: CenturyGothic;
        margin-bottom: .5em;

        &.app {
          // margin-top: 0em;
          // color: $primary;
        }

        &:last-child {
          margin-bottom: 0;
        }

        &:hover {
          color: $primary;
        }

        &.router-link-active {
          font-weight: bold;
          color: $primary;
          background-color: $module-bg;
        }

        .iconfont {
          width: 1em;
          margin-right: 1em;
          display: inline-block;
        }
      }
    }
  }
</style>
