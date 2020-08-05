import { createReducer } from 'typesafe-actions';
import produce from 'immer';

import { AuthAction, AuthType } from 'modules/types/auth';
import * as actions from 'modules/actions/auth';

// 상태
const initialState: AuthType = {
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
  loginInfo: {
    id: 0,
    admin_id: '',
    branch_id: 0,
    team_id: '',
    name: '',
    number: '',
    ziboxip: '',
    login_at: 0,
    created_at: '',
  },
};

// 리듀서
const authReducer = createReducer<AuthType, AuthAction>(initialState, {
  [actions.REQUEST_LOGIN]: (state, action) => {
    return produce(state, (draft) => {
      draft.login.fetch = true;
      draft.login.error = false;
    });
  },
  [actions.SUCCESS_LOGIN]: (state, action) => {
    return produce(state, (draft) => {
      draft.login.fetch = false;
      draft.login.error = false;
      draft.loginInfo = action.payload;
    });
  },
  [actions.FAILURE_LOGIN]: (state, action) => {
    return produce(state, (draft) => {
      draft.login.fetch = false;
      draft.login.error = action.payload;
    });
  },
  [actions.REQUEST_CHECK_LOGIN]: (state, action) => {
    return produce(state, (draft) => {
      draft.checkLogin.fetch = true;
      draft.checkLogin.error = false;
    });
  },
  [actions.SUCCESS_CHECK_LOGIN]: (state, action) => {
    return produce(state, (draft) => {
      draft.checkLogin.fetch = false;
      draft.checkLogin.error = false;
      draft.loginInfo = action.payload;
    });
  },
  [actions.FAILURE_CHECK_LOGIN]: (state, action) => {
    return produce(state, (draft) => {
      draft.checkLogin.fetch = false;
      draft.checkLogin.error = action.payload;
    });
  },
  [actions.REQUEST_LOGOUT]: (state, action) => {
    return produce(state, (draft) => {
      draft.logout.fetch = true;
      draft.logout.error = false;
    });
  },
  [actions.SUCCESS_LOGOUT]: (state, action) => {
    return produce(state, (draft) => {
      draft.logout.fetch = false;
      draft.logout.error = false;
      draft.loginInfo = initialState.loginInfo;
    });
  },
  [actions.FAILURE_LOGOUT]: (state, action) => {
    return produce(state, (draft) => {
      draft.logout.fetch = false;
      draft.logout.error = action.payload;
    });
  },
});

export default authReducer;
