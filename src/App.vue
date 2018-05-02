<template>
  <div id="app" class="app">
    <auth-layout v-if="!loggedIn"></auth-layout>
    <layout v-else></layout>
  </div>
</template>

<script>
  import {mapGetters} from 'vuex'
  import Layout from 'components/layout/Layout'
  import VuesticPreLoader from './components/vuestic-components/vuestic-preloader/VuesticPreLoader.vue'
  import AuthLayout from './components/layout/AuthLayout'
  import store from 'vuex-store'
  let loggedIn = store.getters.loggedIn

  export default {
    name: 'app',
    components: {
      VuesticPreLoader,
      AuthLayout,
      Layout
    },
    computed: { 
      ...mapGetters([
        'loggedIn'
      ])
    }
  }
</script>

<style lang="scss">
  @import "sass/main";
  body {
    height: 100%;
    .app {
      height: 100%;
    }
  }
</style>
