export const STATE = {
  LOGS: 'logs',

  LOG_EDITING_PAGE_LOG: 'log_editing_page_log',
};

export const defaultState = {
  [STATE.LOGS]: [],

  [STATE.LOG_EDITING_PAGE_LOG]: {
    fields: [],
  },
};
