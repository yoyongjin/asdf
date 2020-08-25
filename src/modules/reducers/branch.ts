import { createReducer } from 'typesafe-actions';
import produce from 'immer';

import * as types from 'modules/actions/branch';
import { BranchAction, BranchType } from 'modules/types/branch';

const initialState: BranchType<string> = {
  branch: {
    fetch: false,
    error: false,
  },
  insertBranch: {
    fetch: false,
    error: false,
  },
  updateBranch: {
    fetch: false,
    error: false,
  },
  deleteBranch: {
    fetch: false,
    error: false,
  },
  insertTeam: {
    fetch: false,
    error: false,
  },
  updateTeam: {
    fetch: false,
    error: false,
  },
  deleteTeam: {
    fetch: false,
    error: false,
  },
  branchName: {
    fetch: false,
    error: false,
  },
  branchInfo: {},
  numberOfBranch: 0,
  namesList: {
    branch: [],
    team: [],
    userBranch: [],
    userTeam: [],
  },
};

const userReducer = createReducer<BranchType<string>, BranchAction>(
  initialState,
  {
    [types.REQUEST_GET_BRANCH_INFO]: (state, action) => {
      return produce(state, (draft) => {
        draft.branch.fetch = true;
        draft.branch.error = false;
      });
    },
    [types.SUCCESS_GET_BRANCH_INFO]: (state, action) => {
      let keys = Object.keys(action.payload);
      let values = Object.values(action.payload);
      let temp = {};

      console.log(keys)
      console.log(values)

      keys.map((value, i) => {
        // 팀명 입력할 수 있는 란을 만들기 위해 추가
        values[i].push({
          branch_id: Number(value),
          id: 0,
          team_name: '',
        });
        temp = {
          ...temp,
          [value]: values[i],
        };
      });

      return produce(state, (draft) => {
        draft.branch.fetch = false;
        draft.branch.error = false;
        draft.branchInfo = temp;
        draft.numberOfBranch = keys.length;
      });
    },
    [types.FAILURE_GET_BRANCH_INFO]: (state, action) => {
      return produce(state, (draft) => {
        draft.branch.fetch = false;
        draft.branch.error = true;
      });
    },
    [types.ADD_TEMPERATURE_BRANCH_INFO]: (state, action) => {
      let keys = Object.keys(state.branchInfo);
      // const index = Number(keys[keys.length - 1]) + 1;
      return produce(state, (draft) => {
        draft.branchInfo = {
          ...draft.branchInfo,
          temp: [
            {
              id: 'temp',
              branch_name: '',
            },
            {
              branch_id: 'temp',
              id: 0,
              team_name: '',
            },
          ],
        };
        draft.numberOfBranch = keys.length;
      });
    },
    [types.ADD_TEMPERATURE_TEAM_INFO]: (state, action) => {
      // let keys = Object.keys(state.branchInfo).sort(
      //   (e1: string, e2: string) => {
      //     return Number(e1) - Number(e2);
      //   },
      // );
      const { branch_id } = action.payload;
      // const index = Number(keys[keys.length - 1]) + 1;

      return produce(state, (draft) => {
        const _draft: any = draft.branchInfo;

        _draft[branch_id].push({
          branch_id,
          id: 0,
          team_name: '',
        });
        // draft.branchInfo = {
        //   ...draft.branchInfo,
        //   [index]: [
        //     {
        //       branch_id: index,
        //       id: 0,
        //       team_name: '',
        //     },
        //   ],
        // };
      });
    },
    [types.REQUEST_ADD_BRANCH_INFO]: (state, action) => {
      return produce(state, (draft) => {
        draft.insertBranch.fetch = true;
        draft.insertBranch.error = false;
      });
    },
    [types.REQUEST_ADD_TEAM_INFO]: (state, action) => {
      return produce(state, (draft) => {
        draft.insertTeam.fetch = true;
        draft.insertTeam.error = false;
      });
    },
    [types.SUCCESS_ADD_BRANCH_INFO]: (state, action) => {
      console.log(action);
      console.log(state);
      const { name, id } = action.payload;
      return produce(state, (draft) => {
        draft.insertBranch.fetch = false;
        draft.insertBranch.error = false;
        draft.branchInfo = {
          ...draft.branchInfo,
          [id]: [
            {
              id: id,
              branch_name: name,
            },
            {
              branch_id: id,
              id: 0,
              team_name: '',
            },
          ],
        };

        const _draft: any = draft.branchInfo;
        delete _draft.temp;
        // _draft
      });
    },
    [types.SUCCESS_ADD_TEAM_INFO]: (state, action) => {
      const { branch_id, before_id, next_id, name } = action.payload;

      return produce(state, (draft) => {
        draft.insertTeam.fetch = false;
        draft.insertTeam.error = false;

        const _draft: any = draft.branchInfo;

        _draft[branch_id][_draft[branch_id].length - 1].id = next_id;
        _draft[branch_id][_draft[branch_id].length - 1].team_name = name;
        _draft[branch_id].push({
          branch_id,
          id: 0,
          team_name: '',
        });
      });
    },
    [types.REQEUST_UPDATE_TEAM_INFO]: (state, action) => {
      return produce(state, (draft) => {
        draft.updateTeam.fetch = true;
        draft.updateTeam.error = false;
      });
    },
    [types.SUCCESS_UPDATE_TEAM_INFO]: (state, action) => {
      const { branch_id, id, name } = action.payload;
      return produce(state, (draft) => {
        const _draft: any = draft.branchInfo;
        const index = _draft[branch_id].findIndex((value: any) => {
          return value.team_name && value.id === id;
        });

        draft.updateTeam.fetch = false;
        draft.updateTeam.error = false;
        _draft[branch_id][index].team_name = name;
      });
    },
    [types.SUCCESS_UPDATE_BRANCH_INFO]: (state, action) => {
      return produce(state, (draft) => {
        const { id, name } = action.payload;
        draft.updateTeam.fetch = false;
        draft.updateTeam.error = false;

        const _draft: any = draft.branchInfo;
        const index = _draft[id].findIndex((value: any) => {
          return value.branch_name && value.id === id;
        });
        _draft[id][index].branch_name = name;
      });
    },
    [types.REQUEST_GET_BRANCH_LIST]: (state, action) => {
      return produce(state, (draft) => {
        draft.branchName.fetch = true;
        draft.branchName.error = false;
      });
    },
    [types.SUCCESS_GET_BRANCH_LIST]: (state, action) => {
      return produce(state, (draft) => {
        draft.branchName.fetch = false;
        draft.branchName.error = false;
        action.payload.push({
          id: -1,
          branch_name: '지점명',
          created_at: '',
        });
        console.log(action.payload);
        draft.namesList.branch = action.payload.reverse();
      });
    },
    [types.REQUEST_GET_TEAM_LIST]: (state, action) => {
      return produce(state, (draft) => {
        draft.branchName.fetch = true;
        draft.branchName.error = false;
      });
    },
    [types.SUCCESS_GET_TEAM_LIST]: (state, action) => {
      return produce(state, (draft) => {
        draft.branchName.fetch = false;
        draft.branchName.error = false;
        action.payload.push({
          id: -1,
          team_name: '팀명',
          branch_id: -1,
        });
        draft.namesList.team = action.payload.reverse();
      });
    },
    [types.SUCCESS_GET_USER_BRANCH_LIST]: (state, action) => {
      return produce(state, (draft) => {
        draft.branchName.fetch = false;
        draft.branchName.error = false;
        action.payload.push({
          id: -1,
          branch_name: '지점명',
          created_at: '',
        });
        draft.namesList = {
          ...draft.namesList,
          userBranch: action.payload.reverse(),
        };
      });
    },
    [types.SUCCESS_GET_USER_TEAM_LIST]: (state, action) => {
      return produce(state, (draft) => {
        draft.branchName.fetch = false;
        draft.branchName.error = false;
        action.payload.push({
          id: -1,
          team_name: '팀명',
          branch_id: -1,
        });
        draft.namesList = {
          ...draft.namesList,
          userTeam: action.payload.reverse(),
        };
      });
    },
    [types.INIT_BRANCH_LIST]: (state, action) => {
      return produce(state, draft => {
        console.log(action.payload)
        draft.namesList.userBranch = [action.payload];
      })
    },
    [types.INIT_TEAM_LST]: (state, action) => {
      return produce(state, draft => {
        draft.namesList.userTeam = [];
      })
    },
    [types.REQUEST_DELETE_BRANCH_INFO]: (state, action) => {
      return produce(state, (draft) => {
        draft.deleteBranch.fetch = true;
        draft.deleteBranch.error = false;
      });
    },
    [types.SUCCESS_DELETE_BRANCH_INFO]: (state, action) => {
      const { branch_id } = action.payload;
      return produce(state, (draft) => {
        draft.deleteBranch.fetch = false;
        draft.deleteBranch.error = false;

        const _draft: any = draft.branchInfo;
        delete _draft.branchInfo[branch_id]
      });
    },
    [types.REQUEST_DELETE_TEAM_INFO]: (state, action) => {
      return produce(state, (draft) => {
        draft.deleteTeam.fetch = true;
        draft.deleteTeam.error = false;
      });
    },
    [types.SUCCESS_DELETE_TEAM_INFO]: (state, action) => {
      const { branch_id, team_id } = action.payload;
      return produce(state, (draft) => {
        draft.deleteTeam.fetch = false;
        draft.deleteTeam.error = false;
        const _draft: any = draft.branchInfo;
        const newTeamInfo = _draft[branch_id].filter((value: any) => {
          return value.id !== team_id;
        });
        _draft[branch_id] = newTeamInfo;
      });
    },
  },
);

export default userReducer;
