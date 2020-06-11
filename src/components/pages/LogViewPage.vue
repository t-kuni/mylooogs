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

      <div class="tool-area">
        <div class="container md-layout md-alignment-center-right">
          <md-button class="md-icon-button md-raised md-primary" @click="onClickPrev">
            <md-icon>navigate_before</md-icon>
          </md-button>
          <md-button class="md-icon-button md-raised md-primary" @click="onClickNext">
            <md-icon>navigate_next</md-icon>
          </md-button>
        </div>
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
        vm.reloadLog();
      });
    },
    beforeRouteUpdate (to, from, next) {
      this.reloadLog();
      next()
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
      logs() {
        return this.$store.state[STATE.LOGS];
      },
      baseID() {
        return this.$route.query.baseID;
      },
    },
    methods   : {
      findLogIndex() {
        return new Promise((resolve, reject) => {
          const p = Promise.resolve();

          if (this.logs.length === 0) {
            p.then(this.$store.dispatch(ACTION.LOAD_LOGS));
          }

          p.then(async () => {
            for (let i = 0; i < this.logs.length; i++) {
              if (this.logs[i].id === this.logID) {
                resolve(i);
                return;
              }
            }
            reject('log index not found');
          });

          return p;
        });
      },
      reloadLog() {
        this.isLoading = true;

        return this.$store.dispatch(ACTION.LOAD_LOG_BODY, {
          logID: this.logID,
        }).then(() => {
          this.isLoading = false;

          // ストアから状態を取り込む
          this.date = this.$store.state[STATE.LOG_VIEW_PAGE_LOG_DATE];
        })
      },
      async onClickNext() {
        const i = await this.findLogIndex();
        const nextLogID = this.logs[i+1].id;
        this.$router.replace({ name: 'log_view', params: { logID: nextLogID }});
      },
      async onClickPrev() {
        const i = await this.findLogIndex();
        const nextLogID = this.logs[i-1].id;
        this.$router.replace({ name: 'log_view', params: { logID: nextLogID }});
      },
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

  .tool-area {
    padding: 10px;
    position: fixed;
    bottom: 0;
    width: 100%;
    z-index: 10;
    pointer-events: none;

    button {
      pointer-events: auto;
    }
  }
</style>
