import produce from 'immer';
import _ from 'lodash';
import { createReducer } from 'typesafe-actions';

import * as actions from 'modules/actions/auth';
import { AuthAction, AuthState } from 'types/auth';

// 상태
const initialState: AuthState = {
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
    changePassword: {
      fetch: false,
      error: '',
    },
  },
  loginInfo: {
    id: 0,
    branch_id: 0,
    team_id: 0,
    branch_name: '',
    team_name: '',
    admin_id: 0,
    name: '',
    user_name: '',
    login_at: 0,
    is_init_password: false,
    is_expired_password: false,
  },
  tappingStatus: 0,
  tappingTarget: {
    id: -1,
    ip: '',
    number: '',
  },
  socketConnectionStatus: 0,
  localTime: 0,
  serverTime: 0,
};

// 리듀서
const authReducer = createReducer<AuthState, AuthAction>(initialState, {
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
  [actions.REQUEST_CHANGE_PASSWORD]: (state, action) => {
    return produce(state, (draft) => {
      draft.request.changePassword.fetch = true;
      draft.request.changePassword.error = '';
    });
  },
  [actions.SUCCESS_CHANGE_PASSWORD]: (state, action) => {
    return produce(state, (draft) => {
      draft.request.changePassword.fetch = false;
      draft.request.changePassword.error = '';
    });
  },
  [actions.FAILURE_CHANGE_PASSWORD]: (state, action) => {
    return produce(state, (draft) => {
      draft.request.changePassword.fetch = false;
      draft.request.changePassword.error = action.payload;
    });
  },
  /**
   * @description 수정 예정
   */
  [actions.SET_SOCKET_STATUS]: (state, action) => {
    return produce(state, (draft) => {
      const status = action.payload;
      draft.socketConnectionStatus = status;
    });
  },
  [actions.SET_TAPPING_DATA]: (state, action) => {
    return produce(state, (draft) => {
      const targetData = _.cloneDeep(action.payload);

      draft.tappingStatus = targetData.status;

      if (targetData.id) {
        draft.tappingTarget.id = targetData.id!;
        draft.tappingTarget.ip = targetData.ip!;
        draft.tappingTarget.number = targetData.number!;
      }
    });
  },
  [actions.SET_SERVER_TIME]: (state, action) => {
    return produce(state, (draft) => {
      const timestamp = action.payload;
      draft.serverTime = timestamp;
      draft.localTime = new Date().getTime();
    });
  },
});

export default authReducer;
