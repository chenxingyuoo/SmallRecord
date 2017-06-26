<template>
  <div class="articles">

    <!-- 列表 -->
    <div class="article-list">
      <transition name="module" mode="out-in">
        <div class="article-empty-box" v-if="!fetching && article.data.list && article.data.list.length === 0">
          <slot>No Result Article.</slot>
        </div>
        <transition-group name="fade" tag="div" v-else>
          <list-item v-for="(item, index) in article.data.list" :item="item" :key="item._id"></list-item>
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
        fetching: false
      };
    },
    components: {
      ListItem
    },
    props: {

    },
    computed: {
      ...mapGetters({
        article : 'getArticle'
      }),
      canLoadMore() {
        const { currentPage, totalPage } = this.article.data;
        return currentPage ? currentPage < totalPage : false;
      }
    },
    beforeMount(){
      //获取文章数据
      this.getArticleData();
    },

    methods : {
      ...mapActions([
        'fetchArticleList'
      ]),
      //获取文章数据
      getArticleData(){
        let params = {
          category : this.$route.name,
          page : this.article.currPage,
          pageSize : this.$store.state.global.pageSize
        };
        return this.fetchArticleList(params)
          .then(res => {
            //页码+1
            this.$store.commit('pagePlus');
            return res;
          });
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
      min-height: 1em;
      overflow: hidden;

      > .article-empty-box {
        background-color: $module-bg;
      }

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
