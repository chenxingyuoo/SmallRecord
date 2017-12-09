<template>
  <article id="article-detail">
    <div class="pad-20" v-loading="loading">
      <div class="article-header">
        <h2 class="article-title">{{ oneArticle.title }}</h2>
        <div class="article-info">
          <span>{{oneArticle.updateAt}}</span>
        </div>
      </div>
      <div class="article-content markdown-body code-github">
        <div v-html="oneArticle.content"></div>
      </div>
    </div>
  </article>
</template>

<script>
  import * as common from '@/common/common';

  export default {
    data () {
      return {
        loading: false
      };
    },
    components: {},
    computed: {
      oneArticle () {
        return this.$store.state.article.oneArticle;
      }
    },
    beforeMount () {
      this.getOneArticleData();
      this.checkPageBack();
    },
    mounted () {
    },
    destroyed(){
      window.onpopstate = null;
    },
    methods: {
      //获取一篇文章数据
      getOneArticleData () {
        let params = {
          id: this.$route.params.id
        };
        this.loading = true;
        this.$store.dispatch('fetchOneArticle', params).then(res => {
          this.loading = false;
          document.title = this.oneArticle.title;
        }).catch(err => {
          this.loading = false;
        });
      },
      checkPageBack(){
        setTimeout(() => {
          if (history.length < 3) {
            let state = {
              title: 'title',
              url: '#/all'
            };
            window.history.pushState(state, 'title', null);

            state = {
              title: 'index',
              url: ''
            };
            window.history.pushState(state, 'index', '');

            window.onpopstate = () => {
              if (window.history.state !== null && window.history.state.url !== '') {
                location.hash = window.history.state.url;
              }
            };
          }
        }, 300);
      }
    }
  };
</script>

<style scoped>
  #article-detail {
    padding-top: 0.8rem;
    background-color: #fff;
    opacity: 0.8;
    border-radius: 2px;
    height: 100%;
    overflow-y: auto;
  }

  .article-header {
    text-align: center;
    margin-bottom: 40px;
  }

  .article-title {
    font-size: 30px;
    margin-bottom: 10px;
  }

</style>
