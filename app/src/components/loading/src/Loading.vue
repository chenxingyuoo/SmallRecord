<template>
  <div class="loading-mask" v-show="visible">
    <div class="loading-box">
      <svg class="circular" viewBox="25 25 50 50">
        <circle class="path" cx="50" cy="50" r="20" fill="none"/>
      </svg>
      <p v-if="text" class="loading-text">{{ text }}</p>
    </div>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        text: null,
        visible: false,
        customClass: ''
      };
    },
    components: {},
    computed: {},
    beforeMount(){

    },
    mounted(){

    },
    methods: {
      setText(text){
        this.text = text;
      }
    }
  };
</script>

<style lang="scss" rel="stylesheet/scss">
  .loading-mask {
    position: absolute;
    z-index: 10000;
    background-color: hsla(0,0%,100%,.9);
    margin: 0;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    transition: opacity .3s;
  }

  .loading-box {
    top: 50%;
    margin-top: -21px;
    width: 100%;
    text-align: center;
    position: absolute;
    .circular {
      width: 42px;
      height: 42px;
      animation: loading-rotate 2s linear infinite;
    }
    .path{
      animation: loading-dash 1.5s ease-in-out infinite;
      stroke-dasharray: 90,150;
      stroke-dashoffset: 0;
      stroke-width: 2;
      stroke: #20a0ff;
      stroke-linecap: round;
    }
    .loading-text {
      color: #20a0ff;
      margin: 3px 0;
      font-size: 14px;
    }
  }

  @keyframes loading-rotate {
    to {
      transform: rotate(1turn)
    }
  }

  @keyframes loading-dash {
    0% {
      stroke-dasharray: 1, 200;
      stroke-dashoffset: 0
    }
    50% {
      stroke-dasharray: 90, 150;
      stroke-dashoffset: -40px
    }
    to {
      stroke-dasharray: 90, 150;
      stroke-dashoffset: -120px
    }
  }

</style>
