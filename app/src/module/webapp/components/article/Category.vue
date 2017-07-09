<template>
  <div class="category-box">
    <div class="category-scroll flex-start-center">
      <router-link v-for="(item, key) in categoryArticleRouters" class="category-item" :to="{path : key }" :key="key">{{ item.name }}</router-link>
    </div>
    <div class="shadow"></div>
  </div>
</template>

<script>
  export default {
    data() {
      return {};
    },
    components: {},
    computed: {
      categoryArticleRouters () {
        return this.$store.state.article.article;
      }
    },
    beforeMount(){

    },
    mounted(){

    },
    methods: {}
  };
</script>

<style lang="scss" rel="stylesheet/scss" scoped>
  @import '../../../../assets/scss/variables';
  .category-box{
    width: 100%;
    height: 0.8rem;
    overflow: hidden;
    position: fixed;
    z-index: 10;
    top: 0.8rem;
    left: 0;
    background: #f4f5f6;
  }
  .category-scroll{
    overflow-x: scroll;
    white-space: nowrap;
    height: 100%;
  }
  .category-item{
    padding: 0 0.14rem;
    font-size: 0.32rem;
    margin-left: 0.188rem;
    display: inline-block;
    &.router-link-active {
      color: $primary;
    }
  }
  .shadow{
    height: 0.5rem;
    width: 0.2rem;
    /* background-image: linear-gradient(to top, rgba(0,0,0,.2), rgba(0,0,0,.4), rgba(0,0,0,.2)); */
    position: absolute;
    box-shadow: -4px 0 4px -4px black;
    right: -0.2rem;
    top: 0.14rem;
    z-index: 10;
  }
</style>
