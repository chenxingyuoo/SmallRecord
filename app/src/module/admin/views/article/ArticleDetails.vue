<template>
  <article class="article-details">
    <div class="article-head text-align-center mb-20">
      <h3>{{ oneArticle.title }}</h3>
      <span>{{ oneArticle.updateAt }}</span>
    </div>

    <div class="article-body markdown-body code-github">
      <div v-html="oneArticle.content"></div>
    </div>
  </article>
</template>

<script>
  import { mapGetters, mapActions } from 'vuex';

  export default {
    data() {
      return {};
    },
    components: {

    },
    computed: {
      ...mapGetters({
        oneArticle: 'getOneArticle'
      })
    },
    beforeMount(){
      let params = {
        id: this.$route.params.id
      };
      this.fetchOneArticle(params)
        .then(res => {

        });
    },
    mounted(){

    },
    methods: {
      ...mapActions([
        'fetchOneArticle'
      ])
    }
  };
</script>

<style lang="scss" rel="stylesheet/scss">

</style>
