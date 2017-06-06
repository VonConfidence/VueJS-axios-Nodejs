<template>
  <div class="hello">
    <p v-for="item in list">
      Line:
      <span v-text="item"></span>
    </p>
    <infinite-loading :on-infinite="onInfinite" ref="infiniteLoading"> </infinite-loading>
  </div>
</template>
<script>
import InfiniteLoading from 'vue-infinite-loading';

export default {
  name: 'hello',
  data() {
    return {
      msg: 'Welcome to Your Vue.js App',
      list: []
    }
  },
  methods :{
    onInfinite() {
      setTimeout(() => {
        const temp = [];
        for (let i = this.list.length + 1; i <= this.list.length + 20; i++) {
          temp.push(i);
        }
        this.list = this.list.concat(temp);
        // 触发组件的动态加载事件
        this.$refs.infiniteLoading.$emit('$InfiniteLoading:loaded');
      }, 2000);
    }
  },
  components: {
    InfiniteLoading,
  },
}
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1,
h2 {
  font-weight: normal;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  display: inline-block;
  margin: 0 10px;
}

a {
  color: #42b983;
}
</style>
