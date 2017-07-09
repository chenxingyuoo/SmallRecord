<template>
  <div class="carrousel">

    <transition name="module" mode="out-in">
      <div class="empty-box" v-if="articleList && articleList.length === 0">
        <slot>暂无文章数据</slot>
      </div>
      <swiper :options="swiperOption" v-else-if="articleList && articleList.length !== 0">
        <swiper-slide v-for="(article, index) in articleList" :key="index">
          <div class="content">
            <div class="img" :style="{backgroundImage:'url('+ buildCover(article.cover) +')'}"></div>
            <router-link :to="`/articleDetails/${article._id}`" class="title">
              <span>{{ article.title }}</span>
            </router-link>
          </div>
        </swiper-slide>
        <div class="swiper-pagination" slot="pagination"></div>
      </swiper>
    </transition>

  </div>
</template>

<script>
  import { mapGetters } from 'vuex';
  export default {
    data() {
      return {
        swiperOption: {
          autoplay: 3500,
          setWrapperSize: true,
          pagination: '.swiper-pagination',
          paginationClickable: true,
          mousewheelControl: false,
          observeParents: true,
          slidesPerView: 1,
          autoHeight: true,
          grabCursor: true,
          preloadImages: false,
          lazyLoading: true,
          loop: true
        }
      };
    },
    components: {},
    computed: {
      ...mapGetters({
        article: 'getArticle'
      }),
      articleList() {
        this.category = this.$route.path.replace('/', '');
        let articleData = this.article[this.category].data;
        let articleList = articleData.list;
        if (articleList && articleList.length !== 0) {
          let num = Math.min(articleList.length, 9);
          return articleData.list.slice(0, num);
        }

        return [];
      }
    },
    beforeMount(){

    },
    mounted(){
      console.log('mylog', this);
    },
    methods: {
      buildCover(cover) {
        if (!cover) {
          return '/images/cover-article.jpg';
        }
        return cover;
      }
    }
  };
</script>

<style lang="scss" rel="stylesheet/scss" scoped>
  @import '../../../../assets/scss/variables';

  .carrousel {
    height: 2.9rem;
    margin-bottom: 0.1rem;
    position: relative;
    overflow: hidden;
    background-color: $module-bg;
    > .swiper-container {
      height: 100%;

      .content {
        width: 100%;
        height: 2.9rem;
        position: relative;
        overflow: hidden;

        .img {
          background-repeat: no-repeat;
          background-size: cover;
          background-position: center;
          width: 100%;
          height: 100%;
          transform: rotate(0deg) scale(1);
          transition: transform 1s;

          &:hover {
            transform: rotate(2deg) scale(1.1);
          }
        }

        .title {
          position: absolute;
          top: 0.4rem;
          right: 0.3rem;
          color: #333;
          background-color: rgba($module-hover-bg, .5);
          margin: 0;
          padding: 0 .5em;
          height: 2em;
          line-height: 2em;
          font-size: 1em;
          font-weight: bold;
          border-radius: 1px;
          letter-spacing: .3px;

          &:hover {
            color: #000;
            background-color: rgba($module-hover-bg, .9);
          }
        }
      }
    }
  }
</style>
