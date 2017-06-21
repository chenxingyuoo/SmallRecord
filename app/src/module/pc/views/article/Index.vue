<template>

  <div class="article-wrap">
    <transition name="module">
      <keep-alive>
        <nav-view></nav-view>
      </keep-alive>
    </transition>

    <div class="main-content pb-30">
      <carrousel></carrousel>
      <article-list></article-list>
    </div>

  </div>

</template>

<script>

  import Nav from '@pc/components/layout/Nav.vue';

  import Carrousel from '@pc/components/article/Carrousel.vue';
  import ArticleList from '@pc/components/article/List.vue';
  export default {
    data() {
      return {

      };
    },
    components: {
      navView: Nav,
      Carrousel,
      ArticleList
    },
    computed: {},
    beforeMount(){

    },
    mounted(){

    },
    methods: {}
  };
</script>

<style lang="" rel="stylesheet/">

</style>
