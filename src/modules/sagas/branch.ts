import { all, call, fork, takeLatest } from 'redux-saga/effects';

import {
  requestGetBranchInfo,
  REQUEST_GET_BRANCH_INFO,
} from 'modules/actions/branch';
import * as API from 'lib/api';

function* getBranchInfoProcess(
  action: ReturnType<typeof requestGetBranchInfo>,
) {
  try {
    const response = yield call(API.getBranchInfo);

    console.log('branch Data =>', response);
  } catch (error) {
    console.log(error);
  }
}

function* watchGetBranchInfo() {
  yield takeLatest(REQUEST_GET_BRANCH_INFO, getBranchInfoProcess);
}

function* branchSaga() {
  yield all([fork(watchGetBranchInfo)]);
}

export default branchSaga;
