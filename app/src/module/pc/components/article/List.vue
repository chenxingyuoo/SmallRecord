<template>
  <div class="articles">
    <!-- 列表 -->
    <div class="article-list">
      <transition name="module" mode="out-in">
        <div class="empty-box" v-if="!fetching && currCategoryArticleList && currCategoryArticleList.length === 0">
          <slot>暂无文章数据</slot>
        </div>
        <transition-group name="fade" tag="div" v-else>
          <list-item v-for="(item, index) in currCategoryArticleList" :item="item" :key="item._id"></list-item>
        </transition-group>
      </transition>
    </div>

    <!-- 加载更多 -->
    <div class="article-load">
      <button class="btn-loadmore" :disabled="fetching || !canLoadMore" @click="loadMore">
        <span v-if="!fetching && canLoadMore">加载更多</span>
        <span v-else-if="fetching && canLoadMore">加载中</span>
        <span v-else-if="!canLoadMore">我是有底线的</span>
      </button>
    </div>

  </div>
</template>

<script>
  import { mapActions, mapGetters } from 'vuex';
  import ListItem from './Item.vue';

  export default {
    name: 'article-list',
    data() {
      return {
        categoryName: this.$route.name,
        categoryPath: null,
        fetching: false,
        routerChange : false
      };
    },
    components: {
      ListItem
    },
    props: {},
    computed: {
      ...mapGetters({
        article: 'getArticle'
      }),
      category(){
        return this.$route.path.replace('/', '');
      },
      //当前分类文章列表
      currCategoryArticleList() {
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
      let self = this;
      let body = document.body;
      //监听滚动位置 ， 保存滚动位置
      /*body.onscroll = (event) => {
        window.requestAnimFrame(() => {
          if (this.routerChange === true) {
            this.routerChange = false;
            return;
          }
          let scrollTop = body.scrollTop;
          self.$store.commit('setScrollTop',{
            category: self.category,
            scrollTop : scrollTop
          });
        });
      };*/

      //获取文章数据
      this.getArticleData();
    },

    mounted(){

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
          category : this.category,
          categoryName: this.categoryName,
          page: this.article[this.category].currPage,
          pageSize: this.$store.state.global.pageSize
        };
        return this.fetchArticleList(params);
      },
      //加载更多
      loadMore(){
        this.fetching = true;

        this.getArticleData()
          .then(res => {
            this.fetching = false;
          })
          .catch(err => {
            this.fetching = false;
          });
      }
    },
    watch: {
      $route: function (route) {
        this.categoryName = route.name;

        this.routerChange = true;

        /*let self = this;
        setTimeout(() => {
          let scrollTop = self.article[self.category].scrollTop;
          if (scrollTop !== 0) {
            scrollTop = scrollTop + 150;
          }
          //设置滚动位置
          document.body.scrollTop = scrollTop;
        },300);*/

        if (this.article[this.category].currPage > 1) {
          return;
        }

        //重新获取文章数据
        this.getArticleData();
      }
    }
  };
</script>

<style lang="scss" scoped>
  @import '../../../../assets/scss/variables';

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
