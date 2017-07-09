<template>
    <article id="article">
      <div class="pad-20">
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

  export default {
    data() {
      return {};
    },
    components: {

    },
    computed: {
      oneArticle(){
        return this.$store.state.article.oneArticle;
      }
    },
    beforeMount(){
      this.getOneArticleData();
    },
    mounted(){
    },
    methods: {

      //获取一篇文章数据
      getOneArticleData(){
        let params = {
          id : this.$route.params.id
        };
        this.$store.dispatch('fetchOneArticle', params);
      }
    }
  };
</script>

<style lang="scss" rel="stylesheet/scss">
  #article{
    padding-top: 0.8rem;
    background-color: #fff;
    opacity: 0.8;
    border-radius: 2px;
    .article-header{
      text-align: center;
      margin-bottom: 40px;
    }
    .article-title{
      font-size: 30px;
      margin-bottom: 10px;
    }

  }

</style>
