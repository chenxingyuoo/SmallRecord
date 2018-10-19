<template>
  <div class="carrousel">
    <transition name="module" mode="out-in">
      <swiper :options="swiperOption" v-if="articleList && articleList.length !== 0">
        <swiper-slide v-for="(article, index) in articleList" :key="category + index">
          <div class="swiper-content">
            <div class="swiper-img" :style="{backgroundImage:'url('+ buildCover(article.cover) +')'}"></div>
            <router-link :to="`/articleDetails/${article._id}`" class="swiper-title">
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

<style scoped>
  .carrousel {
    height: 2.5rem;
    margin-bottom: 0.1rem;
    position: relative;
    overflow: hidden;
    background-color: rgba(255,255,255,0.6);
  }

  .swiper-container {
    height: 100%;
  }

  .swiper-content {
    width: 100%;
    height: 2.9rem;
    position: relative;
    overflow: hidden;
  }

  .swiper-title {
    position: absolute;
    top: 0.4rem;
    right: 0.3rem;
    background-color: rgba(197,197,197,0.4);
    padding: 0 0.2rem;
    line-height: 0.52rem;
    max-width: 5.8rem;
    font-weight: bold;
    border-radius: 1px;
    letter-spacing: .3px;
  }

  .swiper-title:hover {
    color: #000;
    background-color: rgba(197,197,197,0.4);
  }

  .swiper-img {
    background-repeat: no-repeat;
    background-size: cover;
    background-position: center;
    width: 100%;
    height: 100%;
    transform: rotate(0deg) scale(1);
    transition: transform 1s;
  }
  .swiper-img:hover{
    transform: rotate(2deg) scale(1.1);
  }

</style>
