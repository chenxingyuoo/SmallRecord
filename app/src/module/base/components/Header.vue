<template>
  <header class="header">
    <nav class="navbar">
      <div class="navbar-container">
        <div class="navbar-header">
          <span class="navbar-logo">SmallRecord</span>
        </div>

      </div>
    </nav>
  </header>
</template>

<script>
export default {
  name: 'header'

};
</script>

<style lang="scss" scoped>
  @import '../../../assets/scss/variables';
  .header {

    .navbar {
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 60px;
      line-height: 60px;
      background-color: $module-bg;
      z-index: 10000;

      .navbar-container {
        height: 60px;
        display: flex;
        justify-content: space-between;

        .navbar-header {
          height: 60px;
          display: flex;
          position: relative;
          align-items: center;
          padding-left: .5em;
          justify-content: space-between;

          .navbar-logo {
            /*font-family: 'Comic Sans MS';*/
            font-size: 22px;
            color: #333;
          }

          .navbar-slogan {
            color: $primary;
            /*font-family: CenturyGothic;*/
          }

          .navbar-link {
            position: absolute;
            width: 100%;
            height: 100%;
          }
        }
      }
    }
  }
</style>
