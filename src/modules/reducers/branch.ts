import { createReducer } from 'typesafe-actions';
import produce from 'immer';

import * as types from 'modules/actions/branch';
import { BranchAction, BranchType } from 'modules/types/branch';

const initialState: BranchType = {
  branch: {
    fetch: false,
    error: false,
  },
  branchInfo: [],
};

const userReducer = createReducer<BranchType, BranchAction>(initialState, {
  [types.REQUEST_GET_BRANCH_INFO]: (state, action) => {
    return produce(state, (draft) => {
      draft.branch.fetch = true;
      draft.branch.error = false;
    });
  },
  [types.SUCCESS_GET_BRANCH_INFO]: (state, action) => {
    return produce(state, (draft) => {
      console.log(action);
      draft.branch.fetch = false;
      draft.branch.error = false;
    });
  },
  [types.FAILURE_GET_BRANCH_INFO]: (state, action) => {
    return produce(state, (draft) => {
      draft.branch.fetch = false;
      draft.branch.error = true;
    });
  },
});

export default userReducer;
