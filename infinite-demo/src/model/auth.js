const SERVER_URL = 'http://localhost:3000/users'
const LOGIN_URL = SERVER_URL + '/login'

import axios from 'axios'
import {
  mapGetters,
  mapActions
} from 'vuex'

export default {
  data: {
  },
  login(context, info) {
    axios.post(LOGIN_URL, {
          info
        }/*,
        // `headers` are custom headers to be sent 
        {
            headers: { 'X-Requested-With': 'XMLHttpRequest' }
        }*/
      )
      .then(function(response) {
        console.log(response);
        // console.log(data.bodyText)
        localStorage.setItem('token', response.data.result);

        //context.$store.state.login.authenticated = true;  //直接修改  不推荐但是简单

        // 事件传递 通知改变状态
        context.$store.dispatch("changeLoginStateSuccess");

        //跳到home页
        context.$router.push('home')
      })
      .catch(function(error) {
        console.log(error);
        context.error = err.body.message
      });
    //这里使用的vue-resource
    /*
    context.$http.post(LOGIN_URL, info).then(function(data) {
      console.log(data.bodyText)
      localStorage.setItem('token', data.bodyText);
      this.authenticated = true
        //跳到home页
      this.$router.push('home')
    }, function(err) {
      console.log(err + "," + err.body.message)
      context.error = err.body.message
    }) */
  },
  getAuthHeader() {
    return {
      'Authorization': 'Bearer ' + localStorage.getItem('token')
    }
  },
  checkAuth(context) {
    console.log("Auth:检查token: ")
    var token = localStorage.getItem('token')
    if (token) {
      context.$store.dispatch("changeLoginStateSuccess");
    } else {
      context.$store.dispatch("changeLoginStateFailure");
    }
  }
}
