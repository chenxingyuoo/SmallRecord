<template>
  <div class="webapp-article">

    <category></category>

    <div class="article-box" ref="articleBox" >
      <carrousel></carrousel>

      <article-list ref="articleList"></article-list>
    </div>
  </div>
</template>

<script>
  import DomScroll from '@/common/plugins/domScroll';

  import Category from '@webapp/components/article/Category.vue';
  import Carrousel from '@webapp/components/article/Carrousel.vue';
  import ArticleList from '@webapp/components/article/List.vue';
  export default {
    data() {
      return {};
    },
    components: {
      Category,
      Carrousel,
      ArticleList
    },
    computed: {},
    beforeMount(){

    },
    mounted(){
      this.loadMore();
    },
    methods: {
      loadMore(){
        let self = this;
        new DomScroll({
          el : this.$refs.articleBox,
          scrollDown: (scrollObj) => {

            self.$refs.articleList.$emit('loadMore', scrollObj);

            //移除事件
//            alert('滚动到底部');
//            alert('没有数据就可以移除事件啦');
//            scrollObj.isRemoveEvent = true;

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
    padding-top: 0.8rem;
    overflow-y: auto;
    height: 10.6rem;
  }
</style>
