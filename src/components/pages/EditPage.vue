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

  export default {
    components: {BButton, BInput, BField},
    mounted() {
    },
    props     : {},
    data      : function () {
      return {
        fields: [
          {
            no     : 1,
            type   : 'text',
            title  : 'プライベート',
            payload: {
              value: '文章文章文章文章文章文章文章文章文章文章文章文章文章文章',
            }
          },
          {
            no        : 2,
            isDefining: true,
            type      : 'text',
            title     : null,
          }
        ]
      }
    },
    computed  : {},
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
