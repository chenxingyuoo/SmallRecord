<template>
  <div class="music-wrap">
    <transition name="module">
      <keep-alive>
        <nav-view></nav-view>
      </keep-alive>
    </transition>

    <div class="main-content pb-30">
      还未开通
    </div>

  </div>
</template>

<script>
  import Nav from '@pc/components/layout/Nav.vue';

  export default {
    data() {
      return {};
    },
    components: {
      navView: Nav
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
