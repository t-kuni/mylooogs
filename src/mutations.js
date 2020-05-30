import {STATE} from "./state";

export const MUTATION = {
  SET_SIGN_IN_FLAG: 'set_sign_in_flag',

  PUSH_LOGS: 'push_logs',

  SET_LOG_EDITING_PAGE_LOG     : 'set_log_editing_page_log',
  SET_LOG_EDITING_PAGE_LOG_DATE: 'set_log_editing_page_log_date',

  SET_LOG_VIEW_PAGE_LOG     : 'set_log_view_page_log',
  SET_LOG_VIEW_PAGE_LOG_DATE: 'set_log_view_page_log_date',

  REMOVE_FIELD                   : 'remove_field',
  CLEAR_FIELD                    : 'clear_field',
  ADD_FIELD                      : 'add_field',
  EDIT_FIELD_DEFINITION_COMPLETE : 'edit_field_definition_complete',
  CANCEL_FIELD_DEFINITION_EDITING: 'cancel_field_definition_editing',
  EDIT_FIELD_DEFINITION          : 'edit_field_definition',
};

export default {
  [MUTATION.SET_SIGN_IN_FLAG]: (state, payload) => {
    state[STATE.SIGNED_IN] = payload.signedIn;
  },

  [MUTATION.PUSH_LOGS]: (state, payload) => {
    state[STATE.LOGS] = state[STATE.LOGS].concat(payload.files);
  },

  [MUTATION.SET_LOG_EDITING_PAGE_LOG]: (state, payload) => {
    state[STATE.LOG_EDITING_PAGE_LOG] = payload.log;
  },

  [MUTATION.REMOVE_FIELD]: (state, payload) => {
    const no = payload.no;

    const fields = state[STATE.LOG_EDITING_PAGE_LOG].fields;

    state[STATE.LOG_EDITING_PAGE_LOG].fields = fields.filter((field) => {
      return field.no !== no;
    });
  },

  [MUTATION.CLEAR_FIELD]: (state, payload) => {
    const no = payload.no;

    const fields = state[STATE.LOG_EDITING_PAGE_LOG].fields;

    state[STATE.LOG_EDITING_PAGE_LOG].fields = fields.map((field) => {
      if (field.no !== no) {
        return field;
      }

      field.payload = {
        value: '',
      };

      return field;
    });
  },

  [MUTATION.ADD_FIELD]: (state, payload) => {
    const fields = state[STATE.LOG_EDITING_PAGE_LOG].fields;

    fields.push({
      no        : fields.length > 0 ? fields.length + 1 : 1,
      isCreating: true,
      isDefining: true,
      type      : 'text',
      title     : '',

      // payloadはtypeに応じて変わる想定なので定義不可
      // payload: {
      //   ?
      // }
    });
  },

  [MUTATION.EDIT_FIELD_DEFINITION_COMPLETE]: (state, payload) => {
    const no = payload.no;

    const fields = state[STATE.LOG_EDITING_PAGE_LOG].fields;

    state[STATE.LOG_EDITING_PAGE_LOG].fields = fields.map((field) => {
      if (field.no !== no) {
        return field;
      }

      /*
       * いかに該当する場合、payloadを作り直す
       * ・新しいフィールドを追加する場合
       * ・typeが変わっている
       */
      if (field.isCreating) {
        field.payload = {
          value: '',
        };
      }

      field.isCreating = false;
      field.isDefining = false;

      return field;
    });
  },

  [MUTATION.CANCEL_FIELD_DEFINITION_EDITING]: (state, payload) => {
    const no = payload.no;

    const fields = state[STATE.LOG_EDITING_PAGE_LOG].fields;

    const field = fields.filter((field) => {
      return field.no === no;
    })[0];

    if (field.isCreating) {
      state[STATE.LOG_EDITING_PAGE_LOG].fields = fields.filter((field) => {
        return field.no !== no;
      });
    } else {
      field.isDefining = false;
    }
  },

  [MUTATION.EDIT_FIELD_DEFINITION]: (state, payload) => {
    const no = payload.no;

    const fields = state[STATE.LOG_EDITING_PAGE_LOG].fields;

    state[STATE.LOG_EDITING_PAGE_LOG].fields = fields.map((field) => {
      if (field.no !== no) {
        return field;
      }

      field.isDefining = true;

      return field;
    });
  },

  [MUTATION.SET_LOG_EDITING_PAGE_LOG_DATE]: (state, payload) => {
    state[STATE.LOG_EDITING_PAGE_LOG_DATE] = payload.date;
  },

  [MUTATION.SET_LOG_VIEW_PAGE_LOG]: (state, payload) => {
    state[STATE.LOG_VIEW_PAGE_LOG] = payload.log;
  },

  [MUTATION.SET_LOG_VIEW_PAGE_LOG_DATE]: (state, payload) => {
    state[STATE.LOG_VIEW_PAGE_LOG_DATE] = payload.date;
  },
}
