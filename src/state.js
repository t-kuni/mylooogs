export const STATE = {
  LOGS: 'logs',

  LOG_EDITING_PAGE_LOG: 'log_editing_page_log',
  LOG_EDITING_PAGE_LOG_DATE: 'log_editing_page_log_date',
};

export const defaultState = {
  [STATE.LOGS]: [],

  [STATE.LOG_EDITING_PAGE_LOG]: {
    fields: [],
  },
  [STATE.LOG_EDITING_PAGE_LOG_DATE]: null,
};
