<template>
  <div class="articles" v-loading="fetching">

    <carrousel></carrousel>

    <!-- 列表 -->
    <div class="article-list">
      <transition name="module" mode="out-in">
        <div class="empty-box" v-if="!fetching && articleList && articleList.length === 0">
          <slot>暂无文章数据</slot>
        </div>
        <transition-group name="fade" tag="div" v-else>
          <list-item v-for="(item, index) in articleList" :item="item" :key="category + item._id"></list-item>
        </transition-group>
      </transition>
    </div>

    <div class="flex-center more-tips-box" v-if="fetching === true">
      <span class="more-tips">加载更多</span>
      <div class="bounce-box">
        <div class="bounce-one"></div>
        <div class="bounce-two"></div>
        <div class="bounce-three"></div>
      </div>
    </div>

    <div class="flex-center" v-if="isNotDate === true" style="padding-bottom: 0.2rem;">
      <span class="more-tips">没有更多数据</span>
    </div>
  </div>
</template>

<script>
  import {mapActions, mapGetters} from 'vuex';
  import ListItem from './Item.vue';
  import Carrousel from './Carrousel.vue';

  export default {
    name: 'article-list',
    props: ['category'],
    data() {
      return {
        categoryName: this.$route.name,
        categoryPath: null,
        fetching: false,
        scrollObj: null
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
      },
      isNotDate(){
        return this.article[this.category].isNotDate;
      }
    },
    beforeMount(){
      //没有数据则获取数据
      if (this.articleList.length === 0) {
        //获取文章数据
        this.getArticleData();
      }
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
        let params = {
          categoryName: this.categoryName,
          page: this.article[this.category].currPage,
          pageSize: this.$store.state.global.pageSize
        };

        this.fetching = true;
        return this.fetchArticleList(params)
          .then(res => {
            this.fetching = false;
            return res;
          })
          .catch(err => {
            this.fetching = false;
            return err;
          });
      },
      //加载更多文章数据
      loadMore(scrollObj){
        if (this.isLoadMore === false) {
          scrollObj.lock = true;
          return;
        }

        this.getArticleData().then(res => {
          scrollObj.lock = true;
          if (res.list.length === 0) {
            this.isNotDate = true;
          }
        }).catch(err => {
          scrollObj.lock = true;
        });
      }
    }
  };
</script>

<style scoped>

  .article-list {
    padding-bottom: 0.3rem;
    overflow: hidden;
    min-height: 1rem;
    position: relative;
    background-color: rgba(255, 255, 255, 0.6);
  }

  .more-tips-box {
    position: fixed;
    bottom: 0;
    left: 0;
    width: 100%;
    padding: 0.2rem 0;
    color: #aaa;
    background-color: #fff;
  }

  .bounce-box {
    position: relative;
    text-align: center;
    top: 50%;
    bottom: 50%;
  }

  .bounce-one,
  .bounce-two,
  .bounce-three {
    display: inline-block;
    width: 0.2rem;
    height: 0.2rem;
    border-radius: 100%;
    top: 50%;
    background: #aeadba;
    -webkit-animation: bouncedelay 1.4s infinite ease-in-out;
    animation: bouncedelay 1.4s infinite ease-in-out;
    -webkit-animation-fill-mode: both;
    animation-fill-mode: both
  }

  .bounce-one {
    -webkit-animation-delay: -.32s;
    animation-delay: -.32s
  }

  .bounce-two {
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
