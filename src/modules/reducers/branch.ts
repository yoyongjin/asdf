import { createReducer } from 'typesafe-actions';
import produce, { enableES5 } from 'immer';

import * as types from 'modules/actions/branch';
import { BranchAction, BranchType } from 'modules/types/branch';

enableES5();

const initialState: BranchType<string> = {
  branch: {
    fetch: false,
    error: '',
  },
  insertBranch: {
    fetch: false,
    error: '',
  },
  updateBranch: {
    fetch: false,
    error: '',
  },
  deleteBranch: {
    fetch: false,
    error: '',
  },
  insertTeam: {
    fetch: false,
    error: '',
  },
  updateTeam: {
    fetch: false,
    error: '',
  },
  deleteTeam: {
    fetch: false,
    error: '',
  },
  branchName: {
    fetch: false,
    error: '',
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
      });
    },
    [types.SUCCESS_GET_BRANCH_INFO]: (state, action) => {
      let keys = Object.keys(action.payload);
      let values = Object.values(action.payload);
      let temp = {};

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
        draft.branch.error = '';
        draft.branchInfo = temp;
        draft.numberOfBranch = keys.length;
      });
    },
    [types.FAILURE_GET_BRANCH_INFO]: (state, action) => {
      return produce(state, (draft) => {
        draft.branch.fetch = false;
        draft.branch.error = '';
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
        draft.insertBranch.error = '';
      });
    },
    [types.REQUEST_ADD_TEAM_INFO]: (state, action) => {
      return produce(state, (draft) => {
        draft.insertTeam.fetch = true;
        draft.insertTeam.error = '';
      });
    },
    [types.SUCCESS_ADD_BRANCH_INFO]: (state, action) => {
      const { name, id } = action.payload;
      return produce(state, (draft) => {
        draft.insertBranch.fetch = false;
        draft.insertBranch.error = '';
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
        draft.insertTeam.error = '';

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
        draft.updateTeam.error = '';
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
        draft.updateTeam.error = '';
        _draft[branch_id][index].team_name = name;
      });
    },
    [types.SUCCESS_UPDATE_BRANCH_INFO]: (state, action) => {
      return produce(state, (draft) => {
        const { id, name } = action.payload;
        draft.updateTeam.fetch = false;
        draft.updateTeam.error = '';

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
        draft.branchName.error = '';
      });
    },
    [types.SUCCESS_GET_BRANCH_LIST]: (state, action) => {
      return produce(state, (draft) => {
        draft.branchName.fetch = false;
        draft.branchName.error = '';
        action.payload.sort((r1, r2) => {
          return r1.branch_name < r2.branch_name
            ? 1
            : r1.branch_name > r2.branch_name
            ? -1
            : 0;
        });
        action.payload.push({
          id: -1,
          branch_name: '지점명',
          created_at: '',
        });
        draft.namesList.branch = action.payload.reverse();
      });
    },
    [types.REQUEST_GET_TEAM_LIST]: (state, action) => {
      return produce(state, (draft) => {
        draft.branchName.fetch = true;
        draft.branchName.error = '';
      });
    },
    [types.SUCCESS_GET_TEAM_LIST]: (state, action) => {
      return produce(state, (draft) => {
        draft.branchName.fetch = false;
        draft.branchName.error = '';
        action.payload.sort((r1, r2) => {
          return r1.team_name < r2.team_name
            ? 1
            : r1.team_name > r2.team_name
            ? -1
            : 0;
        });
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
        draft.branchName.error = '';
        action.payload.sort((r1, r2) => {
          return r1.branch_name < r2.branch_name
            ? 1
            : r1.branch_name > r2.branch_name
            ? -1
            : 0;
        });
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
        draft.branchName.error = '';
        action.payload.sort((r1, r2) => {
          return r1.team_name < r2.team_name
            ? 1
            : r1.team_name > r2.team_name
            ? -1
            : 0;
        });
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
      return produce(state, (draft) => {
        draft.namesList.userBranch = [action.payload];
      });
    },
    [types.INIT_TEAM_LST]: (state, action) => {
      return produce(state, (draft) => {
        draft.namesList.userTeam = [];
      });
    },
    [types.REQUEST_DELETE_BRANCH_INFO]: (state, action) => {
      return produce(state, (draft) => {
        draft.deleteBranch.fetch = true;
        draft.deleteBranch.error = '';
      });
    },
    [types.SUCCESS_DELETE_BRANCH_INFO]: (state, action) => {
      const { branch_id, count } = action.payload;
      return produce(state, (draft) => {
        draft.deleteBranch.fetch = false;
        draft.deleteBranch.error = '';

        if (count) {
          alert('해당 지점의 팀을 다 삭제 후 진행해주세요.');
          return;
        }

        const _draft: any = draft.branchInfo;
        delete _draft.branchInfo[branch_id];
      });
    },
    [types.REQUEST_DELETE_TEAM_INFO]: (state, action) => {
      return produce(state, (draft) => {
        draft.deleteTeam.fetch = true;
        draft.deleteTeam.error = '';
      });
    },
    [types.SUCCESS_DELETE_TEAM_INFO]: (state, action) => {
      const { branch_id, team_id, count } = action.payload;
      return produce(state, (draft) => {
        draft.deleteTeam.fetch = false;
        draft.deleteTeam.error = '';

        if (count) {
          alert('해당 팀의 유저를 다 삭제 후 진행해주세요.');
          return;
        }

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
