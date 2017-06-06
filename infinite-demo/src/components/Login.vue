<template>
  <div>
    <h2>登录 状态: {{checkAuthenticated}}</h2>
    <p>{{ error }}</p>
    http://blog.csdn.net/jimo_lonely/article/details/69664785
    <div>
      <input type="text" placeholder="Enter your username" v-model="info.username">
    </div>
    <div>
      <input type="password" placeholder="Enter your password" v-model="info.password">
    </div>
    <button @click="submit()">登录</button>
  </div>
</template>
<script>
import auth from '../model/auth'

import {
  mapGetters,
  mapActions
} from 'vuex'

export default {
  
  data() {
      return {
        info: {
          username: '',
          password: ''
        },
        error: '',
      }
    },
    /*映射到 login.js 中的 getters 中的checkAuthenticated */
    computed: {
      ...mapGetters([
          'checkAuthenticated'
        ])
    },
    methods: {
      submit() {
        var info = {
          username: this.info.username,
          password: this.info.password
        }
        console.log("LoginVue submit---")
        console.log(this.$store)
        /* this.$store.getters.authenticated (state暴露), this.$store.getters.checkAuthenticated (getters暴露)*/
        console.log(this.$store.state.login.authenticated)
        console.log(this.checkAuthenticated);
        auth.login(this,info)
      },
      changeLoginState() {
        // 触发actions事件  action位于 store/modules/login.js的action方法
        this.$store.dispatch('changeLoginStateSuccess')
      }
    }
}
</script>
