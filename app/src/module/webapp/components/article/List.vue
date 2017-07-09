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

    <div class="flex-center more-tips-box" v-if="fetching === true" >
        <span class="more-tips">加载更多</span>
        <div class="three-bounce">
          <div class="one"></div>
          <div class="two"></div>
          <div class="three"></div>
        </div>
    </div>

    <div class="flex-center more-tips-box" v-if="isNotDate === true">
      <span class="more-tips">没有更多数据</span>
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
        isLoadMore: true,
        isNotDate: false,
        fetching: false,
        category: null
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
      this.$on('loadMore', this.loadMore);
    },
    methods: {
      ...mapActions([
        'fetchArticleList'
      ]),
      //获取文章数据
      getArticleData(){
        this.category = this.$route.path.replace('/', '');

        let params = {
          category: this.category,
          categoryName: this.categoryName,
          isLoadMore: this.isLoadMore,
          page: this.article[this.category].currPage,
          pageSize: this.$store.state.global.pageSize
        };
        return this.fetchArticleList(params);
      },
      //加载更多
      loadMore(scrollObj){
        this.fetching = true;

        this.getArticleData()
          .then(res => {
            if (res.list.length === 0) {
              scrollObj.isRemoveEvent = true;
            }
            scrollObj.lock = true;
            this.fetching = false;
          })
          .catch(err => {
            scrollObj.lock = true;
            this.fetching = false;
          });

      }
    },
    watch: {
      $route: function (route) {
        this.categoryName = route.name;

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
      padding-bottom: 0.3rem;
      overflow: hidden;
      min-height: 1rem;
      position: relative;
      background-color: rgba(255, 255, 255, 0.6);
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

  .more-tips-box {
    padding-bottom: 0.2rem;
    color: #aaa;
  }

  .three-bounce {
    position: relative;
    text-align: center;
    top: 50%;
    bottom: 50%;
  }

  .three-bounce > div {
    display: inline-block;
    width: 0.2rem;
    height: 0.2rem;
    border-radius: 100%;
    top: 50%;
    /*margin-top: -9px;*/
    background: #aeadba;
    -webkit-animation: bouncedelay 1.4s infinite ease-in-out;
    animation: bouncedelay 1.4s infinite ease-in-out;
    -webkit-animation-fill-mode: both;
    animation-fill-mode: both
  }

  .three-bounce .one {
    -webkit-animation-delay: -.32s;
    animation-delay: -.32s
  }

  .three-bounce .two {
    -webkit-animation-delay: -.16s;
    animation-delay: -.16s
  }

  @keyframes bouncedelay {
    0%, 100%, 80% {
      transform: scale(0);
      -webkit-transform: scale(0)
    }
    40% {
      transform: scale(1);
      -webkit-transform: scale(1)
    }
  }
</style>
