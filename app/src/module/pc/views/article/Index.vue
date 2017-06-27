<template>

  <div class="article-wrap">

    <transition name="module">
      <keep-alive>
        <nav-view :activeIndex="1"></nav-view>
      </keep-alive>
    </transition>

    <div class="main-content pb-30">

      <div class="category-box mb-15">
        <router-link v-for="(item, index) in categoryArticleRouters" class="category-item" :to="{path : item.path }" :key="index">{{ item.name }}</router-link>
      </div>

      <carrousel></carrousel>
      <article-list></article-list>
    </div>

  </div>

</template>

<script>

  //分类文章路由
  import { categoryArticleRouters } from '@pc/router/article';

  import Nav from '@pc/components/layout/Nav.vue';
  import Carrousel from '@pc/components/article/Carrousel.vue';
  import ArticleList from '@pc/components/article/List.vue';

  export default {
    data() {
      return {
        categoryArticleRouters : categoryArticleRouters
      };
    },
    components: {
      navView: Nav,
      Carrousel,
      ArticleList
    },
    computed: {},
    beforeMount(){

    },
    mounted(){

    },
    methods: {}
  };
</script>

<style lang="scss" rel="stylesheet/scss" scoped>
  @import '../../../../assets/scss/variables';
  .article-wrap{
    position: relative;
  }
  .category-box{
    padding: 10px;
    background-color: rgba(255, 255, 255, 0.6);
    .category-item{
      margin: 0 10px;
      &.router-link-active {
        font-weight: bold;
        background-color: $primary;
        color: #fff;
        padding: 3px 4px;
        border-radius: 3px;
      }
    }

  }
</style>
