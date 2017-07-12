<template>
  <div class="webapp-article">

    <category ref="category"></category>

      <div class="article-box" ref="articleBox" :style={height:articleBoxHeight} >

        <carrousel></carrousel>

        <article-list ref="articleList" :domScroll="domScroll"></article-list>
      </div>
  </div>
</template>

<script>
  import { mapActions, mapGetters } from 'vuex';
  import * as common from '@/common/common';
  import DomScroll from '@/common/plugins/domScroll';

  import Category from '@webapp/components/article/Category.vue';
  import Carrousel from '@webapp/components/article/Carrousel.vue';
  import ArticleList from '@webapp/components/article/List.vue';
  export default {
    data() {
      return {
        domScroll : null,
        routeChange : false,
        category: this.$route.path.replace('/', ''),
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
    },
    mounted(){
      this.articleBoxHeight = common.winHeight - (this.$refs.category.$el.clientHeight * 2) + 'px';
      this.loadMore();
    },
    methods: {
      loadMore(){
        let self = this;
        this.domScroll = new DomScroll({
          el : this.$refs.articleBox,
          scroll : (scrollObj) => {
            /*let scrollTop = scrollObj.el.scrollTop;
            self.$store.commit('setScrollTop',{
              category: self.category,
              scrollTop : scrollTop
            });*/
          },
          scrollDown: (scrollObj) => {
            self.$refs.articleList.$emit('loadMore', scrollObj);
          }
        });
      }
    },
    watch: {
      '$route': function (route) {
        let self = this;
        this.category = route.path.replace('/', '');

        /*setTimeout(() => {
          let scrollTop = self.article[self.category].scrollTop;
          if (scrollTop !== 0) {
            scrollTop = scrollTop + 155;
          }
          //设置滚动位置
          self.domScroll.el.scrollTop = scrollTop;
        },20);*/


      }
    }
  };
</script>

<style lang="scss" rel="stylesheet/scss" scoped>
  .webapp-article {
    padding-top: 0.8rem;
  }

  .article-box {
    position: fixed;
    width: 100%;
    top: 1.6rem;
    left: 0;
    overflow-y: auto;
    // height: 10.6rem;
  }
</style>
