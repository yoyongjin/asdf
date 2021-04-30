import _ from 'lodash';
import produce from 'immer';
import { createReducer } from 'typesafe-actions';

import { ConsultantInfoType, UserInfoType } from 'modules/types/user';
import * as types from 'modules/actions/user';
import { getDiffTime } from 'utils/utils';
import Logger from 'utils/log';
import { CALL_STATUS, USER_TYPE } from 'utils/constants';
import { UserInfo } from 'types/user';
import Utils from 'utils/new_utils';
import { UserAction, UserType } from 'types/user';
import { CALL_STATUS_V2 } from 'utils/constants';

const initialState: UserType = {
  request: {
    getUser: {
      fetch: false,
      error: '',
    },
    insertUser: {
      fetch: false,
      error: '',
    },
    updateUser: {
      fetch: false,
      error: '',
    },
    deleteUser: {
      fetch: false,
      error: '',
    },
    resetPassword: {
      fetch: false,
      error: '',
    },
  },
  userList: {
    users: [],
    consultants: [],
    numberOfUsers: 0,
  },
  filterUserList: {
    users: [],
    consultants: [],
    numberOfUsers: 0,
  },
  status: {},
  // monit: {
  //   tapping: false,
  //   pc_ip: '',
  // },
};

const userReducer = createReducer<UserType, UserAction>(initialState, {
  [types.REQUEST_GET_USERS]: (state, action) => {
    return produce(state, (draft) => {
      draft.request.getUser.fetch = true;
      draft.request.getUser.error = '';
    });
  },
  [types.SUCCESS_GET_USERS]: (state, action) => {
    const { users, count, url, loginId } = action.payload;
    const consultants = users.filter((user) => {
      return user.admin_id === USER_TYPE.CONSULTANT;
    });

    return produce(state, (draft) => {
      draft.request.getUser.fetch = false;
      draft.request.getUser.error = '';

      if (url === '/main') {
        let temp = consultants.map((user) => {
          const value = state.status[user.number];
          let newUser = Object.assign({}, user);
          // if (value && value.call) {
          //   const { call, connection, number, time } = value.call;
          //   if (number === user.number) {
          //     newUser.call_time = time;
          //     newUser.call_status = call;
          //     newUser.phone_status = connection;
          //   }
          // }

          // if (value && value.consultant) {
          //   const { number, tmr } = value.consultant;
          //   if (number === user.number) {
          //     newUser.consultant_status = tmr;
          //   }
          // }

          // if (value && value.zibox) {
          //   const {
          //     ats,
          //     connection,
          //     monitoring,
          //     number,
          //     pc_ip,
          //     record,
          //     zibox_ip,
          //     zibox_mac,
          //     monit_user,
          //   } = value.zibox;
          //   if (number === user.number) {
          //     newUser.zibox_status = connection;
          //     newUser.ats_status = ats;
          //     newUser.record_status = record;
          //     newUser.monit_status = monitoring;
          //     newUser.zibox_ip = zibox_ip;
          //     newUser.zibox_mac = zibox_mac;
          //     newUser.pc_ip = pc_ip;
          //     newUser.monit_user = monit_user;
          //     // if (loginId === monit_user) {
          //     //   draft.monit.tapping = true;
          //     // }
          //   }
          // }

          return newUser;
        });
        draft.userList.consultants = temp.sort((r1, r2) => {
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
        if (draft.filterUserList.consultants.length > 0) {
          draft.filterUserList.consultants = [];
        }
      } else if (url === '/main/manage/user') {
        draft.userList.users = users.sort((r1, r2) => r2.id - r1.id); // 등록 순서로 정렬
        draft.userList.numberOfUsers = count;
        if (draft.filterUserList.users.length > 0) {
          draft.filterUserList.users = [];
          draft.filterUserList.numberOfUsers = 0;
        }
      }
    });
  },
  [types.SUCCESS_GET_FILTER_USERS]: (state, action) => {
    const { users, count, url, loginId } = action.payload;
    const consultants = users.filter((user) => {
      return user.admin_id === 0;
    });
    return produce(state, (draft) => {
      draft.request.getUser.fetch = false;
      draft.request.getUser.error = '';
      if (url === '/main') {
        let temp = consultants.map((user) => {
          let value = state.status[user.number];
          let newUser: ConsultantInfoType = Object.assign({}, user);
          // if (value && value.call) {
          //   const { call, connection, number, time } = value.call;
          //   if (number === user.number) {
          //     newUser.call_time = time;
          //     newUser.call_status = call;
          //     newUser.phone_status = connection;
          //   }
          // }

          // if (value && value.consultant) {
          //   const { number, tmr } = value.consultant;
          //   if (number === user.number) {
          //     newUser.consultant_status = tmr;
          //   }
          // }

          // if (value && value.zibox) {
          //   const {
          //     ats,
          //     connection,
          //     monitoring,
          //     number,
          //     pc_ip,
          //     record,
          //     zibox_ip,
          //     zibox_mac,
          //     monit_user,
          //   } = value.zibox;
          //   if (number === user.number) {
          //     newUser.zibox_status = connection;
          //     newUser.ats_status = ats;
          //     newUser.record_status = record;
          //     newUser.monit_status = monitoring;
          //     newUser.zibox_ip = zibox_ip;
          //     newUser.zibox_mac = zibox_mac;
          //     newUser.pc_ip = pc_ip;
          //     newUser.monit_user = monit_user;
          //     // if (loginId === monit_user) {
          //     //   draft.monit.tapping = true;
          //     // }
          //   }
          // }

          return newUser;
        });
        // draft.filterUserList.consultants = temp.sort((r1, r2) => {
        //   if (r1.branch_id === r2.branch_id) {
        //     // id가 같으면 team_name순 정렬 (레벨값 우선 정렬)
        //     if (r1.team_name && r2.team_name && r1.team_name !== r2.team_name) {
        //       return r1.team_name < r2.team_name
        //         ? -1
        //         : r1.team_name > r2.team_name
        //         ? 1
        //         : 0;
        //     }

        //     return r1.name < r2.name ? -1 : r1.name > r2.name ? 1 : 0;
        //   }
        //   return r1.branch_id - r2.branch_id;
        // });
      } else if (url === '/main/manage/user') {
        draft.filterUserList.users = users.sort((r1, r2) => r2.id - r1.id); // 등록 순서로 정렬
        draft.filterUserList.numberOfUsers = count;
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
      draft.request.insertUser.fetch = true;
      draft.request.insertUser.error = '';
    });
  },
  [types.SUCCESS_ADD_USER]: (state, action) => {
    return produce(state, (draft) => {
      draft.request.insertUser.fetch = false;
      draft.request.insertUser.error = '';
    });
  },
  [types.FAILRUE_ADD_USER]: (state, action) => {
    return produce(state, (draft) => {
      draft.request.insertUser.fetch = false;
      draft.request.insertUser.error = action.payload;
    });
  },
  [types.REQUEST_UPDATE_USER]: (state, action) => {
    return produce(state, (draft) => {
      draft.request.updateUser.fetch = true;
      draft.request.updateUser.error = '';
    });
  },
  [types.SUCCESS_UPDATE_USER]: (state, action) => {
    return produce(state, (draft) => {
      draft.request.updateUser.fetch = false;
      draft.request.updateUser.error = '';
    });
  },
  [types.FAILURE_UPDATE_USER]: (state, action) => {
    return produce(state, (draft) => {
      draft.request.updateUser.fetch = false;
      draft.request.updateUser.error = action.payload;
    });
  },
  [types.GET_CALL_STATUS]: (state, action) => {
    // 삭제 예정
    // const newUserList = state.userList.consultants.map((user) => {
    //   let map = action.payload[user.number];
    //   if (typeof map === 'string') {
    //     map = JSON.parse(map);
    //   }
    //   if (map && map.number === user.number) {
    //     const { status, number, time, monitoring_state, user_id } = map;
    //     let newUser = Object.assign({}, user);
    //     newUser.call_start_time = Number(time);
    //     newUser.call_type = status;
    //     if (monitoring_state) {
    //       if (monitoring_state === 'y') {
    //         newUser.monitoring = true;
    //       } else if (monitoring_state === 'n') {
    //         newUser.monitoring = false;
    //       }
    //     }

    //     if (user_id) {
    //       newUser.user_id = user_id;
    //     }

    //     return newUser;
    //   } else {
    //     return user;
    //   }
    // });

    // const newFilteredUserList = state.filterUserList.consultants.map((user) => {
    //   let map = action.payload[user.number];
    //   if (typeof map === 'string') {
    //     map = JSON.parse(map);
    //   }
    //   if (map && map.number === user.number) {
    //     const { status, number, time, monitoring_state, user_id } = map;
    //     let newUser = Object.assign({}, user);
    //     newUser.call_start_time = Number(time);
    //     newUser.call_type = status;
    //     if (monitoring_state) {
    //       if (monitoring_state === 'y') {
    //         newUser.monitoring = true;
    //       } else if (monitoring_state === 'n') {
    //         newUser.monitoring = false;
    //       }
    //     }

    //     if (user_id) {
    //       newUser.user_id = user_id;
    //     }

    //     return newUser;
    //   } else {
    //     return user;
    //   }
    // });

    return produce(state, (draft) => {
      // draft.userList.consultants = newUserList;
      // if (state.filterUserList.consultants.length > 0) {
      //   draft.filterUserList.consultants = newFilteredUserList;
      // }
    });
  },
  [types.INSERT_USER]: (state, action) => {
    // 삭제 예정
    const {
      admin_id,
      branch_name,
      branch_id,
      ziboxip,
      name,
      number,
      team_id,
      team_name,
      user_name,
      id,
      login_at,
      ziboxmic,
      ziboxspk,
    } = action.payload.data;

    const value = {
      id,
      branch_id,
      team_id,
      branch_name,
      team_name,
      admin_id,
      name,
      user_name,
      number,
      ziboxip,
      login_at,
      ziboxmic,
      ziboxspk,
    };
    return produce(state, (draft) => {
      // if (branch_id !== action.payload.branch_id) return;
      // if (admin_id === 0) {
      //   // 상담원일 경우
      //   if (state.userList.users.length > 4) {
      //     // 페이지가 넘어갈 경우
      //     draft.userList.users.unshift(value);
      //     draft.userList.users.pop();
      //   } else {
      //     draft.userList.users.unshift(value);
      //   }
      //   if (state.filterUserList.users.length > 0) {
      //     // 필터링한 정보를 보고 있을 경우
      //     if (
      //       state.filterUserList.users[0].branch_id === value.branch_id ||
      //       state.filterUserList.users[0].team_id === value.team_id
      //     ) {
      //       // 보고있는 지점과 팀에 넣은 경우
      //       if (state.filterUserList.users.length > 4) {
      //         draft.filterUserList.users.unshift(value);
      //         draft.filterUserList.users.pop();
      //       } else {
      //         draft.filterUserList.users.unshift(value);
      //       }
      //     }
      //   }
      //   // if(state.userList.consultants.length < 1) return;
      //   // draft.userList.numberOfUsers += 1;
      //   let cons = Object.assign(
      //     [],
      //     state.userList.consultants,
      //   ) as ConsultantInfoType[];
      //   cons.push(value);
      //   // draft.userList.consultants = cons.sort((r1, r2) => {
      //   //   if (r1.branch_id === r2.branch_id) {
      //   //     // id가 같으면 team_name순 정렬 (레벨값 우선 정렬)
      //   //     if (r1.team_name !== r2.team_name) {
      //   //       return r1.team_name! < r2.team_name!
      //   //         ? -1
      //   //         : r1.team_name! > r2.team_name!
      //   //         ? 1
      //   //         : 0;
      //   //     }
      //   //     return r1.name < r2.name ? -1 : r1.name > r2.name ? 1 : 0;
      //   //   }
      //   //   return r1.branch_id - r2.branch_id;
      //   // });
      //   // draft.userList.consultants.push(value);
      // } else if (admin_id === 1) {
      //   // 관리자일 경우
      //   if (state.userList.users.length > 4) {
      //     draft.userList.users.unshift(value);
      //     draft.userList.users.pop();
      //   } else {
      //     draft.userList.users.unshift(value);
      //   }
      //   if (state.filterUserList.users.length > 0) {
      //     if (
      //       state.filterUserList.users[0].branch_id === value.branch_id &&
      //       state.filterUserList.users[0].team_id === value.team_id
      //     ) {
      //       if (state.filterUserList.users.length > 4) {
      //         draft.filterUserList.users.unshift(value);
      //         draft.filterUserList.users.pop();
      //       } else {
      //         draft.filterUserList.users.unshift(value);
      //       }
      //     }
      //   }
      // }
      // draft.userList.numberOfUsers += 1;
    });
  },
  [types.UPDATE_USER]: (state, action) => {
    // 삭제 예정
    const {
      admin_id,
      branch_name,
      branch_id,
      ziboxip,
      name,
      number,
      team_id,
      team_name,
      user_name,
      id,
      login_at,
      ziboxmic,
      ziboxspk,
    } = action.payload.data;
    const value = {
      id,
      branch_id,
      team_id,
      branch_name,
      team_name,
      admin_id,
      name,
      user_name,
      number,
      ziboxip,
      login_at,
      ziboxmic,
      ziboxspk,
    };
    return produce(state, (draft) => {
      // if (branch_id !== action.payload.branch_id) return;
      // if (admin_id === 0) {
      //   // 상담원 수정 시
      //   if (draft.userList.users.length > 0) {
      //     let index = draft.userList.users.findIndex((values) => {
      //       return values.id === id;
      //     });
      //     if (index > -1) {
      //       draft.userList.users[index] = value;
      //     }
      //   }
      //   if (draft.userList.consultants.length > 0) {
      //     let index = draft.userList.consultants.findIndex((values) => {
      //       return values.id === id;
      //     });
      //     if (index > -1) {
      //       draft.userList.consultants[index].branch_id = branch_id;
      //       draft.userList.consultants[index].branch_name = branch_name;
      //       draft.userList.consultants[index].name = name;
      //       draft.userList.consultants[index].number = number;
      //       draft.userList.consultants[index].team_id = team_id;
      //       draft.userList.consultants[index].team_name = team_name;
      //       draft.userList.consultants[index].admin_id = admin_id;
      //       draft.userList.consultants[index].user_name = user_name;
      //       draft.userList.consultants[index].ziboxip = ziboxip;
      //       draft.userList.consultants[index].ziboxmic = ziboxmic;
      //       draft.userList.consultants[index].ziboxspk = ziboxspk;
      //     }
      //   }
      //   if (draft.filterUserList.users.length > 0) {
      //     let index = draft.filterUserList.users.findIndex((values) => {
      //       return values.id === id;
      //     });
      //     if (index > -1) {
      //       draft.filterUserList.users[index].branch_id = branch_id;
      //       draft.filterUserList.users[index].branch_name = branch_name;
      //       draft.filterUserList.users[index].name = name;
      //       draft.filterUserList.users[index].number = number;
      //       draft.filterUserList.users[index].team_id = team_id;
      //       draft.filterUserList.users[index].team_name = team_name;
      //       draft.filterUserList.users[index].admin_id = admin_id;
      //       draft.filterUserList.users[index].user_name = user_name;
      //       draft.filterUserList.users[index].ziboxip = ziboxip;
      //       draft.filterUserList.users[index].ziboxmic = ziboxmic;
      //       draft.filterUserList.users[index].ziboxspk = ziboxspk;
      //     }
      //   }
      //   if (draft.filterUserList.consultants.length > 0) {
      //     let index = draft.filterUserList.consultants.findIndex((values) => {
      //       return values.id === id;
      //     });
      //     if (index > -1) {
      //       draft.filterUserList.consultants[index].branch_id = branch_id;
      //       draft.filterUserList.consultants[index].branch_name = branch_name;
      //       draft.filterUserList.consultants[index].name = name;
      //       draft.filterUserList.consultants[index].number = number;
      //       draft.filterUserList.consultants[index].team_id = team_id;
      //       draft.filterUserList.consultants[index].team_name = team_name;
      //       draft.filterUserList.consultants[index].admin_id = admin_id;
      //       draft.filterUserList.consultants[index].user_name = user_name;
      //       draft.filterUserList.consultants[index].ziboxip = ziboxip;
      //       draft.filterUserList.consultants[index].ziboxmic = ziboxmic;
      //       draft.filterUserList.consultants[index].ziboxspk = ziboxspk;
      //     }
      //   }
      // } else if (admin_id === 1) {
      //   // 관리자
      //   if (draft.userList.users.length > 0) {
      //     let index = draft.userList.users.findIndex((values) => {
      //       return values.id === id;
      //     });
      //     if (index > -1) {
      //       draft.userList.users[index] = value;
      //     }
      //   }
      //   if (draft.userList.consultants.length > 0) {
      //     draft.userList.consultants = draft.userList.consultants.filter(
      //       (values) => {
      //         return values.id !== id;
      //       },
      //     );
      //   }
      //   if (draft.filterUserList.users.length > 0) {
      //     let index = draft.filterUserList.users.findIndex((values) => {
      //       return values.id === id;
      //     });
      //     if (index > -1) {
      //       draft.filterUserList.users[index] = value;
      //     }
      //   }
      //   if (draft.filterUserList.consultants.length > 0) {
      //     draft.filterUserList.consultants = draft.filterUserList.consultants.filter(
      //       (values) => {
      //         return values.id !== id;
      //       },
      //     );
      //   }
      // }
    });
  },
  [types.REQUEST_DELETE_USER]: (state, action) => {
    return produce(state, (draft) => {
      draft.request.deleteUser.fetch = true;
      draft.request.deleteUser.error = '';
    });
  },
  [types.SUCCESS_DELETE_USER]: (state, action) => {
    return produce(state, (draft) => {
      draft.request.deleteUser.fetch = false;
      draft.request.deleteUser.error = '';
    });
  },
  [types.FAILURE_DELETE_USER]: (state, action) => {
    return produce(state, (draft) => {
      draft.request.deleteUser.fetch = false;
      draft.request.deleteUser.error = action.payload;
    });
  },
  [types.DELETE_USER]: (state, action) => {
    return produce(state, (draft) => {
      if (state.userList.consultants.length > 0) {
        let data = state.userList.consultants.filter((consultant) => {
          return consultant.id !== action.payload.id;
        });
        draft.userList.consultants = data;
      }

      if (state.filterUserList.consultants.length > 0) {
        let data = state.filterUserList.consultants.filter((consultant) => {
          return consultant.id !== action.payload.id;
        });
        draft.filterUserList.consultants = data;
      }
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
      draft.request.deleteUser.fetch = false;
      draft.request.deleteUser.error = '';
    });
  },
  [types.FAILURE_RESET_PASSWORD]: (state, action) => {
    return produce(state, (draft) => {
      draft.request.deleteUser.fetch = false;
      draft.request.deleteUser.error = action.payload;
    });
  },
  // [types.CHANGE_CALL_STATE]: (state, action) => {
  //   const { type, time, number } = action.payload;
  //   return produce(state, (draft) => {
  //     state.userList.consultants.map((values, i) => {
  //       if (values.number === number) {
  //         draft.userList.consultants[i].call_time = Number(time);
  //         draft.userList.consultants[i].call_type = type;
  //       }
  //     });

  //     if (state.filterUserList.consultants.length > 0) {
  //       state.filterUserList.consultants.map((values, i) => {
  //         if (values.number === number) {
  //           draft.filterUserList.consultants[i].call_time = Number(time);
  //           draft.filterUserList.consultants[i].call_type = type;
  //         }
  //       });
  //     }
  //   });
  // },
  [types.CHANGE_STATUS]: (state, action) => {
    // const { status, time, number, monitoring_state, user_id } = action.payload;
    const {
      number,
      call,
      tmr,
      ats,
      connection,
      monitoring,
      record,
      zibox_ip,
      zibox_mac,
      pc_ip,
      time,
      monit_user,
    } = action.payload.data;
    return produce(state, (draft) => {
      // let isExist = false;
      // for (let key in state.status) {
      //   if (key === number) {
      //     isExist = true;
      //     let value = draft.status[number] as any;
      //     switch (action.payload.type) {
      //       case 'tmrevent':
      //         value.consultant = action.payload.data;
      //         break;
      //       case 'ziboxevent':
      //         value.zibox = action.payload.data;
      //         break;
      //       case 'callevent':
      //       case 'phoneevent':
      //         value.call = action.payload.data;
      //         break;
      //       default:
      //         break;
      //     }
      //   }
      // }
      // if (!isExist) {
      //   let parseData = {};
      //   switch (action.payload.type) {
      //     case 'tmrevent':
      //       parseData = {
      //         ...state.status,
      //         [number]: {
      //           consultant: {
      //             number,
      //             tmr,
      //           },
      //         },
      //       };
      //       (draft.status as any) = parseData;
      //       break;
      //     case 'ziboxevent':
      //       parseData = {
      //         ...state.status,
      //         [number]: {
      //           zibox: {
      //             number,
      //             ats,
      //             connection,
      //             monitoring,
      //             pc_ip,
      //             record,
      //             zibox_ip,
      //             zibox_mac,
      //             monit_user,
      //           },
      //         },
      //       };
      //       (draft.status as any) = parseData;
      //       // value.zibox = action.payload.data;
      //       break;
      //     case 'callevent':
      //     case 'phoneevent':
      //       // value.call = action.payload.data;
      //       break;
      //     default:
      //       break;
      //   }
      // }
      // state.userList.consultants.map((values, i) => {
      //   if (values.number === number) {
      //     switch (action.payload.type) {
      //       case 'tmrevent':
      //         draft.userList.consultants[i].consultant_status = tmr;
      //         break;
      //       case 'ziboxevent':
      //         draft.userList.consultants[i].ats_status = ats;
      //         draft.userList.consultants[i].record_status = record;
      //         draft.userList.consultants[i].monit_status = monitoring;
      //         draft.userList.consultants[i].zibox_status = connection;
      //         draft.userList.consultants[i].pc_ip = pc_ip;
      //         draft.userList.consultants[i].zibox_ip = zibox_ip;
      //         draft.userList.consultants[i].zibox_mac = zibox_mac;
      //         if (monit_user) {
      //           draft.userList.consultants[i].monit_user = monit_user;
      //           // draft.monit.tapping = true;
      //         } else {
      //           draft.userList.consultants[i].monit_user = monit_user;
      //           // draft.monit.tapping = false;
      //         }
      //         break;
      //       case 'callevent':
      //         draft.userList.consultants[i].call_status = call;
      //         draft.userList.consultants[i].call_start_time = time;
      //         break;
      //       case 'phoneevent':
      //         draft.userList.consultants[i].phone_status = connection;
      //         break;
      //       default:
      //         break;
      //     }
      //   }
      // });
      // // }
      // // 이건 감청하는 주체를 파악하기 위해 넣어놓은거임
      // // draft.filterUserList.consultants[i].user_id = user_id;
      // state.filterUserList.consultants.map((values, i) => {
      //   if (values.number === number) {
      //     switch (action.payload.type) {
      //       case 'tmrevent':
      //         draft.filterUserList.consultants[i].consultant_status = tmr;
      //         break;
      //       case 'ziboxevent':
      //         draft.filterUserList.consultants[i].ats_status = ats;
      //         draft.filterUserList.consultants[i].record_status = record;
      //         draft.filterUserList.consultants[i].monit_status = monitoring;
      //         draft.filterUserList.consultants[i].zibox_status = connection;
      //         draft.filterUserList.consultants[i].pc_ip = pc_ip;
      //         draft.filterUserList.consultants[i].zibox_ip = zibox_ip;
      //         draft.filterUserList.consultants[i].zibox_mac = zibox_mac;
      //         draft.filterUserList.consultants[i].monit_user = monit_user;
      //         if (monit_user) {
      //           draft.filterUserList.consultants[i].monit_user = monit_user;
      //           // draft.monit.tapping = true;
      //         } else {
      //           draft.filterUserList.consultants[i].monit_user = monit_user;
      //           // draft.monit.tapping = false;
      //         }
      //         break;
      //       case 'callevent':
      //         draft.filterUserList.consultants[i].call_status = call;
      //         draft.filterUserList.consultants[i].call_start_time = time;
      //         break;
      //       case 'phoneevent':
      //         draft.userList.consultants[i].phone_status = connection;
      //         break;
      //       default:
      //         break;
      //     }
      //   }
      // });
    });
  },
  [types.SAVE_STATUS]: (state, action) => {
    let parseData = {};

    for (let key in action.payload) {
      let parseValue = JSON.parse(action.payload[key]);
      parseData = {
        ...parseData,
        [key]: parseValue,
      };
    }

    return produce(state, (draft) => {
      draft.status = parseData;
    });
  },
  [types.RESET_STATUS]: (state, action) => {
    return produce(state, (draft) => {
      // for (let key in state.status) {
      //   if (key === action.payload.call!.number) {
      //     draft.status = action.payload as any;
      //   }
      // }
      // state.userList.consultants.map((values, i) => {
      //   if (values.number === action.payload.call!.number) {
      //     draft.userList.consultants[
      //       i
      //     ].consultant_status = action.payload.consultant!.tmr;
      //     draft.userList.consultants[
      //       i
      //     ].record_status = action.payload.zibox!.record;
      //     draft.userList.consultants[
      //       i
      //     ].monit_status = action.payload.zibox!.monitoring;
      //     draft.userList.consultants[
      //       i
      //     ].zibox_status = action.payload.zibox!.connection;
      //     draft.userList.consultants[
      //       i
      //     ].monit_user = action.payload.zibox!.monit_user;
      //     // draft.monit.tapping = false;
      //     draft.userList.consultants[i].call_status = action.payload.call!.call;
      //     draft.userList.consultants[
      //       i
      //     ].call_start_time = action.payload.call!.time;
      //     draft.userList.consultants[
      //       i
      //     ].phone_status = action.payload.call!.connection;
      //   }
      // });
      // state.filterUserList.consultants.map((values, i) => {
      //   if (values.number === action.payload.call!.number) {
      //     draft.filterUserList.consultants[
      //       i
      //     ].consultant_status = action.payload.consultant!.tmr;
      //     draft.filterUserList.consultants[
      //       i
      //     ].record_status = action.payload.zibox!.record;
      //     draft.filterUserList.consultants[
      //       i
      //     ].monit_status = action.payload.zibox!.monitoring;
      //     draft.filterUserList.consultants[
      //       i
      //     ].zibox_status = action.payload.zibox!.connection;
      //     draft.filterUserList.consultants[
      //       i
      //     ].monit_user = action.payload.zibox!.monit_user;
      //     // draft.monit.tapping = false;
      //     draft.filterUserList.consultants[
      //       i
      //     ].call_status = action.payload.call!.call;
      //     draft.filterUserList.consultants[
      //       i
      //     ].call_start_time = action.payload.call!.time;
      //     draft.filterUserList.consultants[
      //       i
      //     ].phone_status = action.payload.call!.connection;
      //   }
      // });
    });
  },
  [types.SET_MONIT_STATUS]: (state, action) => {
    return produce(state, (draft) => {
      state.userList.consultants.findIndex((consult) => {});
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
  [types.RESET_FILTERED_USER]: (state, action) => {
    return produce(state, (draft) => {
      draft.filterUserList.users = [];
      draft.filterUserList.numberOfUsers = 0;
    });
  },
  [types.RESET_FILTERED_CONSULTANT]: (state, action) => {
    return produce(state, (draft) => {
      draft.filterUserList.consultants = [];
    });
  },
  [types.SET_USER_STATUS]: (state, action) => {
    // 모든 상태 전달
    Logger.log('SET_USER_STATUS', action.payload);

    const consultantStatus = _.cloneDeep(action.payload);

    const newUserList = state.userList.consultants.map((user) => {
      const allStatus = consultantStatus[user.number];

      if (allStatus) {
        const { call, consultant, phone, zibox } = allStatus;

        const newUser = _.cloneDeep(user);
        if (call) {
          newUser.call = call;
        }

        if (consultant) {
          newUser.consultant = consultant;
        }

        if (phone) {
          newUser.phone = phone;
        }

        if (zibox) {
          newUser.zibox = zibox;
        }

        return newUser;
      }
      return user;
    });

    const newFilteredUserList = state.filterUserList.consultants.map((user) => {
      const allStatus = consultantStatus[user.number];

      if (allStatus) {
        const { call, consultant, phone, zibox } = allStatus;
        const newUser = _.cloneDeep(user);

        if (call) {
          newUser.call = call;
        }

        if (consultant) {
          newUser.consultant = consultant;
        }

        if (phone) {
          newUser.phone = phone;
        }

        if (zibox) {
          newUser.zibox = zibox;
        }

        return newUser;
      }

      return user;
    });

    return produce(state, (draft) => {
      draft.userList.consultants = newUserList;

      if (state.filterUserList.consultants.length > 0) {
        draft.filterUserList.consultants = newFilteredUserList;
      }
    });
  },
  [types.CHANGE_CALL_STATUS]: (state, action) => {
    const callStatus = _.cloneDeep(action.payload);
    Logger.log('CHANGE_CALL_STATUS', callStatus);

    const newUserList = state.userList.consultants.map((consultant) => {
      const { status, time, number } = callStatus;

      if (number !== consultant.number) return consultant;

      const newUser = _.cloneDeep(consultant);

      if (newUser.call) {
        newUser.call.status = status;
        newUser.call.time = time;
      }
      return newUser;
    });

    const newFilteredUserList = state.filterUserList.consultants.map(
      (consultant) => {
        const { status, time, number } = callStatus;

        if (number !== consultant.number) return consultant;

        const newUser = _.cloneDeep(consultant);

        if (newUser.call) {
          newUser.call.status = status;
          newUser.call.time = time;
        }
        return newUser;
      },
    );

    return produce(state, (draft) => {
      draft.userList.consultants = newUserList;
      if (state.filterUserList.consultants.length > 0) {
        draft.filterUserList.consultants = newFilteredUserList;
      }
    });
  },
  [types.CHANGE_ZIBOX_STATUS]: (state, action) => {
    const ziboxStatus = _.cloneDeep(action.payload);
    Logger.log('CHANGE_ZIBOX_STATUS', ziboxStatus);

    const newUserList = state.userList.consultants.map((consultant) => {
      const {
        ats,
        connection,
        monit_user,
        monitoring,
        number,
        pc_ip,
        record,
        zibox_ip,
        zibox_mac,
      } = ziboxStatus;

      if (number !== consultant.number) return consultant;

      const newConsultant = _.cloneDeep(consultant);

      if (newConsultant.zibox) {
        newConsultant.zibox.ats = ats;
        newConsultant.zibox.connection = connection;
        newConsultant.zibox.monit_user = monit_user;
        newConsultant.zibox.monitoring = monitoring;
        newConsultant.zibox.pc_ip = pc_ip;
        newConsultant.zibox.record = record;
        newConsultant.zibox.zibox_ip = zibox_ip;
        newConsultant.zibox.zibox_mac = zibox_mac;
      }
      return newConsultant;
    });

    const newFilteredUserList = state.filterUserList.consultants.map(
      (consultant) => {
        const {
          ats,
          connection,
          monit_user,
          monitoring,
          number,
          pc_ip,
          record,
          zibox_ip,
          zibox_mac,
        } = ziboxStatus;

        if (number !== consultant.number) return consultant;

        const newConsultant = _.cloneDeep(consultant);

        if (newConsultant.zibox) {
          newConsultant.zibox.ats = ats;
          newConsultant.zibox.connection = connection;
          newConsultant.zibox.monit_user = monit_user;
          newConsultant.zibox.monitoring = monitoring;
          newConsultant.zibox.pc_ip = pc_ip;
          newConsultant.zibox.record = record;
          newConsultant.zibox.zibox_ip = zibox_ip;
          newConsultant.zibox.zibox_mac = zibox_mac;
        }

        return newConsultant;
      },
    );

    return produce(state, (draft) => {
      draft.userList.consultants = newUserList;
      if (state.filterUserList.consultants.length > 0) {
        draft.filterUserList.consultants = newFilteredUserList;
      }
    });
  },
  [types.CHANGE_CONSULTANT_STATUS]: (state, action) => {
    const consultantStatus = _.cloneDeep(action.payload);
    Logger.log('CHANGE_CONSULTANT_STATUS', consultantStatus);

    const newUserList = state.userList.consultants.map((consultant) => {
      const { status, number } = consultantStatus;

      if (number !== consultant.number) return consultant;

      const newUser = _.cloneDeep(consultant);

      if (newUser.consultant) {
        newUser.consultant.status = status;
      }
      return newUser;
    });

    const newFilteredUserList = state.filterUserList.consultants.map(
      (consultant) => {
        const { status, number } = consultantStatus;

        if (number !== consultant.number) return consultant;

        const newUser = _.cloneDeep(consultant);

        if (newUser.consultant) {
          newUser.consultant.status = status;
        }
        return newUser;
      },
    );

    return produce(state, (draft) => {
      draft.userList.consultants = newUserList;
      if (state.filterUserList.consultants.length > 0) {
        draft.filterUserList.consultants = newFilteredUserList;
      }
    });
  },
  [types.CHANGE_PHONE_STATUS]: (state, action) => {
    const phoneStatus = _.cloneDeep(action.payload);
    Logger.log('CHANGE_PHONE_STATUS', phoneStatus);

    const newUserList = state.userList.consultants.map((consultant) => {
      const { number, connection } = phoneStatus;

      if (number !== consultant.number) return consultant;

      const newUser = _.cloneDeep(consultant);

      if (newUser.phone) {
        newUser.phone.connection = connection;
      }
      return newUser;
    });

    const newFilteredUserList = state.filterUserList.consultants.map(
      (consultant) => {
        const { number, connection } = phoneStatus;

        if (number !== consultant.number) return consultant;

        const newUser = _.cloneDeep(consultant);

        if (newUser.phone) {
          newUser.phone.connection = connection;
        }
        return newUser;
      },
    );

    return produce(state, (draft) => {
      draft.userList.consultants = newUserList;
      if (state.filterUserList.consultants.length > 0) {
        draft.filterUserList.consultants = newFilteredUserList;
      }
    });
  },
  [types.CHANGE_ALL_RESET_STATUS]: (state, action) => {
    const { number, consultant, call, phone, zibox } = action.payload;

    const newUserList = state.userList.consultants.map((consultantData) => {
      if (number !== consultantData.number) return consultantData;

      const newConsultant = _.cloneDeep(consultantData);

      if (newConsultant.zibox) {
        newConsultant.zibox = zibox;
      }

      if (newConsultant.call) {
        newConsultant.call = call;
      }

      if (newConsultant.consultant) {
        newConsultant.consultant = consultant;
      }

      if (newConsultant.phone) {
        newConsultant.phone = phone;
      }

      return newConsultant;
    });

    const newFilteredUserList = state.filterUserList.consultants.map(
      (consultantData) => {
        if (number !== consultantData.number) return consultantData;

        const newConsultant = _.cloneDeep(consultantData);

        if (newConsultant.zibox) {
          newConsultant.zibox = zibox;
        }

        if (newConsultant.call) {
          newConsultant.call = call;
        }

        if (newConsultant.consultant) {
          newConsultant.consultant = consultant;
        }

        if (newConsultant.phone) {
          newConsultant.phone = phone;
        }

        return newConsultant;
      },
    );

    return produce(state, (draft) => {
      draft.userList.consultants = newUserList;
      if (state.filterUserList.consultants.length > 0) {
        draft.filterUserList.consultants = newFilteredUserList;
      }
    });
  },
  [types.CHANGE_MONIT_STATUS]: (state, action) => {
    // 삭제 예정
    return produce(state, (draft) => {
      // 고쳐야함
      // draft.monit.pc_ip = action.payload.number;
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

      if (newUser.admin_id === USER_TYPE.CONSULTANT) {
        // 추가한 유저 정보가 상담원인 경우
        if (state.userList.users.length > 4) {
          // 페이지가 넘어갈 경우
          draft.userList.users.unshift(newUser);
          draft.userList.users.pop();
        } else {
          draft.userList.users.unshift(newUser);
        }

        if (state.filterUserList.users.length > 0) {
          // 필터링한 정보를 보고 있을 경우
          if (
            state.filterUserList.users[0].branch_id === newUser.branch_id ||
            state.filterUserList.users[0].team_id === newUser.team_id
          ) {
            // 보고있는 지점과 팀에 넣은 경우
            if (state.filterUserList.users.length > 4) {
              draft.filterUserList.users.unshift(newUser);
              draft.filterUserList.users.pop();
            } else {
              draft.filterUserList.users.unshift(newUser);
            }
          }
        }

        const cons = _.cloneDeep(state.userList.consultants);
        cons.push(newUser);

        draft.userList.consultants = cons.sort((r1, r2) => {
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

        // draft.userList.consultants.push(value);
      } else if (newUser.admin_id === 1) {
        // 관리자일 경우
        if (state.userList.users.length > 4) {
          draft.userList.users.unshift(newUser);
          draft.userList.users.pop();
        } else {
          draft.userList.users.unshift(newUser);
        }

        if (state.filterUserList.users.length > 0) {
          if (
            state.filterUserList.users[0].branch_id === newUser.branch_id &&
            state.filterUserList.users[0].team_id === newUser.team_id
          ) {
            if (state.filterUserList.users.length > 4) {
              draft.filterUserList.users.unshift(newUser);
              draft.filterUserList.users.pop();
            } else {
              draft.filterUserList.users.unshift(newUser);
            }
          }
        }
      }

      draft.userList.numberOfUsers += 1;
    });
  },
  [types.MODIFY_USER]: (state, action) => {
    Logger.log('MODIFY_USER', action.payload);
    const branchId = action.payload.branch_id;
    const newUser = _.cloneDeep(action.payload.userInfo);

    return produce(state, (draft) => {
      if (newUser.branch_id !== branchId) return;
      if (newUser.admin_id === USER_TYPE.CONSULTANT) {
        // 상담원 수정 시
        if (draft.userList.users.length > 0) {
          let index = draft.userList.users.findIndex((values) => {
            return values.id === newUser.id;
          });

          if (index > -1) {
            draft.userList.users[index] = newUser;
          }
        }

        if (draft.userList.consultants.length > 0) {
          let index = draft.userList.consultants.findIndex((values) => {
            return values.id === newUser.id;
          });

          if (index > -1) {
            draft.userList.consultants[index] = newUser;
          }
        }

        if (draft.filterUserList.users.length > 0) {
          let index = draft.filterUserList.users.findIndex((values) => {
            return values.id === newUser.id;
          });

          if (index > -1) {
            draft.filterUserList.users[index] = newUser;
          }
        }

        if (draft.filterUserList.consultants.length > 0) {
          let index = draft.filterUserList.consultants.findIndex((values) => {
            return values.id === newUser.id;
          });
          if (index > -1) {
            draft.filterUserList.consultants[index] = newUser;
          }
        }
      } else if (newUser.admin_id === USER_TYPE.ADMIN) {
        if (draft.userList.users.length > 0) {
          let index = draft.userList.users.findIndex((values) => {
            return values.id === newUser.id;
          });

          if (index > -1) {
            draft.userList.users[index] = newUser;
          }
        }

        if (draft.userList.consultants.length > 0) {
          draft.userList.consultants = draft.userList.consultants.filter(
            (values) => {
              return values.id !== newUser.id;
            },
          );
        }

        if (draft.filterUserList.users.length > 0) {
          let index = draft.filterUserList.users.findIndex((values) => {
            return values.id === newUser.id;
          });

          if (index > -1) {
            draft.filterUserList.users[index] = newUser;
          }
        }

        if (draft.filterUserList.consultants.length > 0) {
          draft.filterUserList.consultants = draft.filterUserList.consultants.filter(
            (values) => {
              return values.id !== newUser.id;
            },
          );
        }
      }
    });
  },
  [types.SET_CALCULATED_CALL_TIME]: (state, action) => {
    const { local_time, server_time } = action.payload;

    return produce(state, (draft) => {
      state.userList.consultants.map((consultant, i) => {
        if (consultant.call?.time) {
          const callingTime = Utils.getLocalDiffTime(
            consultant.call?.time,
            local_time,
            server_time,
          );
          draft.userList.consultants[i].calling_time = callingTime;
        }
      });

      if (state.filterUserList.consultants.length > 0) {
        state.filterUserList.consultants.map((consultant, i) => {
          if (consultant.call?.time) {
            const callingTime = Utils.getLocalDiffTime(
              consultant.call?.time,
              local_time,
              server_time,
            );
            draft.filterUserList.consultants[i].calling_time = callingTime;
          }
        });
      }
    });
  },
});

export default userReducer;
