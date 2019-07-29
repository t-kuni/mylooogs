<template>
  <div>
    <div>mylooogs</div>
    <button @click="onClickStart">利用開始</button>
  </div>
</template>

<script>
  import {ACTION} from "./../../actions";

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
      onClickStart() {
        console.log(this.$store.actions);
        this.$store.dispatch(ACTION.SIGN_IN, {});
      },
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
</style>
