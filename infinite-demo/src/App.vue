<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
import auth from './model/auth'
export default {
  name: 'app',
  beforeCreate() {
    //在启动APP时进行校验是否有token
    auth.checkAuth(this)
  }
}
</script>

<style>
</style>
