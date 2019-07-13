import {STATE} from "./state";

export const MUTATION = {
  PUSH_LOGS: 'push_logs',
};

export default {
  [MUTATION.PUSH_LOGS]: (state, payload) => {
    state[STATE.LOGS] = state[STATE.LOGS].concat(payload.files);
  },
}
