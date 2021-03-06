<template>
  <div>
    <ex-header class="header"></ex-header>

    <template v-if="!isLoading">
      <main>

        <!-- 日付 -->
        <div class="container">
          <b-field label="日付">
            <b-datepicker
              placeholder="Click to select..."
              icon="calendar-today"
              v-model="date"
            >
            </b-datepicker>
          </b-field>
        </div>

        <div class="container" v-for="field in fields" :key="field.no">

          <!-- 定義編集中 -->
          <template v-if="field.isDefining">
            <div class="card">
              <header class="card-header">
                <p class="card-header-title">
                  <b-input placeholder="項目名" maxlength="200" type="text" expanded v-model="field.title"></b-input>
                </p>
              </header>
              <footer class="card-footer">
                <a class="card-footer-item" @click="onCancelDefinition(field.no)">キャンセル</a>
                <a class="card-footer-item" @click="onClickEditDefinitionComplete(field.no)">確定</a>
              </footer>
            </div>
          </template>

          <!-- 定義確定後 -->
          <template v-else>
            <div class="card">
              <header class="card-header">
                <p class="card-header-title">
                  {{field.title}}
                </p>
              </header>
              <div class="card-content">
                <div class="content">
                  <b-input rows="6" type="textarea" v-model="field.payload.value"></b-input>
                </div>
              </div>
              <footer class="card-footer">
                <a class="card-footer-item" @click="onClickDelete(field.no)">削除</a>
                <a class="card-footer-item" @click="onClickClear(field.no)">クリア</a>
                <a class="card-footer-item" @click="onClickEditDefinition(field.no)">定義変更</a>
              </footer>
            </div>
          </template>
        </div>
      </main>

      <div class="container add-field-button-area">
        <div class="button" @click="onClickAddField">
          <i class="fas fa-plus-circle"></i>
          追加
        </div>
      </div>

      <div class="tool-area">
        <div class="container">
          <div class="save-button is-pulled-right" @click="onClickSave">
            <i class="far fa-save"></i>
          </div>
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
        vm.isLoading = true;

        if (vm.hasLogID) { // 既存のログの修正
          vm.$store.dispatch(ACTION.LOAD_LOG_BODY, {
            logID: vm.logID,
          }).then(() => {
            vm.isLoading = false;

            // ストアから状態を取り込む
            vm.date = vm.$store.state[STATE.LOG_EDITING_PAGE_LOG_DATE];
          })
        } else if (vm.hasBaseID) { // 新規作成（既存のログをクローン）
          vm.$store.dispatch(ACTION.LOAD_LOG_BODY, {
            logID: vm.baseID,
          }).then(() => {
            vm.isLoading = false;

            // ストアから状態を取り込む
            vm.date = new Date();
          })
        } else { // 新規作成
          vm.$store.commit(MUTATION.SET_LOG_EDITING_PAGE_LOG, {
            log: {
              fields: [],
            }
          });
          vm.$store.commit(MUTATION.SET_LOG_EDITING_PAGE_LOG_DATE, {
            date: new Date(),
          });
          vm.isLoading = false;

          // ストアから状態を取り込む
          vm.date = vm.$store.state[STATE.LOG_EDITING_PAGE_LOG_DATE];
        }
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
        return this.$store.state[STATE.LOG_EDITING_PAGE_LOG].fields;
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
      onClickAddField() {
        this.$store.commit(MUTATION.ADD_FIELD);
      },
      onClickEditDefinitionComplete(no) {
        this.$store.commit(MUTATION.EDIT_FIELD_DEFINITION_COMPLETE, {
          no,
        })
      },
      onCancelDefinition(no) {
        this.$store.commit(MUTATION.CANCEL_FIELD_DEFINITION_EDITING, {
          no,
        })
      },
      onClickSave() {
        if (!this.validate()) {
          return;
        }

        return this.$store.dispatch(ACTION.SAVE_LOG, {
          fields: this.fields,
          logID : this.logID,
          date : this.date,
        }).then(() => {
          this.$router.push('/list')
        });
      },
      onClickDelete(no) {
        this.$store.commit(MUTATION.REMOVE_FIELD, {
          no,
        })
      },
      onClickClear(no) {
        this.$store.commit(MUTATION.CLEAR_FIELD, {
          no,
        })
      },
      onClickEditDefinition(no) {
        this.$store.commit(MUTATION.EDIT_FIELD_DEFINITION, {
          no,
        })
      },
      validate() {
        if (this.date === null) {
          this.$toast.open({
            message: '日付は必須です',
            position: 'is-bottom',
            type: 'is-danger'
          });

          return false;
        }

        return true;
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
  }

  .card {
    margin-top: 1rem;
  }

  .field {
    border: 1px solid #555;
  }

  .add-field-button-area {
    margin-top: 1rem;
    margin-bottom: 1rem;

    .button {
      display: block;
    }
  }

  .tool-area {
    position: fixed;
    bottom: 0;
    width: 100%;
    pointer-events: none;

    .save-button {
      $size: 80px;

      width: $size;
      height: $size;
      line-height: $size;
      border-radius: 50%;
      background-color: #FF3636;
      color: white;
      font-size: 2rem;
      text-align: center;
      cursor: pointer;

      margin-bottom: 1rem;
      margin-right: 1rem;

      pointer-events: auto;
    }
  }
</style>
