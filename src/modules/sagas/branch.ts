import { all, call, fork, takeLatest, put } from 'redux-saga/effects';

import {
  requestGetBranchInfo,
  REQUEST_GET_BRANCH_INFO,
  successGetBranchInfo,
  REQUEST_ADD_BRANCH_INFO,
  requestAddBranchInfo,
  REQUEST_ADD_TEAM_INFO,
  requestAddTeamInfo,
  successAddBranchInfo,
} from 'modules/actions/branch';
import * as API from 'lib/api';

function* getBranchInfoProcess(
  action: ReturnType<typeof requestGetBranchInfo>,
) {
  try {
    const response = yield call(API.getBranchInfo);
    console.log('branch Data =>', response);
    const { login_at, ...rest } = response.data.data;

    yield put(successGetBranchInfo(rest));
  } catch (error) {
    console.log(error);
  }
}

function* insertBranch(action: ReturnType<typeof requestAddBranchInfo>) {
  try {
    const { name } = action.payload;
    const response = yield call(API.insertBranch, name);
    console.log('insert Data =>', response);
    const { data, status } = response.data;

    if (status === 'success') {
      const payload = {
        id: data,
        name,
      };
      yield put(successAddBranchInfo(payload));
    }
  } catch (error) {
    console.log(error);
  }
}

function* insertTeam(action: ReturnType<typeof requestAddTeamInfo>) {
  try {
    const response = yield call(
      API.insertTeam,
      action.payload.name,
      action.payload.id,
    );
    console.log(response);
  } catch (error) {
    console.log(error);
  }
}

function* watchGetBranchInfo() {
  yield takeLatest(REQUEST_GET_BRANCH_INFO, getBranchInfoProcess);
}

function* watchInsertBranch() {
  yield takeLatest(REQUEST_ADD_BRANCH_INFO, insertBranch);
}

function* watchInsertTeam() {
  yield takeLatest(REQUEST_ADD_TEAM_INFO, insertTeam);
}

function* branchSaga() {
  yield all([
    fork(watchGetBranchInfo),
    fork(watchInsertBranch),
    fork(watchInsertTeam),
  ]);
}

export default branchSaga;
