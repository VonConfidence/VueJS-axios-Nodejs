<template>
  <div id="home">
    <h1>{{msg}}</h1>
    <button @click="getEmail()">Get Email</button>
    <h2>Email:{{email}}</h2>
  </div>
</template>
<script>
import axios from 'axios';
import auth from '../model/auth';

import {
  mapGetters,
  mapActions
} from 'vuex';

export default {
  name: 'home',
  data() {
    return {
      msg: '欢迎您登录成功',
      email: ''
    }
  },
  computed: {
    ...mapGetters([
      'checkAuthenticated'
    ])
  },
  beforeCreate() {
    //如果没有token的话需要重新登录
    var authenticated = this.$store.state.login.authenticated; //可以
    //var authenticated=this.checkAuthenticated; //不能使用 因为数据是在create之后再有的 当前数据为undefined

    console.log("HomeVue登录状态: " + authenticated)
    if (!authenticated) {
      console.log("HomeVue 没有登录")
      this.$router.push('login')
    }
  },
  methods: {
    getEmail() {
      axios.get("http://localhost:3000/users/email", {
          headers: auth.getAuthHeader(),
          params: {
            ID: 12345
          }
        })
        .then(function(response) {
          console.log(response)
          //console.log(this)  如果没有绑定this  bind(this) 那么this实例就会为undefined
          this.email = response.data.data
        }.bind(this))
        .catch(function(error) {
          console.log("get email error")
          console.log(error);
        });


    }
  }
}
</script>
<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}

h1,
h2 {
  font-weight: normal;
}

a {
  color: #42b983;
}
</style>
