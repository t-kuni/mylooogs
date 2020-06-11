import {MUTATION} from "./mutations";
import api from './api';

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
    commit(MUTATION.SET_SIGN_IN_FLAG, {
      signedIn: true,
    });
  },

  [ACTION.SIGN_OUT_COMPLETED]: ({commit, getters, state}, payload) => {
    commit(MUTATION.SET_SIGN_IN_FLAG, {
      signedIn: false,
    });
  },

  [ACTION.SAVE_LOG]: ({commit, getters, state}, payload) => {
    const fields = payload.fields;
    const logID = 'logID' in payload ? payload.logID : null;
    const date = payload.date;

    const log = {
      createdAt: (new Date()).toISOString(),
      fields,
      date: date.toISOString(),
    };

    const properties = {
      date: date.toISOString(),
    };

    api.saveLog(log, properties, logID);
  },

  [ACTION.LOAD_LOGS]: ({commit, getters, state}, payload) => {
    return api.loadLogs().then((response) => {
      console.log(response);
      commit(MUTATION.PUSH_LOGS, {
        files: response.result.files
      })
    });
  },

  [ACTION.LOAD_LOG_BODY]: ({commit, getters, state}, payload) => {
    const logID = payload.logID;

    return api.loadLog(logID).then((response) => {
      const log = response.result;

      commit(MUTATION.SET_LOG_EDITING_PAGE_LOG, {
        log,
      });
      commit(MUTATION.SET_LOG_VIEW_PAGE_LOG, {
        log,
      });

      commit(MUTATION.SET_LOG_EDITING_PAGE_LOG_DATE, {
        date: ('date' in log) ? new Date(log.date) : null,
      });
      commit(MUTATION.SET_LOG_VIEW_PAGE_LOG_DATE, {
        date: ('date' in log) ? new Date(log.date) : null,
      });
    });
  },
}
