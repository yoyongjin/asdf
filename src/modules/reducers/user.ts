import { createReducer } from 'typesafe-actions';
import produce from 'immer';

import { UserAction, UserType } from 'modules/types/user';
import * as types from 'modules/actions/user';
import { getDiffTime } from 'utils/utils';

const initialState: UserType = {
  consultant: {
    fetch: false,
    error: false,
  },
  insertUser: {
    fetch: false,
    error: false,
  },
  updateUser: {
    fetch: false,
    error: false,
  },
  deleteUser: {
    fetch: false,
    error: false,
  },
  consultantInfo: [],
  numberOfUsers: 0,
};

const userReducer = createReducer<UserType, UserAction>(initialState, {
  [types.REQUEST_GET_USER_INFO]: (state, action) => {
    return produce(state, (draft) => {
      draft.consultant.fetch = true;
      draft.consultant.error = false;
    });
  },
  [types.SUCCESS_GET_USER_INFO]: (state, action) => {
    return produce(state, (draft) => {
      console.log(action);
      draft.consultant.fetch = false;
      draft.consultant.error = false;
      draft.consultantInfo = action.payload.users;
      draft.numberOfUsers = action.payload.count;
    });
  },
  [types.FAILURE_GET_USER_INFO]: (state, action) => {
    return produce(state, (draft) => {
      draft.consultant.fetch = false;
      draft.consultant.error = true;
    });
  },
  [types.RUN_TIMER]: (state, action) => {
    return produce(state, (draft) => {
      state.consultantInfo.map((consultant, i) => {
        if (consultant.call_type === 'call_offhook' && consultant.call_time) {
          draft.consultantInfo[i].diff = getDiffTime(consultant.call_time);
        }
      });
    });
  },
  [types.REQUEST_ADD_USER]: (state, action) => {
    return produce(state, (draft) => {
      draft.insertUser.fetch = true;
      draft.insertUser.error = false;
    });
  },
  [types.SUCCESS_ADD_USER]: (state, action) => {
    return produce(state, (draft) => {
      draft.insertUser.fetch = false;
      draft.insertUser.error = false;
    });
  },
  [types.REQUEST_UPDATE_USER]: (state, action) => {
    return produce(state, (draft) => {
      draft.updateUser.fetch = true;
      draft.updateUser.error = false;
    });
  },
  [types.SUCCESS_UPDATE_USER]: (state, action) => {
    return produce(state, (draft) => {
      draft.updateUser.fetch = false;
      draft.updateUser.error = false;
    });
  },
});

export default userReducer;
