<template>
  <div id="loadingToast" v-show="show">

    <div class="loading-box">
      <i class="iconfont ic-loading"></i>
      <p class="loading__content">{{text}}</p>
    </div>

  </div>
</template>

<script>
  export default {
    props: ['show', 'text'],
    data() {
      return {};
    },
    components: {},
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
