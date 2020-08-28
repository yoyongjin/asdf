import { createReducer } from 'typesafe-actions';
import produce from 'immer';

import { AuthAction, AuthType } from 'modules/types/auth';
import * as actions from 'modules/actions/auth';

// 상태
const initialState: AuthType = {
  request: {
    login: {
      fetch: false,
      error: false,
    },
    logout: {
      fetch: false,
      error: false,
    },
    checkLogin: {
      fetch: false,
      error: false,
    },
  },
  loginInfo: {
    id: 0,
    admin_id: 0,
    branch_id: 0,
    team_id: '',
    name: '',
    number: '',
    ziboxip: '',
    login_at: 0,
    created_at: '',
    branch_name: '',
  },
};

// 리듀서
const authReducer = createReducer<AuthType, AuthAction>(initialState, {
  [actions.REQUEST_LOGIN]: (state, action) => {
    return produce(state, (draft) => {
      draft.request.login.fetch = true;
      draft.request.login.error = false;
    });
  },
  [actions.SUCCESS_LOGIN]: (state, action) => {
    return produce(state, (draft) => {
      draft.request.login.fetch = false;
      draft.request.login.error = false;
      draft.loginInfo = action.payload;
    });
  },
  [actions.FAILURE_LOGIN]: (state, action) => {
    return produce(state, (draft) => {
      draft.request.login.fetch = false;
      draft.request.login.error = action.payload;
    });
  },
  [actions.REQUEST_CHECK_LOGIN]: (state, action) => {
    return produce(state, (draft) => {
      draft.request.checkLogin.fetch = true;
      draft.request.checkLogin.error = false;
    });
  },
  [actions.SUCCESS_CHECK_LOGIN]: (state, action) => {
    return produce(state, (draft) => {
      draft.request.checkLogin.fetch = false;
      draft.request.checkLogin.error = false;
      draft.loginInfo = action.payload;
    });
  },
  [actions.FAILURE_CHECK_LOGIN]: (state, action) => {
    return produce(state, (draft) => {
      draft.request.checkLogin.fetch = false;
      draft.request.checkLogin.error = action.payload;
    });
  },
  [actions.REQUEST_LOGOUT]: (state, action) => {
    return produce(state, (draft) => {
      draft.request.logout.fetch = true;
      draft.request.logout.error = false;
    });
  },
  [actions.SUCCESS_LOGOUT]: (state, action) => {
    return produce(state, (draft) => {
      draft.request.logout.fetch = false;
      draft.request.logout.error = false;
      draft.loginInfo = initialState.loginInfo;
    });
  },
  [actions.FAILURE_LOGOUT]: (state, action) => {
    return produce(state, (draft) => {
      draft.request.logout.fetch = false;
      draft.request.logout.error = action.payload;
    });
  },
});

export default authReducer;
