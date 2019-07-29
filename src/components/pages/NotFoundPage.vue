<template>
  <div>
    <ex-header class="header"></ex-header>
    <div>404 Not Found</div>
  </div>
</template>

<script>
  import {ACTION} from "./../../actions";
  import ExHeader from "../organisms/ExHeader";

  export default {
    components: {ExHeader},
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

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
</style>
