<template>
  <div>
    <header>
      <div class="container">
        <router-link to="/">
          <h1>
            <i class="fas fa-book"></i>
            <span class="app-name">mylooogs</span>
          </h1>
        </router-link>
      </div>
    </header>
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
      return {}
    },
    computed  : {
    },
    methods   : {}
  }
</script>

<style scoped lang="scss">
  @import "../../scss/variables";

  h1 {
    font-size: $font-size-large;
    vertical-align: middle;
  }

  .app-name {
    margin-left: 1rem;
  }
</style>
