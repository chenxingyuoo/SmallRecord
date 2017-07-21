<template>
  <div class="created-article">

    <h2 class="text-align-center">{{ opts.title }}</h2>

    <el-form ref="form" :model="editForm" :rules="rules" label-width="60px">

      <el-form-item label="标题" prop="title">
        <el-input required v-model="editForm.title" placeholder="文章标题"></el-input>
      </el-form-item>

      <el-form-item label="封面">
        <div class="news-cover form-item-content" @click="clickFile">
          <img :src="editForm.cover" class="wh100" alt="加载中">
          <span class="news-avatar-btn">更改封面</span>
          <input type="file" name="cover" @change="coverChange" class="form-control" style="display: none">
        </div>
      </el-form-item>

      <el-form-item label="分类">
        <el-checkbox-group v-model="selectCategory" @change="checkboxChange">
          <el-checkbox v-for="(item, index) in category" :label="item" :key="index"></el-checkbox>
        </el-checkbox-group>
      </el-form-item>

      <el-form-item label="描述">
        <el-input type="textarea" v-model="editForm.desc" placeholder="文章描述"></el-input>
      </el-form-item>

      <el-form-item label="内容" prop="editValue">
        <mavon-editor v-model="editForm.editValue" ref="mavonEditor" style="height: 500px;"
                      @change="editChange"></mavon-editor>
      </el-form-item>

      <el-form-item label="">
        <el-button type="primary" @click="createdArticle">提交</el-button>
      </el-form-item>

    </el-form>

  </div>
</template>

<script>

  import { mapGetters, mapActions } from 'vuex';
  import { indexOfByAttr } from '@/common/utils';

  import defaultCover from '@/assets/img/default-cover.png';

  let opts = {
    create: {
      title: '新增文章',
      tips: '创建成功'
    },
    update: {
      title: '更新文章',
      tips: '更新成功'
    }
  };

  export default {
    data() {
      return {
        opts: opts.create,
        articleId: null,
        selectCategory : [],
        editForm: {
          id: this.$route.query.id,
          title: '',
          desc: '',
          editValue: '',
          content: '',
          category : [],
          file: null,
          cover: defaultCover
        },
        rules: {
          title: [
            {required: true, message: '请输入文章标题', trigger: 'blur'}
          ],
          editValue: [
            {required: true, message: '请输入文章内容'}
          ]
        }
      };
    },
    components: {},
    beforeMount(){
      this.updateArticleInit();
    },
    mounted (){

    },
    computed: {
      ...mapGetters({
        category: 'getCategory'
      })
    },
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
      editFormReset(){
        this.editForm = {
          id: this.$route.query.id,
          title: '',
          desc: '',
          content: '',
          editValue: '',
          category : [],
          file: null,
          cover: defaultCover
        };
      },
      updateArticleInit(){
        if (this.$route.query.id) {
          this.opts = opts.update;

          this.editForm.id = this.$route.query.id;
          this.getOneArticleData();
        }
      },
      getOneArticleData(){
        let params = {
          id: this.$route.query.id
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
      createdArticle(e) {
          let self = this;
        this.$refs.form.validate((valid) => {
          if (!valid) {
            return;
          }

          this.editForm.category = self.selectCategory.join(',');
          this.editForm.content = this.$refs.mavonEditor['d_render'];

          this.saveArticle(this.editForm).then(res => {
            if (!this.editForm.id) {
              this.editFormReset();
            }
            this.$message(this.opts.tips);
          });
        });
      },
      //编辑内容改变
      editChange(value, reder){
        this.editForm.editValue = value;
        this.$refs.form.validateField('editValue');
      },
      checkboxChange(){
      }
    },
    watch: {
      '$route': function (route) {
        if (route.query.id) {
          this.updateArticleInit();
        } else {
          this.editFormReset();
        }
      }
    }
  };
</script>

<style lang="scss" rel="stylesheet/scss">
  .news-cover {
    width: 150px;
    height: 150px;
    border: 1px solid #ddd;
  }

  .news-cover {
    position: relative;
    cursor: pointer;
    overflow: hidden;
  }

  .news-cover:hover .news-avatar-btn {
    transform: translate3d(0, -25px, 0);
    -webkit-transform: translate3d(0, -25px, 0);
    -moz-transform: translate3d(0, -25px, 0);
    -o-transform: translate3d(0, -25px, 0)
  }

  .news-avatar-btn {
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

  .content-input-wrapper,
  .content-input{
    height: 100%;
  }
</style>
