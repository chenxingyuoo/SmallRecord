<template>
<div id="index">
  <div>i am index</div>

  <p>element-ui</p>
  <el-button type="text" @click="open4">点击打开 Message Box</el-button>

</div>

</template>

<script>

  export default {
    data() {
        return {

        };
    },
    beforeMount(){
      let query = {
        page : 1,
        pageSize : 15
      };

      //获取文章列表
      this.$store.dispatch('index/FETCH_TOPIC_LIST', query);
    },
    components: {  //组件

    },
    computed: {

    },
    methods : {    //方法
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

<style lang='scss' rel="stylesheet/scss">

</style>
