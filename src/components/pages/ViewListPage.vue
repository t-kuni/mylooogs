<template>
  <div>
    <ex-header class="header"></ex-header>

    <main>
      <div class="container" v-for="log in logs" :key="log.id">
        <router-link :to="{ name: 'log_view', params: { logID: log.id }}">
          <div class="card">
            <div class="card-content">
              <div class="content">
                {{takeDate(log)}}
              </div>
            </div>
          </div>
        </router-link>
      </div>
    </main>

    <div class="tool-area">
      <div class="container">
        <router-link :to="{ name: 'log_creating', query: { baseID: latestLogID }}" class="create-button is-pulled-right">
          <i class="fas fa-plus"></i>
        </router-link>
      </div>
    </div>

    <div class="footer-link-area md-layout">
      <div class="md-layout-item">
        <md-bottom-bar md-sync-route>
          <div class="md-layout md-alignment-center">
            <md-bottom-bar-item class="md-size-50" to="/list" exact md-label="編集" md-icon="create"></md-bottom-bar-item>
            <md-bottom-bar-item class="md-size-50" to="/view-list" md-label="閲覧" md-icon="pageview"></md-bottom-bar-item>
          </div>
        </md-bottom-bar>
      </div>
    </div>
  </div>
</template>

<script>
  import {ACTION} from "./../../actions";
  import {STATE} from "./../../state";
  import ExHeader from "../organisms/ExHeader";

  export default {
    components: {ExHeader},
    mounted() {
    },
    beforeRouteEnter(to, from, next) {
      next((vm) => {
        vm.$store.dispatch(ACTION.LOAD_LOGS);
      });
    },
    beforeRouteUpdate(to, from, next) {
      next();
      this.$store.dispatch(ACTION.LOAD_LOGS);
    },
    props     : {},
    data      : function () {
      return {}
    },
    computed  : {
      logs() {
        return this.$store.state[STATE.LOGS];
      },
      latestLogID() {
        if (this.$store.state[STATE.LOGS].length === 0) {
          return null;
        }

        return this.$store.state[STATE.LOGS][0].id;
      }
    },
    methods   : {
      takeDate(log) {
        const emptyDate = '--年 --月 --日 (--)';

        if (
          !('properties' in log)
          || log.properties === null
          || !('date' in log.properties)
          || log.properties.date === null
        ) {
          return emptyDate;
        }

        const date = new Date(log.properties.date);
        const y = date.getFullYear();
        const m = date.getMonth() + 1;
        const d = date.getDate();
        const dow = date.getDay();
        const dowStr = [ "日", "月", "火", "水", "木", "金", "土" ][dow];

        return `${y}年 ${m}月 ${d}日 (${dowStr})`;
      }
    }
  }
</script>

<style scoped lang="scss">
  @import "../../scss/variables";

  .header {
    margin-top: 1rem;
    margin-left: 1rem;
  }

  main {
    margin-top: 1rem;
  }

  .content {
    font-size: $font-size-medium;
  }

  .tool-area {
    position: fixed;
    bottom: 0;
    width: 100%;

    .create-button {
      $size: 80px;

      width: $size;
      height: $size;
      line-height: $size;
      border-radius: 50%;
      background-color: #FF3636;
      color: white;
      font-size: 2rem;
      text-align: center;

      margin-bottom: 1rem;
      margin-right: 1rem;
    }
  }

  .footer-link-area {
    position: fixed;
    bottom: 0;
    width: 100%;

    border-top: 1px solid #000;
    background-color: white;
  }
</style>
