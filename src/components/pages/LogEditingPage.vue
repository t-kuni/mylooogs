<template>
  <div>
    <div>mylooogs 編集画面</div>

    <div class="container" v-for="field in fields" :key="field.no">
      <template v-if="field.isDefining">
        <b-field label="項目名">
          <b-input maxlength="200" type="text" v-model="field.title"></b-input>
        </b-field>
        <div class="level">
          <div class="level-left"></div>
          <div class="level-right">
            <div class="level-item">
                  <b-button type="is-light" @click="onCancelDefinition(field.no)">キャンセル</b-button>
            </div>
            <div class="level-item">
              <b-button type="is-success" @click="onClickDefine(field.no)">確定</b-button>
            </div>
          </div>
        </div>
      </template>
      <template v-else>
        <b-field :label="field.title">
          <b-input maxlength="200" type="textarea" v-model="field.payload.value"></b-input>
        </b-field>
      </template>
    </div>

    <div class="container">
      <b-button type="is-primary" outlined @click="onClickAddField">追加</b-button>
    </div>

    <div>
      <b-button type="is-primary" @click="onClickSave">保存</b-button>
    </div>
  </div>
</template>

<script>

  import BField from "buefy/src/components/field/Field.vue";
  import BInput from "buefy/src/components/input/Input.vue";
  import BButton from "buefy/src/components/button/Button.vue";
  import {ACTION} from '../../actions'
  import {STATE} from '../../state'

  export default {
    components: {BButton, BInput, BField},
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
      return {
      }
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

          field.payload = {
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
          logID: this.logID,
        })
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
  .field {
    border: 1px solid #555;
  }
</style>
