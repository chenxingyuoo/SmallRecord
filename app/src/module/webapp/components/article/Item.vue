<template>
  <div class="article-list-item">
    <a class="item-content flex-start-center">
      <div class="item-cover">
        <router-link :to="{ path : `/articleDetails/${item._id}`}" class="item-link">
          <img class="item-cover-img"
               :src="buildCover(item.cover)"
               :alt="item.title"
               :title="item.title">
        </router-link>
      </div>
      <div class="item-body flex-column-flex1">

        <router-link :to="{ path : `/articleDetails/${item._id}` }" class="item-title text-overflow" :title="item.title">
            {{ item.title }} 哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈
        </router-link>

        <p class="item-description" style="-webkit-box-orient: vertical;">{{ item.desc }}</p>
        <div class="item-meta">
          <span class="date">
            <i class="iconfont icon-clock"></i>
            <span>{{ item.updateAt }}</span>
          </span>
        </div>
      </div>
    </a>
  </div>
</template>

<script>

  export default {
    name: 'article-list-item',
    props: {
      item: Object
    },
    methods: {
      buildCover(cover) {
        if (!cover) {
          return '/img/default-cover.png';
        }
        return cover;
      }
    },
    computed: {

    }
  };
</script>

<style scoped>

  .article-list-item {
    background-color: rgba(255,255,255,0.6);
  }

  .item-content {
    overflow: hidden;
    margin: 0 0.2rem;
    border-bottom: 0.01rem solid hsla(0, 0%, 87%, .6);;
    padding: 0.2rem 0;
    -webkit-tap-highlight-color: rgba(0, 0, 0, .1);
    -webkit-touch-callout: none;
  }

  .item-content:hover .item-cover-img{
    opacity: .95;
    transform: translateX(-0.5em);
  }

  .item-cover {
    overflow: hidden;
    width: 2.5rem;
    height: 2.2rem;
    margin-right: 0.2rem;
  }
  .item-link{
    display: block;
    height: 100%;
  }
  .item-cover-img {
    min-width: 100%;
    width: calc(100% + 0.5em);
    max-width: calc(100% + 0.5em);
    height: auto;
    min-height: 8.5em;
    border-color: transparent;
    background-color: #c0c0c0;
    opacity : 1;
    transform : translateX(0);
  }


  .item-body {
    width: 3.3rem;
  }
  .item-title {
    margin-left: 0;
    height: 0.45rem;
    font-size: 0.3rem;
    font-weight: bold;
    color: #333;
    margin-top: 0.1rem;
    margin-bottom: 0.1rem;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  .item-title:hover {
    display: inline-block;
    text-decoration: underline;
    margin-left: .5em;
  }

  .item-description {
    font-size: 0.26rem;
    margin-bottom: 0.3em;
    height: 1rem;
    line-height: 1.8em;
    overflow: hidden;
    text-overflow: ellipsis;

    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
  }

  .item-description {
    font-size: 0.26rem;
    margin-bottom: 0.3em;
    height: 1rem;
    line-height: 1.8em;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
  }

  .item-meta {
    font-size: 0.26rem;
    height: 0.5rem;
    line-height: 0.5rem;
    display: flex;
    justify-content: flex-start;
    align-items: baseline;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    word-wrap: normal;
  }


</style>
