<template>
  <div class="back-top" v-show="show" @click.prevent.stop="toTop">
    <i class="iconfont ic-to-top"></i>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        show: false
      };
    },
    mounted(){
      let self = this;
      document.body.onscroll = () => {
        window.requestAnimFrame(() => {
          if (document.body.scrollTop > 400) {
            self.show = true;
          } else {
            self.show = false;
          }
        });
      };
    },
    //实例被摧毁之前调用
    beforeDestory() {
      document.body.onscroll = null;
    },
    methods: {
      toTop(){
        document.body.scrollTop = 0;
      }
    }

  };
</script>

<style lang="scss">
  @import '../../../../assets/scss/variables.scss';
  .back-top {
    position: fixed;
    right: 40px;
    bottom: 90px;
    z-index: 20000;
    width: 45px;
    height: 45px;
    text-align: center;
    line-height: 45px;
    border-radius: 50%;
    background-color: $primary;
    color: #fff;
    cursor: pointer;
    opacity: 0.5;
    transition: all 300ms ease;
    i{
      font-size: 23px;
    }
    &:hover{
      opacity: 1;
    }
  }
</style>
