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
  resetPassword: {
    fetch: false,
    error: false,
  },
  userInfo: [],
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
      draft.consultant.fetch = false;
      draft.consultant.error = false;
      draft.userInfo = action.payload.users;
      draft.numberOfUsers = action.payload.count;
    });
  },
  [types.SUCCESS_GET_CONSULTANT_INFO]: (state, action) => {
    return produce(state, (draft) => {
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
  [types.GET_CALL_STATUS]: (state, action) => {
    const newUserList = state.consultantInfo.map((user) => {
      let map = action.payload[user.number];
      if (typeof map === 'string') {
        map = JSON.parse(map);
      }
      if (map && map.number === user.number) {
        const { type, number, time, monitoring_state, user_id } = map;
        let newUser = Object.assign({}, user);
        newUser.call_time = Number(time);
        newUser.call_type = type;
        if(monitoring_state){
          if(monitoring_state === 'y'){
            newUser.monitoring = true;
          }else if(monitoring_state === 'n'){
            newUser.monitoring = false;
          }
        }

        if(user_id){
          newUser.user_id = user_id;
        }

        return newUser;
      } else {
        return user;
      }
    });

    return produce(state, (draft) => {
      draft.consultantInfo = newUserList;
    });
  },
  [types.INSERT_USER]: (state, action) => {
    return produce(state, (draft) => {
      if (state.userInfo.length > 4) {
        draft.userInfo.unshift(action.payload);
        draft.userInfo.pop();
      } else {
        draft.userInfo.unshift(action.payload);
      }
    });
  },
  [types.UPDATE_USER]: (state, action) => {
    return produce(state, (draft) => {
      let index = draft.userInfo.findIndex((values) => {
        return values.id === action.payload.id;
      });
      draft.userInfo[index] = action.payload;
    });
  },
  [types.REQUEST_DELETE_USER]: (state, action) => {
    return produce(state, (draft) => {
      draft.deleteUser.fetch = true;
      draft.deleteUser.error = false;
    });
  },
  [types.SUCCESS_DELETE_USER]: (state, action) => {
    return produce(state, (draft) => {
      draft.deleteUser.fetch = false;
      draft.deleteUser.error = false;
    });
  },
  [types.DELETE_USER]: (state, action) => {
    console.log(action.payload);
    return produce(state, (draft) => {});
  },
  [types.CHANGE_CALL_STATE]: (state, action) => {
    const { type, time, number } = action.payload;
    return produce(state, (draft) => {
      state.consultantInfo.map((values, i) => {
        if (values.number === number) {
          draft.consultantInfo[i].call_time = Number(time);
          draft.consultantInfo[i].call_type = type;
        }
      });
    });
  },
  [types.REQUEST_RESET_PASSWORD]: (state, action) => {
    return produce(state, (draft) => {
      draft.resetPassword.fetch = false;
      draft.resetPassword.error = true;
    });
  },
  [types.CHANGE_MONITORING_STATE]: (state, action) => {
    const { type, time, number, monitoring_state, user_id } = action.payload;
    return produce(state, (draft) => {
      state.consultantInfo.map((values, i) => {
        if (values.number === number) {
          draft.consultantInfo[i].call_time = Number(time);
          draft.consultantInfo[i].call_type = type;
          if (monitoring_state === 'y') {
            draft.consultantInfo[i].monitoring = true;
          } else if (monitoring_state === 'n') {
            draft.consultantInfo[i].monitoring = false;
          }
        }
      });
    });
  },
});

export default userReducer;
