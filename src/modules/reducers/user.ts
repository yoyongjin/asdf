import { createReducer } from 'typesafe-actions';
import produce from 'immer';

import { ConsultantInfoType, UserAction, UserType } from 'modules/types/user';
import * as types from 'modules/actions/user';
import { getDiffTime } from 'utils/utils';

const initialState: UserType = {
  request: {
    getUser: {
      fetch: false,
      error: '',
    },
    getConsultant: {
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
};

const userReducer = createReducer<UserType, UserAction>(initialState, {
  [types.REQUEST_GET_USER_INFO]: (state, action) => {
    return produce(state, (draft) => {
      draft.request.getUser.fetch = true;
      draft.request.getUser.error = '';
    });
  },
  [types.SUCCESS_GET_USER_INFO]: (state, action) => {
    const { users, count, url } = action.payload;
    const consultant = users.filter((user) => {
      return user.admin_id === 0;
    });
    return produce(state, (draft) => {
      draft.request.getUser.fetch = false;
      draft.request.getUser.error = '';
      if (url === '/main') {
        draft.userList.consultants = consultant.sort((r1, r2) => {
          if (r1.branch_id === r2.branch_id) {
            // id가 같으면 team_name순 정렬 (레벨값 우선 정렬)
            if (r1.team_name !== r2.team_name) {
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
  [types.SUCCESS_GET_FILTER_USER_INFO]: (state, action) => {
    const { users, count, url } = action.payload;
    const consultant = users.filter((user) => {
      return user.admin_id === 0;
    });
    return produce(state, (draft) => {
      draft.request.getUser.fetch = false;
      draft.request.getUser.error = '';
      if (url === '/main') {
        draft.filterUserList.consultants = consultant.sort((r1, r2) => {
          if (r1.branch_id === r2.branch_id) {
            // id가 같으면 team_name순 정렬 (레벨값 우선 정렬)
            if (r1.team_name !== r2.team_name) {
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
        draft.filterUserList.users = users.sort((r1, r2) => r2.id - r1.id); // 등록 순서로 정렬
        draft.filterUserList.numberOfUsers = count;
      }
    });
  },
  [types.FAILURE_GET_USER_INFO]: (state, action) => {
    return produce(state, (draft) => {
      draft.request.getUser.fetch = false;
      draft.request.getUser.error = action.payload;
    });
  },
  [types.RUN_TIMER]: (state, action) => {
    return produce(state, (draft) => {
      state.userList.consultants.map((consultant, i) => {
        if (consultant.call_type === 'call_offhook' && consultant.call_time) {
          draft.userList.consultants[i].diff = getDiffTime(
            consultant.call_time,
          );
        }
      });

      if (state.filterUserList.consultants.length > 0) {
        state.filterUserList.consultants.map((consultant, i) => {
          if (consultant.call_type === 'call_offhook' && consultant.call_time) {
            draft.filterUserList.consultants[i].diff = getDiffTime(
              consultant.call_time,
            );
          }
        });
      }
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
    const newUserList = state.userList.consultants.map((user) => {
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

    const newFilteredUserList = state.filterUserList.consultants.map((user) => {
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
      draft.userList.consultants = newUserList;

      if (state.filterUserList.consultants.length > 0) {
        draft.filterUserList.consultants = newFilteredUserList;
      }
    });
  },
  [types.INSERT_USER]: (state, action) => {
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
    };
    return produce(state, (draft) => {
      if (branch_id !== action.payload.branch_id) return;
      if (admin_id === 0) {
        // 상담원일 경우
        if (state.userList.users.length > 4) {
          // 페이지가 넘어갈 경우
          draft.userList.users.unshift(value);
          draft.userList.users.pop();
        } else {
          draft.userList.users.unshift(value);
        }

        if (state.filterUserList.users.length > 0) {
          // 필터링한 정보를 보고 있을 경우
          if (
            state.filterUserList.users[0].branch_id === value.branch_id ||
            state.filterUserList.users[0].team_id === value.team_id
          ) {
            // 보고있는 지점과 팀에 넣은 경우
            if (state.filterUserList.users.length > 4) {
              draft.filterUserList.users.unshift(value);
              draft.filterUserList.users.pop();
            } else {
              draft.filterUserList.users.unshift(value);
            }
          }
        }

        // if(state.userList.consultants.length < 1) return;
        // draft.userList.numberOfUsers += 1;
        let cons = Object.assign(
          [],
          state.userList.consultants,
        ) as ConsultantInfoType[];
        cons.push(value);

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
      } else if (admin_id === 1) {
        // 관리자일 경우
        if (state.userList.users.length > 4) {
          draft.userList.users.unshift(value);
          draft.userList.users.pop();
        } else {
          draft.userList.users.unshift(value);
        }

        if (state.filterUserList.users.length > 0) {
          if (
            state.filterUserList.users[0].branch_id === value.branch_id &&
            state.filterUserList.users[0].team_id === value.team_id
          ) {
            if (state.filterUserList.users.length > 4) {
              draft.filterUserList.users.unshift(value);
              draft.filterUserList.users.pop();
            } else {
              draft.filterUserList.users.unshift(value);
            }
          }
        }
      }

      draft.userList.numberOfUsers += 1;
    });
  },
  [types.UPDATE_USER]: (state, action) => {
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
    };
    return produce(state, (draft) => {
      if (branch_id !== action.payload.branch_id) return;
      if (admin_id === 0) {
        // 상담원 수정 시
        if (draft.userList.users.length > 0) {
          let index = draft.userList.users.findIndex((values) => {
            return values.id === id;
          });

          if (index > -1) {
            draft.userList.users[index] = value;
          }
        }

        if (draft.userList.consultants.length > 0) {
          let index = draft.userList.consultants.findIndex((values) => {
            return values.id === id;
          });

          if (index > -1) {
            draft.userList.consultants[index].branch_id = branch_id;
            draft.userList.consultants[index].branch_name = branch_name;
            draft.userList.consultants[index].name = name;
            draft.userList.consultants[index].number = number;
            draft.userList.consultants[index].team_id = team_id;
            draft.userList.consultants[index].team_name = team_name;
            draft.userList.consultants[index].admin_id = admin_id;
            draft.userList.consultants[index].user_name = user_name;
            draft.userList.consultants[index].ziboxip = ziboxip;
          }
        }

        if (draft.filterUserList.users.length > 0) {
          let index = draft.filterUserList.users.findIndex((values) => {
            return values.id === id;
          });

          if (index > -1) {
            draft.filterUserList.users[index].branch_id = branch_id;
            draft.filterUserList.users[index].branch_name = branch_name;
            draft.filterUserList.users[index].name = name;
            draft.filterUserList.users[index].number = number;
            draft.filterUserList.users[index].team_id = team_id;
            draft.filterUserList.users[index].team_name = team_name;
            draft.filterUserList.users[index].admin_id = admin_id;
            draft.filterUserList.users[index].user_name = user_name;
            draft.filterUserList.users[index].ziboxip = ziboxip;
          }
        }

        if (draft.filterUserList.consultants.length > 0) {
          let index = draft.filterUserList.consultants.findIndex((values) => {
            return values.id === id;
          });
          if (index > -1) {
            draft.filterUserList.consultants[index].branch_id = branch_id;
            draft.filterUserList.consultants[index].branch_name = branch_name;
            draft.filterUserList.consultants[index].name = name;
            draft.filterUserList.consultants[index].number = number;
            draft.filterUserList.consultants[index].team_id = team_id;
            draft.filterUserList.consultants[index].team_name = team_name;
            draft.filterUserList.consultants[index].admin_id = admin_id;
            draft.filterUserList.consultants[index].user_name = user_name;
            draft.filterUserList.consultants[index].ziboxip = ziboxip;
          }
        }
      } else if (admin_id === 1) {
        // 관리자
        if (draft.userList.users.length > 0) {
          let index = draft.userList.users.findIndex((values) => {
            return values.id === id;
          });

          if (index > -1) {
            draft.userList.users[index] = value;
          }
        }

        if (draft.userList.consultants.length > 0) {
          draft.userList.consultants = draft.userList.consultants.filter(
            (values) => {
              return values.id !== id;
            },
          );
        }

        if (draft.filterUserList.users.length > 0) {
          let index = draft.filterUserList.users.findIndex((values) => {
            return values.id === id;
          });

          if (index > -1) {
            draft.filterUserList.users[index] = value;
          }
        }

        if (draft.filterUserList.consultants.length > 0) {
          draft.filterUserList.consultants = draft.filterUserList.consultants.filter(
            (values) => {
              return values.id !== id;
            },
          );
        }
      }
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
    const { type, time, number, monitoring_state, user_id } = action.payload;
    return produce(state, (draft) => {
      state.userList.consultants.map((values, i) => {
        if (values.number === number) {
          if (type === 'call_offhook') {
            draft.userList.consultants[i].call_time = Number(time);
          } else {
            draft.userList.consultants[i].call_time = 0;
            draft.userList.consultants[i].diff = 0;
          }
          draft.userList.consultants[i].call_type = type;
          if (monitoring_state === 'y') {
            draft.userList.consultants[i].monitoring = true;
            draft.userList.consultants[i].user_id = user_id;
          } else if (monitoring_state === 'n') {
            draft.userList.consultants[i].monitoring = false;
            draft.userList.consultants[i].user_id = user_id;
          }
        }
      });

      state.filterUserList.consultants.map((values, i) => {
        if (values.number === number) {
          if (type === 'call_offhook') {
            draft.filterUserList.consultants[i].call_time = Number(time);
          } else {
            draft.filterUserList.consultants[i].call_time = 0;
            draft.filterUserList.consultants[i].diff = 0;
          }
          draft.filterUserList.consultants[i].call_type = type;
          if (monitoring_state === 'y') {
            draft.filterUserList.consultants[i].monitoring = true;
            draft.filterUserList.consultants[i].user_id = user_id;
          } else if (monitoring_state === 'n') {
            draft.filterUserList.consultants[i].monitoring = false;
            draft.filterUserList.consultants[i].user_id = user_id;
          }
        }
      });
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
});

export default userReducer;
