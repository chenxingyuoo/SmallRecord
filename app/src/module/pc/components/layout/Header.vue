<template>
  <header class="header">
    <div class="header-container container">
      <div class="header-logo-box">
        <router-link to="/all" class="header-logo">
          SmallRecord
        </router-link>
      </div>
    </div>
  </header>
</template>

<script>
  export default {
    name: 'header'

  };
</script>

<style lang="scss" scoped>
  @import '../../../../assets/scss/variables';

  .header{
    position: fixed;
    top: 0;
    left: 0;
    height: 60px;
    line-height: 60px;
    width: 100%;
    background-color: $module-bg;
    z-index: 10000;
  }
  .header-container {
    height: 60px;
    display: flex;
    justify-content: space-between;
  }

  .header-logo-box {
    height: 60px;
    display: flex;
    position: relative;
    align-items: center;
    padding-left: .5em;
    width: 30em;
    justify-content: space-between;

    .header-logo {
      font-family: 'Comic Sans MS';
      font-size: 22px;
      color: #333;
    }
  }
</style>
