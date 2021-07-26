import _ from 'lodash';
import produce from 'immer';
import { createReducer } from 'typesafe-actions';

import * as types from 'modules/actions/user';
import Logger from 'utils/log';
import { USER_TYPE } from 'utils/constants';
import Utils from 'utils/new_utils';
import { UserAction, UserState } from 'types/user';

const initialState: UserState = {
  request: {
    getUser: {
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
  },
  user: [],
  consultant: [],
  numberOfUsers: 0,
  userCount: 0,
  realTimeStatus: {},
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
        draft.consultant = consultants.sort((r1, r2) => {
          if (r1.branch_id === r2.branch_id) {
            // id가 같으면 team_name순 정렬 (레벨값 우선 정렬)
            if (r1.team_name && r2.team_name && r1.team_name !== r2.team_name) {
              return r1.team_name < r2.team_name
                ? -1
                : r1.team_name > r2.team_name
                ? 1
                : 0;
            }

            return r1.name < r2.name ? -1 : r1.name > r2.name ? 1 : 0;
          }
          return r1.branch_id - r2.branch_id;
        });
      } else if (url === '/main/manage/user') {
        draft.numberOfUsers = count;
        draft.user = users.sort((r1, r2) => r2.id - r1.id); // 등록 순서로 정렬
      }
    });
  },
  [types.FAILURE_GET_USERS]: (state, action) => {
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
  [types.SET_USER_STATUS]: (state, action) => {
    // 모든 상태 전달
    Logger.log('SET_USER_STATUS', action.payload);

    return produce(state, (draft) => {
      draft.realTimeStatus = action.payload;
    });
  },
  [types.CHANGE_CALL_STATUS]: (state, action) => {
    // 통화 상태 변경 시
    const callStatus = _.cloneDeep(action.payload);
    Logger.log('CHANGE_CALL_STATUS', callStatus);

    return produce(state, (draft) => {
      if (draft.realTimeStatus[callStatus.number!]) {
        draft.realTimeStatus[callStatus.number!].call = callStatus;
      } else {
        draft.realTimeStatus[callStatus.number!] = {
          call: callStatus,
        };
      }
    });
  },
  [types.CHANGE_ZIBOX_STATUS]: (state, action) => {
    // 지박스 상태 변경 시
    const ziboxStatus = _.cloneDeep(action.payload);
    Logger.log('CHANGE_ZIBOX_STATUS', ziboxStatus);

    return produce(state, (draft) => {
      if (draft.realTimeStatus[ziboxStatus.number!]) {
        draft.realTimeStatus[ziboxStatus.number!].zibox = ziboxStatus;
      } else {
        draft.realTimeStatus[ziboxStatus.number!] = {
          zibox: ziboxStatus,
        };
      }
    });
  },
  [types.CHANGE_CONSULTANT_STATUS]: (state, action) => {
    // 상담원 상태 변경 시
    const consultantStatus = _.cloneDeep(action.payload);
    Logger.log('CHANGE_CONSULTANT_STATUS', consultantStatus);

    return produce(state, (draft) => {
      if (draft.realTimeStatus[consultantStatus.number!]) {
        draft.realTimeStatus[consultantStatus.number!].consultant =
          consultantStatus;
      } else {
        draft.realTimeStatus[consultantStatus.number!] = {
          consultant: consultantStatus,
        };
      }
    });
  },
  [types.CHANGE_PHONE_STATUS]: (state, action) => {
    // 휴대폰 상태 변경 시
    const phoneStatus = _.cloneDeep(action.payload);
    Logger.log('CHANGE_PHONE_STATUS', phoneStatus);

    return produce(state, (draft) => {
      if (draft.realTimeStatus[phoneStatus.number!]) {
        draft.realTimeStatus[phoneStatus.number!].phone = phoneStatus;
      } else {
        draft.realTimeStatus[phoneStatus.number!] = {
          phone: phoneStatus,
        };
      }
    });
  },
  [types.CHANGE_ALL_RESET_STATUS]: (state, action) => {
    // 모든 상태 초기화
    Logger.log('CHANGE_ALL_RESET_STATUS', action.payload);

    const { number, consultant, call, phone, zibox } = _.cloneDeep(
      action.payload,
    );

    return produce(state, (draft) => {
      if (draft.realTimeStatus[number]) {
        draft.realTimeStatus[number].call = call;
        draft.realTimeStatus[number].consultant = consultant;
        draft.realTimeStatus[number].phone = phone;
        draft.realTimeStatus[number].zibox = zibox;
      } else {
        draft.realTimeStatus[number] = {
          call,
          consultant,
          phone,
          zibox,
        };
      }
    });
  },
  [types.ADD_USER]: (state, action) => {
    Logger.log('ADD_USER', action.payload);

    const branchId = action.payload.branch_id;
    const newUser = _.cloneDeep(action.payload.userInfo);

    return produce(state, (draft) => {
      if (newUser.branch_id !== branchId) {
        // 추가된 유저의 지점과 현재 로그인된 관리자의 지점이 다른 경우
        return;
      }

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

        draft.consultant = constants.sort((r1, r2) => {
          if (r1.branch_id === r2.branch_id) {
            // id가 같으면 team_name순 정렬 (레벨값 우선 정렬)
            if (r1.team_name !== r2.team_name) {
              return r1.team_name! < r2.team_name!
                ? -1
                : r1.team_name! > r2.team_name!
                ? 1
                : 0;
            }

            return r1.name < r2.name ? -1 : r1.name > r2.name ? 1 : 0;
          }
          return r1.branch_id - r2.branch_id;
        });
      }

      draft.numberOfUsers += 1;
    });
  },
  [types.MODIFY_USER]: (state, action) => {
    Logger.log('MODIFY_USER', action.payload);

    const branchId = action.payload.branch_id;
    const newUser = _.cloneDeep(action.payload.userInfo);

    return produce(state, (draft) => {
      if (newUser.branch_id !== branchId) {
        // 추가된 유저의 지점과 현재 로그인된 관리자의 지점이 다른 경우
        return;
      }

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
    const realTimeStatus = _.cloneDeep(state.realTimeStatus);

    return produce(state, (draft) => {
      state.consultant.map((consultant, i) => {
        if (consultant.call) {
          // 콜 상태가 현재 존재할 경우
          if (realTimeStatus[consultant.number!].call) {
            draft.consultant[i].call = realTimeStatus[consultant.number!].call;
          }

          if (consultant.call?.time) {
            const callingTime = Utils.getLocalDiffTime(
              consultant.call.time,
              local_time,
              server_time,
            );
            draft.consultant[i].calling_time = callingTime;
          }
        } else {
          // 콜 상태가 존재하지 않는 경우
          if (
            realTimeStatus[consultant.number!] &&
            realTimeStatus[consultant.number!].call
          ) {
            // 실시간 상태 정보가 있을 경우
            draft.consultant[i] = {
              ...state.consultant[i],
              call: realTimeStatus[consultant.number!].call,
            };
          }
        }

        if (consultant.consultant) {
          // 상담원 상태가 현재 존재할 경우
          if (realTimeStatus[consultant.number!].consultant) {
            draft.consultant[i].consultant =
              realTimeStatus[consultant.number!].consultant;
          }
        } else {
          // 상담원 상태가 존재하지 않는 경우
          if (
            realTimeStatus[consultant.number!] &&
            realTimeStatus[consultant.number!].consultant
          ) {
            // 실시간 상태 정보가 있을 경우
            draft.consultant[i] = {
              ...state.consultant[i],
              consultant: realTimeStatus[consultant.number!].consultant,
            };
          }
        }

        if (consultant.phone) {
          // 휴대전화 상태가 현재 존재할 경우
          if (realTimeStatus[consultant.number!].phone) {
            draft.consultant[i].phone =
              realTimeStatus[consultant.number!].phone;
          }
        } else {
          // 휴대전화 상태가 존재하지 않는 경우
          if (
            realTimeStatus[consultant.number!] &&
            realTimeStatus[consultant.number!].phone
          ) {
            // 실시간 상태 정보가 있을 경우
            draft.consultant[i] = {
              ...state.consultant[i],
              phone: realTimeStatus[consultant.number!].phone,
            };
          }
        }

        if (consultant.zibox) {
          // 지박스 상태가 현재 존재할 경우
          if (realTimeStatus[consultant.number!].zibox) {
            draft.consultant[i].zibox =
              realTimeStatus[consultant.number!].zibox;
          }
        } else {
          // 지박스 상태가 존재하지 않는 경우
          if (
            realTimeStatus[consultant.number!] &&
            realTimeStatus[consultant.number!].zibox
          ) {
            // 실시간 상태 정보가 있을 경우
            draft.consultant[i] = {
              ...state.consultant[i],
              zibox: realTimeStatus[consultant.number!].zibox,
            };
          }
        }

        return consultant;
      });
    });
  },
  [types.CHANGE_USERS_COUNT]: (state, action) => {
    return produce(state, (draft) => {
      draft.userCount = action.payload;
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
