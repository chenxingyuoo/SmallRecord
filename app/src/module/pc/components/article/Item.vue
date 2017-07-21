<template>
  <div class="article-list-item">
    <div class="item-content" >
      <div class="item-cover" >
        <router-link :to="{ path : `/articleDetails/${item._id}`}">
          <img class="item-cover-img"
               :src="buildCover(item.cover)"
               :alt="item.title"
               :title="item.title">
        </router-link>
      </div>
      <div class="item-body">
        <h4 class="item-title">
          <router-link :to="{ path : `/articleDetails/${item._id}` }" :title="item.title" class="title-link">{{ item.title }}</router-link >
        </h4>
        <p class="item-description" style="-webkit-box-orient: vertical;">{{ item.desc }}</p>
        <div class="item-meta">
          <span class="date">
            <i class="iconfont icon-clock"></i>
            <span>{{ item.updateAt }}</span>
          </span>
          <!--<span class="views">
            <i class="iconfont icon-eye"></i>
            <span>{{ item.meta.views || 0 }}</span>
          </span>
          <span class="comments">
            <i class="iconfont icon-comment"></i>
            <span>{{ item.meta.comments || 0 }}</span>
          </span>
          <span class="likes">
            <i class="iconfont icon-like"></i>
            <span>{{ item.meta.likes || 0 }}</span>
          </span>
          <span class="categories">
            <i class="iconfont icon-list"></i>
            <span v-if="!item.category.length">未分类</span>
            <router-link :key="index"
                         :to="`/category/${category.slug}`"
                         v-for="(category, index) in item.category">{{ category.name }}</router-link>
          </span>
          <span class="tags" v-show="false">
            <i class="iconfont icon-tag"></i>
            <span v-if="!item.tag.length">无</span>
            <router-link :key="index"
                         :to="`/tag/${tag.slug}`"
                         v-for="(tag, index) in item.tag">{{ tag.name }}</router-link>
                          </span>-->

        </div>
      </div>
    </div>
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

<style lang="scss">
  @import '../../../../assets/scss/variables';
  @import '../../../../assets/scss/mixin';
  .article-list-item {
    margin-bottom: 1em;
    background-color: $module-bg;

    &:last-child {
      margin: 0;
    }

    &:hover {
      background-color: $module-hover-bg;
    }

    > .item-content {
      display: block;
      overflow: hidden;
      height: 9.5em;
      padding: .5em;

      &:hover {

        > .item-cover {

          .item-cover-img {
            opacity : .95;
            transform : translateX(-0.5em);
          }
        }
      }

      > .item-cover {
        float: left;
        width: 12em;
        height: 8.5em;
        overflow: hidden;

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
      }

      > .item-body {
        float: right;
        width: 28.5em;
        height: 8.5em;

        > .item-title {
          font-size: 1em;
          font-weight: bold;
          color: #333;
          margin-top: .2em;
          margin-bottom: .5em;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;

          > a {
            margin-left: 0;

            &:hover {
              display: inline-block;
              margin-left: .5em;
            }
          }
        }

        > .item-description {
          font-size: .9em;
          margin: 0;
          margin-bottom: 0.3em;
          height: 5em;
          line-height: 1.8em;
          overflow: hidden;
          text-overflow: ellipsis;
          @include clamp(3);
        }

        > .item-meta {
          font-size: .9em;
          height: 2em;
          line-height: 2em;
          display: flex;
          justify-content: flex-start;
          align-items: baseline;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
          word-wrap: normal;
        }
      }
    }
  }
</style>
