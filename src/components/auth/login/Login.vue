<template>
  <div class="login">
    <h2>Welcome!</h2>
    <div>
      <div class="form-group">
        <div class="input-group">
          <input type="text" id="email" v-model = "username" required="required"/>
          <label class="control-label" for="email">Email</label><i class="bar"></i>
        </div>
      </div>
      <div class="form-group">
        <div class="input-group">
          <input type="password" id="password" v-model = "password" required="required"/>
          <label class="control-label" for="password">Password</label><i class="bar"></i>
        </div>
      </div>
      <div class="d-flex flex-column flex-lg-row align-items-center justify-content-between down-container">
        <button class="btn btn-primary" v-on:click="login()">
          Log In
        </button>
      </div>
    </div>
  </div>
</template>

<script>
  
  import axios from 'axios'
  import store from 'vuex-store'
  let server = store.getters.server
  let loggedIn = store.getters.loggedIn
  export default {
    name: 'login',
    data:function(){
      return{
        messages: [],
        password: '',
        username: ''
      }
    },
    
    methods:{
        login:function(){
            let vm = this;
            let data = {
                email: this.username,
                password: this.password
            }
            axios.defaults.withCredentials = true
            axios.post(server + '/login', data).then(function(res){
              console.log(res)
              store.commit('setLoggedIn', true)
            })

        }
    }
  }
</script>

<style lang="scss">
  @import '../../../sass/variables';
  @import '../../../../node_modules/bootstrap/scss/mixins/breakpoints';
  @import '../../../../node_modules/bootstrap/scss/variables';
  .login {
    @include media-breakpoint-down(md) {
      width: 100%;
      padding-right: 2rem;
      padding-left: 2rem;
      .down-container {
        .link {
          margin-top: 2rem;
        }
      }
    }

    h2 {
      text-align: center;
    }
    width: 21.375rem;

    .down-container {
      margin-top: 3.125rem;
    }
  }
</style>
