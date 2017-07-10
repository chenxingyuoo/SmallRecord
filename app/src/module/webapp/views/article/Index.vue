<template>
  <div class="webapp-article">

    <category ref="category"></category>

    <div class="article-box" ref="articleBox" :style={height:articleBoxHeight}>
      <carrousel></carrousel>

      <article-list ref="articleList"></article-list>
    </div>
  </div>
</template>

<script>
  import * as common from '@/common/common';
  import DomScroll from '@/common/plugins/domScroll';

  import Category from '@webapp/components/article/Category.vue';
  import Carrousel from '@webapp/components/article/Carrousel.vue';
  import ArticleList from '@webapp/components/article/List.vue';
  export default {
    data() {
      return {
        articleBoxHeight : 0
      };
    },
    components: {
      Category,
      Carrousel,
      ArticleList
    },
    computed: {
    },
    beforeMount(){

    },
    mounted(){
      this.articleBoxHeight = common.winHeight - (this.$refs.category.$el.clientHeight * 2) + 'px';
      this.loadMore();
    },
    methods: {
      loadMore(){
        let self = this;
        new DomScroll({
          el : this.$refs.articleBox,
          scrollDown: (scrollObj) => {
            self.$refs.articleList.$emit('loadMore', scrollObj);
          }
        });
      }
    }
  };
</script>

<style lang="scss" rel="stylesheet/scss" scoped>
  .webapp-article {
    padding-top: 0.8rem;
  }
  .article-box{
    position: fixed;
    width: 100%;
    top: 1.6rem;
    left: 0;
    overflow-y: auto;
    // height: 10.6rem;
  }
</style>
