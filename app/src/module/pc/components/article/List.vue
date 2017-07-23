<template>
  <div class="articles-box" v-loading="fetching">

    <carrousel></carrousel>

    <div class="articles">
      <!-- 列表 -->
      <div class="article-list">
        <transition name="module" mode="out-in">
          <div class="empty-box" v-if="!fetching && articleList && articleList.length === 0">
            <slot>暂无文章数据</slot>
          </div>
          <transition-group name="fade" tag="div" v-else>
            <list-item v-for="(item, index) in articleList" :item="item" :key="item._id"></list-item>
          </transition-group>
        </transition>
      </div>

      <!-- 加载更多 -->
      <div class="article-load">
        <button class="btn-loadmore" :disabled="fetching || !canLoadMore" @click="getArticleData">
          <span v-if="!fetching && canLoadMore">加载更多</span>
          <span v-else-if="fetching && canLoadMore">加载中</span>
          <span v-else-if="!canLoadMore">我是有底线的</span>
        </button>
      </div>
    </div>

  </div>

</template>

<script>
  import {mapActions, mapGetters} from 'vuex';
  import Carrousel from '@pc/components/article/Carrousel.vue';
  import ListItem from './Item.vue';

  export default {
    name: 'article-list',
    props: ['category'],
    data() {
      return {
        categoryName: this.$route.name,
        categoryPath: null,
        fetching: false,
        routeChange: false,
        bodyEl: document.body,
        loading : false
      };
    },
    components: {
      Carrousel,
      ListItem
    },
    computed: {
      ...mapGetters({
        article: 'getArticle'
      }),
      //当前分类文章列表
      articleList() {
        let articleData = this.article[this.category].data;
        let articleList = articleData.list;
        if (articleList && articleList.length !== 0) {
          return articleList;
        }
        return [];
      },
      canLoadMore() {
        const {currentPage, totalPage} = this.article[this.category].data;
        return currentPage ? currentPage < totalPage : false;
      },
      isLoadMore(){
        return this.article[this.category].isLoadMore;
      }
    },
    beforeMount(){

      //没有文章列表才请求
      if (this.articleList.length === 0) {
        //获取文章数据
        this.getArticleData();
      }
    },
    mounted(){
      //滚动到记录的位置
      this.bodyEl.scrollTop = this.article[this.category].scrollTop;

      setTimeout(() => {
        //滚动初始化
        this.scrollInit();
      },100);
    },
    beforeDestroy(){
      this.bodyEl.onscroll = null;
    },
    methods: {
      ...mapActions([
        'fetchArticleList'
      ]),
      //获取文章数据
      getArticleData(){
        if (this.isLoadMore === false) {
          return;
        }

        let params = {
          categoryName: this.categoryName,
          page: this.article[this.category].currPage,
          pageSize: this.$store.state.global.pageSize
        };

        this.fetching = true;

        this.fetchArticleList(params).then(res => {
          this.fetching = false;
        }).catch(err => {
          this.fetching = false;
        });
      },
      //滚动初始化，监听滚动位置 ， 保存滚动位置
      scrollInit(){
        let self = this;
        this.bodyEl.onscroll = (event) => {
          let scrollTop = self.bodyEl.scrollTop;
          self.$store.commit('setScrollTop', scrollTop);
        };
      }
    }
  };
</script>

<style lang="scss" scoped>
  @import '../../../../assets/scss/variables';

  .articles-box{
    position: relative;
  }
  .articles {

    > .article-list-header {
      margin-bottom: 1em;
      position: relative;
      overflow: hidden;
      background-color: $module-bg;
    }

    > .article-list {
      margin-bottom: 1em;
      overflow: hidden;
      min-height: 2.8em;
      position: relative;
      background-color: rgba(255, 255, 255, 0.6);

      > .article-loading {
        height: 10em;
        background-color: $module-bg;
        display: flex;
      }

      > .article-errmsg {
        height: 10em;
        line-height: 10em;
        background-color: $module-bg;
        text-align: center;
        color: rgba(0, 0, 0, 0.38);
      }
    }

    > .article-load {

      > .btn-loadmore {
        width: 100%;
        display: block;
        height: 3em;
        line-height: 3em;
        background-color: $module-bg;

        &:hover {
          background-color: $module-hover-bg;
        }
      }
    }
  }
</style>
