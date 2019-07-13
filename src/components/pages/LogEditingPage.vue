<template>
  <div>
    <ex-header class="header"></ex-header>

    <main>
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
              <a href="#" class="card-footer-item" @click="onCancelDefinition(field.no)">キャンセル</a>
              <a href="#" class="card-footer-item" @click="onClickDefine(field.no)">確定</a>
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
                <b-input maxlength="200" type="textarea" v-model="field.payload.value"></b-input>
              </div>
            </div>
            <footer class="card-footer">
              <a href="#" class="card-footer-item">Save</a>
              <a href="#" class="card-footer-item">Edit</a>
              <a href="#" class="card-footer-item">Delete</a>
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
        <div class="save-button is-pulled-right">
          <i class="far fa-save" @click="onClickSave"></i>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

  import BField from "buefy/src/components/field/Field.vue";
  import BInput from "buefy/src/components/input/Input.vue";
  import BButton from "buefy/src/components/button/Button.vue";
  import {ACTION} from '../../actions'
  import {STATE} from '../../state'
  import ExHeader from "../organisms/ExHeader";

  export default {
    components: {ExHeader, BButton, BInput, BField},
    mounted() {
    },
    beforeRouteEnter(to, from, next) {
      next((vm) => {
        vm.$store.dispatch(ACTION.LOAD_LOG_BODY, {
          logID: vm.logID,
        })
      });
    },
    props     : {},
    data      : function () {
      return {}
    },
    computed  : {
      logID() {
        return this.$route.params.logID;
      },
      fields() {
        return this.$store.state[STATE.LOG_EDITING_PAGE_LOG].fields;
      }
    },
    methods   : {
      onClickAddField() {
        this.fields.push(this.makeDefaultField())
      },
      makeDefaultField() {
        return {
          no        : this.fields.length > 0 ? this.fields.length + 1 : 1,
          isDefining: true,
          type      : 'text',
          title     : '',
        }
      },
      onClickDefine(no) {
        this.fields = this.fields.map((field) => {
          if (field.no !== no) {
            return field;
          }

          field.payload    = {
            value: '',
          };
          field.isDefining = false;

          return field;
        });
      },

      onCancelDefinition(no) {
        this.fields = this.fields.filter((field) => {
          return field.no !== no;
        });
      },

      onClickSave() {
        this.$store.dispatch(ACTION.SAVE_LOG, {
          fields: this.fields,
          logID : this.logID,
        })
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

    .button {
      display: block;
    }
  }

  .tool-area {
    position: fixed;
    bottom: 0;
    width: 100%;

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
    }
  }
</style>
