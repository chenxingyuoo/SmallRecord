<template>
  <div class="created-article">


    <h2 class="form-item text-align-center">新增文章</h2>

    <el-form ref="form" :model="editForm" label-width="80px">


      <el-form-item label="封面">
        <div class="news-cover form-item-content" @click="clickFile">
          <img :src="editForm.cover" class="wh100" alt="加载中">
          <span class="news-avatar-btn">更改封面</span>
          <input type="file" name="cover" @change="coverChange" class="form-control" style="display: none">
        </div>
      </el-form-item>


      <el-form-item label="标题">
        <el-input required v-model="editForm.title" placeholder="文章标题"></el-input>
      </el-form-item>

      <el-form-item label="描述">
        <el-input type="textarea" v-model="editForm.desc" placeholder="文章描述"></el-input>
      </el-form-item>


      <el-form-item label="内容">
        <mavon-editor v-model="editForm.editValue" ref="mavonEditor"></mavon-editor>
      </el-form-item>


      <el-form-item label="">
        <el-button type="primary" @click="submitEdit">创建</el-button>
      </el-form-item>

    </el-form>

  </div>
</template>

<script>

  import { mapGetters, mapActions } from 'vuex';

  import defaultCover from '@/assets/img/logo.png';

  export default {
    data() {
      return {
        articleId: null,
        editForm: {
          id: this.$route.query.id,
          title: '',
          desc: '',
          editValue: '',
          content: '',
          file: null,
          cover: defaultCover
        }
      };
    },
    components: {},
    beforeMount(){
      if (this.editForm.id) {
        this.updateArticle();
      }
    },
    mounted (){
      debugger;
      console.log('mylog', this);

    },
    computed: {},
    methods: {
      ...mapActions([
        'fetchOneArticle',
        'saveArticle'
      ]),

      clickFile(e){
        e.currentTarget.lastChild.click();
      },
      coverChange(e) {
        const file = e.currentTarget.files[0];
        this.editForm.file = file;
        this.editForm.cover = window.URL ? URL.createObjectURL(file) : '';
      },
      updateArticle(){
        let params = {
          id: this.editForm.id
        };
        this.fetchOneArticle(params)
          .then(res => {
            let editForm = this.editForm;
            editForm.title = res.title;
            editForm.desc = res.desc;
            editForm.editValue = res.editValue;
            editForm.cover = res.cover;

          });
      },
      submitEdit(e) {
        this.editForm.content = this.$refs.mavonEditor['d_render'];

        this.saveArticle(this.editForm).then(res => {
          this.editForm = {
            title: '',
            desc: '',
            content: '',
            editValue: '',
            file: null,
            cover: defaultCover
          };
          alert('创建成功');
        });
      }
    }
  };
</script>

<style lang="scss" rel="stylesheet/scss">
  .news-cover {
    width: 150px;
    height: 150px;
    border:1px solid #ddd;
  }
  .news-cover{
    position: relative;
    cursor: pointer;
    overflow: hidden;
  }
  .news-cover:hover .news-avatar-btn{
    transform:translate3d(0,-25px,0);
    -webkit-transform:translate3d(0,-25px,0);
    -moz-transform:translate3d(0,-25px,0);
    -o-transform:translate3d(0,-25px,0)
  }
  .news-avatar-btn{
    position: absolute;
    width: 100%;
    text-align: center;
    height: 25px;
    bottom: -25px;
    line-height: 25px;
    background-color: #fff;
    transition: transform 300ms ease;
    -webkit-transition: -webkit-transform 300ms ease;
    -moz-transition: -moz-transform 300ms ease;
    -o-transition: -o-transform 300ms ease;
    font-size: 12px;
  }
</style>
