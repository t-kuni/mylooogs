<template>
  <div>
    <div>mylooogs 一覧</div>
    <div v-for="log in logs">
      <div>{{log.name}}</div>
    </div>
    <router-link to="edit">新規</router-link>
  </div>
</template>

<script>
  import {ACTION} from "./../../actions";
  import {STATE} from "./../../state";

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
      logs() {
        return this.$store.state[STATE.LOGS];
      }
    },
    methods   : {
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
</style>
