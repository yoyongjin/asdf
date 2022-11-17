import _ from 'lodash';
import produce from 'immer';
import { createReducer } from 'typesafe-actions';

import * as types from 'modules/actions/user';
import Logger from 'utils/log';
import { USER_TYPE } from 'utils/constants';
import Utils from 'utils/new_utils';
import { UserAction, UserState } from 'types/user';
import Status from 'utils/status';

const initialState: UserState = {
  request: {
    getPluralConsultant: {
      fetch: false,
      error: '',
    },
    getUser: {
      fetch: false,
      error: '',
    },
    getConsultant: {
      fetch: false,
      error: '',
    },
    addUser: {
      fetch: false,
      error: '',
    },
    modifyUser: {
      fetch: false,
      error: '',
    },
    removeUser: {
      fetch: false,
      error: '',
    },
    resetPassword: {
      fetch: false,
      error: '',
    },
    modifyZiBoxVolume: {
      fetch: false,
      error: '',
    },
  },
  user: [],
  consultant: [],
  numberOfUsers: 0,
  userCount: 0,
  plural_consultant: [],
};

const userReducer = createReducer<UserState, UserAction>(initialState, {
  [types.REQUEST_GET_USERS]: (state, action) => {
    return produce(state, (draft) => {
      draft.request.getUser.fetch = true;
      draft.request.getUser.error = '';
    });
  },
  [types.SUCCESS_GET_USERS]: (state, action) => {
    const { users, count, url } = action.payload;

    const consultants = users.filter((user) => {
      return user.admin_id === USER_TYPE.CONSULTANT;
    });

    return produce(state, (draft) => {
      draft.request.getUser.fetch = false;
      draft.request.getUser.error = '';

      if (url === '/main') {
        draft.consultant = consultants;
      } else if (url === '/main/manage/user') {
        draft.numberOfUsers = count;
        draft.user = users;
      }
    });
  },
  [types.FAILURE_GET_USERS]: (state, action) => {
    return produce(state, (draft) => {
      draft.request.getUser.fetch = false;
      draft.request.getUser.error = action.payload;
    });
  },
  [types.REQUEST_GET_CONSULTANT]: (state, action) => {
    return produce(state, (draft) => {
      draft.request.getUser.fetch = true;
      draft.request.getUser.error = '';
    });
  },
  [types.SUCCESS_GET_CONSULTANT]: (state, action) => {
    const { users } = action.payload;

    const consultants = users.filter((user) => {
      return user.admin_id === USER_TYPE.CONSULTANT;
    });

    return produce(state, (draft) => {
      draft.request.getUser.fetch = false;
      draft.request.getUser.error = '';

      draft.consultant = consultants;
    });
  },
  [types.FAILURE_GET_CONSULTANT]: (state, action) => {
    return produce(state, (draft) => {
      draft.request.getUser.fetch = false;
      draft.request.getUser.error = action.payload;
    });
  },
  [types.REQUEST_ADD_USER]: (state, action) => {
    return produce(state, (draft) => {
      draft.request.addUser.fetch = true;
      draft.request.addUser.error = '';
    });
  },
  [types.SUCCESS_ADD_USER]: (state, action) => {
    return produce(state, (draft) => {
      draft.request.addUser.fetch = false;
      draft.request.addUser.error = '';
    });
  },
  [types.FAILRUE_ADD_USER]: (state, action) => {
    return produce(state, (draft) => {
      draft.request.addUser.fetch = false;
      draft.request.addUser.error = action.payload;
    });
  },
  [types.REQUEST_MODIFY_USER]: (state, action) => {
    return produce(state, (draft) => {
      draft.request.modifyUser.fetch = true;
      draft.request.modifyUser.error = '';
    });
  },
  [types.SUCCESS_MODIFY_USER]: (state, action) => {
    return produce(state, (draft) => {
      draft.request.modifyUser.fetch = false;
      draft.request.modifyUser.error = '';
    });
  },
  [types.FAILURE_MODIFY_USER]: (state, action) => {
    return produce(state, (draft) => {
      draft.request.modifyUser.fetch = false;
      draft.request.modifyUser.error = action.payload;
    });
  },
  [types.REQUEST_REMOVE_USER]: (state, action) => {
    return produce(state, (draft) => {
      draft.request.removeUser.fetch = true;
      draft.request.removeUser.error = '';
    });
  },
  [types.SUCCESS_REMOVE_USER]: (state, action) => {
    return produce(state, (draft) => {
      draft.request.removeUser.fetch = false;
      draft.request.removeUser.error = '';
    });
  },
  [types.FAILURE_REMOVE_USER]: (state, action) => {
    return produce(state, (draft) => {
      draft.request.removeUser.fetch = false;
      draft.request.removeUser.error = action.payload;
    });
  },
  [types.REQUEST_RESET_PASSWORD]: (state, action) => {
    return produce(state, (draft) => {
      draft.request.resetPassword.fetch = false;
      draft.request.resetPassword.error = '';
    });
  },
  [types.SUCCESS_RESET_PASSWORD]: (state, action) => {
    return produce(state, (draft) => {
      draft.request.resetPassword.fetch = false;
      draft.request.resetPassword.error = '';
    });
  },
  [types.FAILURE_RESET_PASSWORD]: (state, action) => {
    return produce(state, (draft) => {
      draft.request.resetPassword.fetch = false;
      draft.request.resetPassword.error = action.payload;
    });
  },
  [types.REQUEST_ZIBOX_VOLUME]: (state, action) => {
    return produce(state, (draft) => {
      draft.request.modifyZiBoxVolume.fetch = false;
      draft.request.modifyZiBoxVolume.error = '';
    });
  },
  [types.SUCCESS_ZIBOX_VOLUME]: (state, action) => {
    return produce(state, (draft) => {
      draft.request.modifyZiBoxVolume.fetch = false;
      draft.request.modifyZiBoxVolume.error = '';
    });
  },
  [types.FAILURE_ZIBOX_VOLUME]: (state, action) => {
    return produce(state, (draft) => {
      draft.request.modifyZiBoxVolume.fetch = false;
      draft.request.modifyZiBoxVolume.error = action.payload;
    });
  },
  [types.ADD_USER]: (state, action) => {
    Logger.log('ADD_USER', action.payload);

    const newUser = _.cloneDeep(action.payload.userInfo);

    return produce(state, (draft) => {
      if (state.user.length >= state.userCount) {
        // 페이지가 넘어갈 경우
        draft.user.unshift(newUser);
        draft.user.pop();
      } else {
        draft.user.unshift(newUser);
      }

      if (newUser.admin_id === USER_TYPE.CONSULTANT) {
        const constants = _.cloneDeep(state.consultant);
        constants.push(newUser);

        draft.consultant = constants;
      }

      draft.numberOfUsers += 1;
    });
  },
  [types.MODIFY_USER]: (state, action) => {
    Logger.log('MODIFY_USER', action.payload);

    const newUser = _.cloneDeep(action.payload.userInfo);

    return produce(state, (draft) => {
      const index = state.user.findIndex((values) => {
        return values.id === newUser.id;
      });

      if (index > -1) {
        draft.user[index] = newUser;
      }

      if (newUser.admin_id === USER_TYPE.CONSULTANT) {
        const index = state.consultant.findIndex((values) => {
          return values.id === newUser.id;
        });

        if (index > -1) {
          draft.consultant[index] = newUser;
        }
      }
    });
  },
  [types.SET_CALCULATED_CALL_TIME]: (state, action) => {
    const { local_time, server_time } = action.payload;
    const realTimeStatus = new Status().getAllStatus();

    return produce(state, (draft) => {
      draft.consultant = state.consultant.map((consultant, i) => {
        let tempConsultant = _.cloneDeep(consultant);

        if (tempConsultant.call) {
          // 콜 상태가 현재 존재할 경우
          if (realTimeStatus[consultant.number!].call) {
            tempConsultant.call = realTimeStatus[consultant.number!].call;
          }

          if (consultant.call?.time) {
            const callingTime = Utils.getLocalDiffTime(
              consultant.call.time,
              local_time,
              server_time,
            );
            tempConsultant.calling_time = callingTime;
          }
        } else {
          // 콜 상태가 존재하지 않는 경우
          if (
            realTimeStatus[consultant.number!] &&
            realTimeStatus[consultant.number!].call
          ) {
            // 실시간 상태 정보가 있을 경우
            tempConsultant = {
              ...tempConsultant,
              call: realTimeStatus[consultant.number!].call,
            };
          }
        }

        if (consultant.consultant) {
          // 상담원 상태가 현재 존재할 경우
          if (realTimeStatus[consultant.number!].consultant) {
            tempConsultant.consultant =
              realTimeStatus[consultant.number!].consultant;
          }
        } else {
          // 상담원 상태가 존재하지 않는 경우
          if (
            realTimeStatus[consultant.number!] &&
            realTimeStatus[consultant.number!].consultant
          ) {
            // 실시간 상태 정보가 있을 경우
            tempConsultant = {
              ...tempConsultant,
              consultant: realTimeStatus[consultant.number!].consultant,
            };
          }
        }

        if (consultant.phone) {
          // 휴대전화 상태가 현재 존재할 경우
          if (realTimeStatus[consultant.number!].phone) {
            tempConsultant.phone = realTimeStatus[consultant.number!].phone;
          }
        } else {
          // 휴대전화 상태가 존재하지 않는 경우
          if (
            realTimeStatus[consultant.number!] &&
            realTimeStatus[consultant.number!].phone
          ) {
            // 실시간 상태 정보가 있을 경우
            tempConsultant = {
              ...tempConsultant,
              phone: realTimeStatus[consultant.number!].phone,
            };
          }
        }

        if (consultant.zibox) {
          // 지박스 상태가 현재 존재할 경우
          if (realTimeStatus[consultant.number!].zibox) {
            tempConsultant.zibox = realTimeStatus[consultant.number!].zibox;
          }
        } else {
          // 지박스 상태가 존재하지 않는 경우
          if (
            realTimeStatus[consultant.number!] &&
            realTimeStatus[consultant.number!].zibox
          ) {
            // 실시간 상태 정보가 있을 경우
            tempConsultant = {
              ...tempConsultant,
              zibox: realTimeStatus[consultant.number!].zibox,
            };
          }
        }

        return tempConsultant;
      });
    });
  },
  [types.CHANGE_USERS_COUNT]: (state, action) => {
    return produce(state, (draft) => {
      draft.userCount = action.payload;
    });
  },
  [types.REQUEST_GET_PLURAL_CONSULTANT]: (state, action) => {
    return produce(state, (draft) => {
      draft.request.getPluralConsultant.fetch = true;
      draft.request.getPluralConsultant.error = '';
    });
  },
  [types.SUCCESS_GET_PLURAL_CONSULTANT]: (state, action) => {
    return produce(state, (draft) => {
      draft.plural_consultant = action.payload;
      draft.request.getPluralConsultant.fetch = false;
      draft.request.getPluralConsultant.error = '';
    });
  },
  [types.FAILURE_GET_PLURAL_CONSULTANT]: (state, action) => {
    return produce(state, (draft) => {
      draft.request.getPluralConsultant.fetch = false;
      draft.request.getPluralConsultant.error = action.payload;
    });
  },
  [types.SET_INIT_PLURAL_CONSULTANT]: (state, action) => {
    return produce(state, (draft) => {
      draft.plural_consultant = [];
    });
  },
  [types.SET_INIT_CONSULTANT]: (state, action) => {
    return produce(state, (draft) => {
      draft.consultant = [];
    });
  },
  /**
   * @deprecated
   */
  [types.SET_MONIT_STATUS]: (state, action) => {
    return produce(state, (draft) => {
      switch (action.payload) {
        case 0:
          // 감청 종료
          // draft.monit.tapping = false;
          break;
        case 1:
          // 감청 시작
          // draft.monit.tapping = true;
          break;
        case 2:
          // 버퍼링 시작
          break;
        case 3:
          // 버퍼링 종료
          break;
        case 4:
          // 타임아웃
          // draft.monit.tapping = false;
          break;
        default:
          break;
      }
    });
  },
});

export default userReducer;
