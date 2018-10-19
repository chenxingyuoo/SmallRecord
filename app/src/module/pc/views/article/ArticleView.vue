<template>

  <div class="article-wrap">

    <transition name="module">
      <keep-alive>
        <nav-view :activeIndex="1"></nav-view>
      </keep-alive>
    </transition>

    <div class="main-content pb-30">

      <div class="category-box mb-15">
        <router-link v-for="(item, key) in categoryArticleRouters" class="category-item" :to="{path : key }" :key="key">
          {{ item.name }}
        </router-link>
      </div>

      <article-list :category="category"></article-list>
    </div>

  </div>

</template>

<script>

  import Nav from '@pc/components/layout/Nav.vue';

  import ArticleList from '@pc/components/article/List.vue';

  export default {
    props: ['category'],
    data() {
      return {};
    },
    components: {
      navView: Nav,
      ArticleList
    },
    computed: {
      categoryArticleRouters () {
        return this.$store.state.article.article;
      }
    },
    beforeMount(){
      //设置当前选中的分类
      this.$store.commit('setActiveCategory', this.category);
    },
    mounted(){

    },
    methods: {}
  };
</script>

<style lang="scss" rel="stylesheet/scss" scoped>
  @import '../../../../assets/scss/variables';

  .article-wrap {
    position: relative;
  }

  .category-box {
    padding: 10px;
    background-color: rgba(255, 255, 255, 0.6);
    position: fixed;
    top: 80px;
    z-index: 10;
    width: 42.5em;
    .category-item {
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
