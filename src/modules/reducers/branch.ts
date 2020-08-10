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
  branchInfo: {},
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

      keys.map((value, i) => {
        // 팀명 입력할 수 있는 란을 만들기 위해 추가
        console.log(values[i]);
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
      });
    },
    [types.FAILURE_GET_BRANCH_INFO]: (state, action) => {
      return produce(state, (draft) => {
        draft.branch.fetch = false;
        draft.branch.error = true;
      });
    },
    [types.ADD_TEMPERATURE_BRANCH_INFO]: (state, action) => {
      let keys = Object.keys(state.branchInfo).sort(
        (e1: string, e2: string) => {
          return Number(e1) - Number(e2);
        },
      );
      const index = Number(keys[keys.length - 1]) + 1;
      return produce(state, (draft) => {
        draft.branchInfo = {
          ...draft.branchInfo,
          [index]: [
            {
              id: index,
              branch_name: '',
            },
            {
              branch_id: index,
              id: 0,
              team_name: '',
            },
          ],
        };
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
      return produce(state, (draft) => {
        draft.insertBranch.fetch = false;
        draft.insertBranch.error = false;
      });
    },
    [types.SUCCESS_ADD_TEAM_INFO]: (state, action) => {
      console.log(action);
      console.log(state);
      console.log(state.branchInfo)
      const { branch_id, before_id, next_id, name } = action.payload;

      return produce(state, (draft) => {
        draft.insertTeam.fetch = false;
        draft.insertTeam.error = false;

        const _draft : any = draft.branchInfo 

        _draft[branch_id][_draft[branch_id].length - 1].id = next_id
        _draft[branch_id][_draft[branch_id].length - 1].team_name = name
      });
    },
    // [types.CHANGE_INPUT]: (state, action) => {
    //   return produce(state, draft => {
    //     // console.log(action.payload);
    //     // console.log(state)
    //     for(let key in state.branchInfo) {
    //       console.log(key)
    //       console.log(state.branchInfo)
    //     }

    //     // draft.branchInfo =
    //     // draft.branchInfo
    //   })
    // }
  },
);

export default userReducer;
