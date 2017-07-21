<template>
  <div class="webapp-article">
    <category ref="categoryBox"></category>

    <div class="article-box" ref="articleBox" :style={height:articleBoxHeight}>

      <carrousel></carrousel>

      <article-list ref="articleList" :domScroll="domScroll" :category="category"></article-list>
    </div>
  </div>
</template>

<script>
  import {mapActions, mapGetters} from 'vuex';
  import * as common from '@/common/common';
  import DomScroll from '@/common/plugins/domScroll';

  import Category from '@webapp/components/article/Category.vue';
  import Carrousel from '@webapp/components/article/Carrousel.vue';
  import ArticleList from '@webapp/components/article/List.vue';

  export default {
    props: ['category'],
    data() {
      return {
        domScroll : null,
        routeChange: false,
        articleBoxHeight: 0
      };
    },
    components: {
      Category,
      Carrousel,
      ArticleList
    },
    computed: {
      ...mapGetters({
        article: 'getArticle'
      })
    },
    beforeMount(){
      //设置当前选中的分类
      this.$store.commit('setActiveCategory', this.category);
    },
    mounted(){
      //滚动事件初始化
      this.domScrollInit();

      //滚动到记录的位置
      this.domScroll.el.scrollTop = this.article[this.category].scrollTop;
      //获取高度
      this.articleBoxHeight = common.winHeight - (this.$refs.categoryBox.$el.clientHeight * 2) + 'px';

    },
    methods: {
      //滚动事件初四化
      domScrollInit: function () {
        let self = this;
        this.domScroll = new DomScroll({
          el: this.$refs.articleBox,
          //滚动事件
          scroll: (scrollObj) => {
            let scrollTop = scrollObj.el.scrollTop;
            self.$store.commit('setScrollTop', scrollTop);
          },
          //滚动到底部
          scrollDown: (scrollObj) => {
            //触发子组件方法
            self.$refs.articleList.$emit('loadMore', scrollObj);
          }
        });
      }
    }
  };
</script>

<style scoped>
  .webapp-article {
    padding-top: 0.8rem;
  }

  .article-box {
    position: fixed;
    width: 100%;
    top: 1.6rem;
    left: 0;
    overflow-y: auto;
  }
</style>
