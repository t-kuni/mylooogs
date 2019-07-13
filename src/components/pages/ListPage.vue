<template>
  <div>
    <div>mylooogs 一覧</div>
    <div v-for="log in logs" :key="log.id">
      <router-link :to="{ name: 'log_editing', params: { logId: log.id }}">{{log.name}}</router-link>
    </div>
    <router-link :to="{ name: 'log_creating' }">新規</router-link>
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
