<template>
  <div id="message">
    <div>i am message</div>

    <p>element-ui</p>
    <el-button type="text" @click="open4">点击打开 Message Box</el-button>

  </div>
</template>

<script>
  export default {
    data() {
      return {};
    },
    methods: {
      open4() {
        this.$msgbox({
          title: '消息',
          message: '这是一段内容, 这是一段内容, 这是一段内容, 这是一段内容, 这是一段内容, 这是一段内容, 这是一段内容',
          showCancelButton: true,
          confirmButtonText: '确定',
          cancelButtonText: '取消'
        }).then(action => {
          this.$message({
            type: 'info',
            message: 'action: ' + action
          });
        });
      }
    }
  };
</script>

<style lang="" rel="stylesheet/">

</style>
