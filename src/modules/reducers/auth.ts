import { createReducer } from 'typesafe-actions';
import produce from 'immer';

import { AuthAction, AuthType } from 'modules/types/auth';
import * as actions from 'modules/actions/auth';

// 상태
const initialState: AuthType = {
  login: {
    fetching: false,
    error: false,
  },
  logout: {
    fetching: false,
    error: false,
  },
  checkLogin: {
    fetching: false,
    error: false,
  },
  userInfo: {
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
      draft.login.fetching = true;
      draft.login.error = false;
    });
  },
  [actions.SUCCESS_LOGIN]: (state, action) => {
    return produce(state, (draft) => {
      draft.login.fetching = false;
      draft.login.error = false;
      draft.userInfo = action.payload;
    });
  },
  [actions.FAILURE_LOGIN]: (state, action) => {
    return produce(state, (draft) => {
      draft.login.fetching = false;
      draft.login.error = action.payload;
    });
  },
  [actions.REQUEST_CHECK_LOGIN]: (state, action) => {
    return produce(state, (draft) => {
      draft.checkLogin.fetching = true;
      draft.checkLogin.error = false;
    });
  },
  [actions.SUCCESS_CHECK_LOGIN]: (state, action) => {
    return produce(state, (draft) => {
      draft.checkLogin.fetching = false;
      draft.checkLogin.error = false;
      draft.userInfo = action.payload;
    });
  },
  [actions.FAILURE_CHECK_LOGIN]: (state, action) => {
    return produce(state, (draft) => {
      draft.checkLogin.fetching = false;
      draft.checkLogin.error = action.payload;
    });
  },
  [actions.REQUEST_LOGOUT]: (state, action) => {
    return produce(state, (draft) => {
      draft.logout.fetching = true;
      draft.logout.error = false;
    });
  },
  [actions.SUCCESS_LOGOUT]: (state, action) => {
    return produce(state, (draft) => {
      draft.logout.fetching = false;
      draft.logout.error = false;
      draft.userInfo = initialState.userInfo;
    });
  },
  [actions.FAILURE_LOGOUT]: (state, action) => {
    return produce(state, (draft) => {
      draft.logout.fetching = false;
      draft.logout.error = action.payload;
    });
  },
});

export default authReducer;
