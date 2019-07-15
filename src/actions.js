import {MUTATION} from "./mutations";
import {STATE} from "./state";
import api from './api';
import router from './router'

export const ACTION = {
  INIT_APP: 'init_app',

  SIGN_IN : 'sign_in',
  SIGN_OUT: 'sign_out',

  SIGN_IN_COMPLETED : 'sign_in_completed',
  SIGN_OUT_COMPLETED: 'sign_out_completed',

  SAVE_LOG: 'save_log',
  LOAD_LOGS: 'load_logs',

  LOAD_LOG_BODY: 'load_log_body',
};

export default {
  [ACTION.INIT_APP]: ({commit, getters, state, dispatch}, payload) => {

  },

  [ACTION.SIGN_IN]: ({commit, getters, state}, payload) => {
    return gapi.auth2.getAuthInstance().signIn();
  },

  [ACTION.SIGN_OUT]: ({commit, getters, state}, payload) => {
    return gapi.auth2.getAuthInstance().signOut();
  },

  [ACTION.SIGN_IN_COMPLETED]: ({commit, getters, state, dispatch}, payload) => {
  },

  [ACTION.SIGN_OUT_COMPLETED]: ({commit, getters, state}, payload) => {
    router.push('/');
  },

  [ACTION.SAVE_LOG]: ({commit, getters, state}, payload) => {
    const fields = payload.fields;
    const logID = 'logID' in payload ? payload.logID : null;

    api.saveLog({
      createdAt: (new Date()).toISOString(),
      fields,
    }, logID);
  },

  [ACTION.LOAD_LOGS]: ({commit, getters, state}, payload) => {
    api.loadLogs().then((response) => {
      console.log(response);
      commit(MUTATION.PUSH_LOGS, {
        files: response.result.files
      })
    });
  },

  [ACTION.LOAD_LOG_BODY]: ({commit, getters, state}, payload) => {
    const logID = payload.logID;

    return api.loadLog(logID).then((response) => {
      commit(MUTATION.SET_LOG_EDITING_PAGE_LOG, {
        log: response.result
      })
    });
  },
}
