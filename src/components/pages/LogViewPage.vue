<template>
  <div>
    <ex-header class="header"></ex-header>

    <template v-if="!isLoading">
      <div class="container">
        {{date}}
      </div>

      <div class="container">
        <md-card v-for="field in fields" :key="field.no">
          <md-card-header>
            <div class="md-title">{{field.title}}</div>
          </md-card-header>

          <md-card-content class="field-body">
            {{field.payload.value}}
          </md-card-content>
        </md-card>
      </div>
    </template>

    <template v-else>
      <div class="container">
        通信中・・・
      </div>
    </template>
  </div>
</template>

<script>

  import BInput from "buefy/src/components/input/Input.vue";
  import {ACTION} from '../../actions'
  import {STATE} from '../../state'
  import {MUTATION} from '../../mutations'
  import ExHeader from "../organisms/ExHeader";

  export default {
    components: {ExHeader, BInput},
    mounted() {
    },
    beforeRouteEnter(to, from, next) {
      next((vm) => {
        vm.isLoading = true;

        vm.$store.dispatch(ACTION.LOAD_LOG_BODY, {
          logID: vm.logID,
        }).then(() => {
          vm.isLoading = false;

          // ストアから状態を取り込む
          vm.date = vm.$store.state[STATE.LOG_VIEW_PAGE_LOG_DATE];
        })
      });
    },
    props     : {},
    data      : function () {
      return {
        isLoading: false,
        date     : null,
      }
    },
    computed  : {
      logID() {
        if (!this.hasLogID) {
          return null;
        }

        return this.$route.params.logID;
      },
      hasLogID() {
        return 'logID' in this.$route.params
          && this.$route.params.logID !== null
          && this.$route.params.logID.length > 0
      },
      fields() {
        return this.$store.state[STATE.LOG_VIEW_PAGE_LOG].fields;
      },
      hasBaseID() {
        return 'baseID' in this.$route.query
          && this.$route.query.baseID !== null
          && this.$route.query.baseID.length > 0
      },
      baseID() {
        return this.$route.query.baseID;
      }
    },
    methods   : {
    }
  }
</script>

<style scoped lang="scss">
  @import "../../scss/variables";

  .header {
    margin-top: 1rem;
    margin-left: 1rem;
  }

  .field-body {
    white-space: pre-line
  }
</style>
