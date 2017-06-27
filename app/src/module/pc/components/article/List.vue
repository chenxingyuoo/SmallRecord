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
        isLoadMore: false,
        fetching: false,
        category : null
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
      }
    },
    beforeMount(){

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
        this.category = this.$route.path.replace('/', '');

        let params = {
          category : this.category,
          categoryName: this.categoryName,
          isLoadMore: this.isLoadMore,
          page: this.article[this.category].currPage,
          pageSize: this.$store.state.global.pageSize
        };
        return this.fetchArticleList(params);
      },
      //加载更多
      loadMore(){
        this.fetching = true;
        this.isLoadMore = true;

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
        this.isLoadMore = false;

        //获取文章列表初始化
        this.$store.commit('fetchArticleListInit', this.category);

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
