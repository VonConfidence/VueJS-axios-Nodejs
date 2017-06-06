<template>
  <div class="hacker-news-list">
    <div class="hacker-news-header">
      <span>Hacker News</span>
      <select v-model="tag" @change="changeFilter()">
        <option value="story">Story</option>
        <option value="poll">Poll</option>
        <option value="show_hn">Show hn</option>
        <option value="ask_hn">Ask hn</option>
        <option value="front_page">Front page</option>
      </select>
    </div>
    <div class="hacker-news-item" v-for="(item, key) in list">
      <span class="num" v-text="key + 1"></span>
      <p>
        <a target="_blank" :href="item.url" v-text="item.title"></a>
      </p>
      <p>
        <small>
            <span v-text="item.points"></span>
            points by
            <a target="_blank" :href="'https://news.ycombinator.com/user?id=' + item.author"
             v-text="item.author"></a>
              |
            <a target="_blank" :href="'https://news.ycombinator.com/item?id=' + item.objectID"
             v-text="item.num_comments + ' comments'"></a>
        </small>
      </p>
    </div>
    <!-- 数据加载组件-->
    <infinite-loading :on-infinite="onInfinite" :spinner="'circles'" ref="infiniteLoading">
    <!--
        http://www.jianshu.com/p/bfb5ca56b4fb
        1. $InfiniteLoading:loaded
            通常，你需要在数据加载后发送这个事件， InfiniteLoading组件将隐藏加载动画，并且准备下一次触发。
        2. $InfiniteLoading:complete
            如果InfiniteLoading组件就不会接收$InfiniteLoading:loaded，当你发送这个事件后，它将为用户显示一个没有结果的提示。如果InfiniteLoading组件接收过$InfiniteLoading:loaded，当你发送这个事件的时候，它会为用户显示一个没有更多内容的提示。你可以利用slot来自定义需要显示的内容
        3. $InfiniteLoading:reset
            InfiniteLoading组件将会回到最初的状态，并且on-infinite函数将会立刻被调用。大部分情况下，如果你把这个组件同过滤器或制表符一起使用，这个事件还是有用的。
        4. 旋转器     :spinner="'circles'"  bubbles circles default spiral waveDots
        5. slot插槽:
          no-results
              当InfiniteLoading组件接收到$InfiniteLoading:complete 事件并且它没有接收过$InfiniteLoading:loaded事件时，这个内容会显示出来。
          no-more
              当InfiniteLoading组件接收到$InfiniteLoading:complete 事件并且它已经接收过$InfiniteLoading:loaded事件时，这个内容会出现。
     -->
      <span slot="no-more"> <!-- 没有更多数据的时候 显示数据-->
        There is no more Hacker News :(
      </span>
    </infinite-loading>
  </div>
</template>
<script>
import InfiniteLoading from 'vue-infinite-loading';
import axios from 'axios';
const api = 'http://hn.algolia.com/api/v1/search_by_date?tags=story';
export default {
  data() {
      return {
        list: [],
        tag: 'story'
      };
    },
    methods: {
      onInfinite() {
        axios.get(api, {
          params: {
            page: this.list.length / 20 + 1 //每一页的数据是20条 获取第多少页的数据
          }
        }).then((res) => {
          if (res.data.hits.length) {
            this.list = this.list.concat(res.data.hits); // 添加数据
            //激活数据加载
            this.$refs.infiniteLoading.$emit('$InfiniteLoading:loaded');
            // 如果有3页数据的话 结束加载
            if (this.list.length / 20 === 3) {
              this.$refs.infiniteLoading.$emit('$InfiniteLoading:complete');
            }
          } else {
            this.$refs.infiniteLoading.$emit('$InfiniteLoading:complete');
          }
        });
      },
      changeFilter() {
        /*
          在changeFilter函数中，我们清楚了列表并等待DOM更新，
          然后我们触发一个$InfiniteLoading:reset事件，
          目的是让 InfiniteLoading 组件回到最初状态，它将立刻请求新的数据。
         */
        this.list = []; //数据清空 重新请求数据
        this.$nextTick(() => {
          this.$refs.infiniteLoading.$emit('$InfiniteLoading:reset');
        });
      }

    },
    components: {
      InfiniteLoading
    }
};
</script>
<style scoped>
.hacker-news-list .hacker-news-item {
  margin: 10px 0;
  padding: 0 10px 0 32px;
  line-height: 16px;
  font-size: 14px;
}

.hacker-news-list .hacker-news-item .num {
  margin-top: 1px;
  margin-left: -32px;
  float: left;
  width: 32px;
  color: #888;
  text-align: right;
}

.hacker-news-list .hacker-news-item p {
  padding-left: 8px;
  margin: 0;
}

.hacker-news-list .hacker-news-item .num:after {
  content: ".";
}

.hacker-news-list .hacker-news-item p>a {
  color: #333;
  padding-right: 5px;
}

.hacker-news-list .hacker-news-item p a {
  text-decoration: none;
}

.hacker-news-list .hacker-news-item p small,
.hacker-news-list .hacker-news-item p small a {
  color: #888;
}
</style>
