import {STATE} from "./state";

export const MUTATION = {
  PUSH_LOGS: 'push_logs',

  SET_LOG_EDITING_PAGE_LOG: 'set_log_editing_page_log',
};

export default {
  [MUTATION.PUSH_LOGS]: (state, payload) => {
    state[STATE.LOGS] = state[STATE.LOGS].concat(payload.files);
  },

  [MUTATION.SET_LOG_EDITING_PAGE_LOG]: (state, payload) => {
    state[STATE.LOG_EDITING_PAGE_LOG] = payload.log;
  },
}
