import { createReducer } from 'typesafe-actions';
import produce, { enableES5 } from 'immer';

import { AuthAction, AuthType } from 'types/auth';
import * as actions from 'modules/actions/auth';

enableES5();

// 상태
const initialState: AuthType = {
  request: {
    login: {
      fetch: false,
      error: '',
    },
    logout: {
      fetch: false,
      error: '',
    },
    checkLogin: {
      fetch: false,
      error: '',
    },
  },
  loginInfo: {
    id: 0,
    admin_id: 0,
    branch_id: 0,
    branch_name: '',
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
      draft.request.login.fetch = true;
    });
  },
  [actions.SUCCESS_LOGIN]: (state, action) => {
    return produce(state, (draft) => {
      draft.request.login.fetch = false;
      draft.loginInfo = action.payload;

      if (state.request.login.error) {
        draft.request.login.error = '';
      }
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
    });
  },
  [actions.SUCCESS_CHECK_LOGIN]: (state, action) => {
    return produce(state, (draft) => {
      draft.request.checkLogin.fetch = false;
      draft.loginInfo = action.payload;

      if (state.request.checkLogin.error) {
        draft.request.checkLogin.error = '';
      }
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
    });
  },
  [actions.SUCCESS_LOGOUT]: (state, action) => {
    return produce(state, (draft) => {
      draft.request.logout.fetch = false;
      draft.loginInfo = initialState.loginInfo;

      if (state.request.logout.error) {
        draft.request.logout.error = '';
      }
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
