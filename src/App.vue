<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
  import {ACTION} from "./actions";

  export default {
    components: {},
    mounted() {
    },
    props     : {},
    data      : function () {
      return {
      }
    },
    computed  : {
    },
    methods   : {
    }
  }
</script>

<style scoped lang="scss">
  #app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
  }
</style>
