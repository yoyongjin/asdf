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
      draft.userInfo = action.payload.users.sort((r1, r2) => r2.id - r1.id);
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
        if (monitoring_state) {
          if (monitoring_state === 'y') {
            newUser.monitoring = true;
          } else if (monitoring_state === 'n') {
            newUser.monitoring = false;
          }
        }

        if (user_id) {
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
      
      draft.numberOfUsers += 1;
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
    return produce(state, (draft) => {
      draft.numberOfUsers -= 1;
    });
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
            draft.consultantInfo[i].user_id = user_id;
          } else if (monitoring_state === 'n') {
            draft.consultantInfo[i].monitoring = false;
            draft.consultantInfo[i].user_id = user_id;
          }
        }
      });
    });
  },
  [types.INSERT_CONSULTANT]: (state, action) => {
    return produce(state, (draft) => {
      draft.consultantInfo.push(action.payload);
    });
  },
  [types.UPDATE_CONSULTANT]: (state, action) => {
    return produce(state, (draft) => {
      let index = draft.consultantInfo.findIndex((values) => {
        return values.id === action.payload.id;
      });
      draft.consultantInfo[index].branch_id = action.payload.branch_id;
      draft.consultantInfo[index].branch_name = action.payload.branch_name;
      draft.consultantInfo[index].name = action.payload.name;
      draft.consultantInfo[index].number = action.payload.number;
      draft.consultantInfo[index].team_id = action.payload.team_id;
      draft.consultantInfo[index].team_name = action.payload.team_name;
      draft.consultantInfo[index].admin_id = action.payload.admin_id;
      draft.consultantInfo[index].user_name = action.payload.user_name;
      draft.consultantInfo[index].ziboxip = action.payload.ziboxip;

    });
  },
});

export default userReducer;
