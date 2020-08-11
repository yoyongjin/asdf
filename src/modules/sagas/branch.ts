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
  successAddTeamInfo,
  requestUpdateTeamInfo,
  REQEUST_UPDATE_TEAM_INFO,
  successUpdateTeamInfo,
  requestUpdateBranchInfo,
  REQUEST_UPDATE_BRANCH_INFO,
  successUpdateBranchInfo,
  requestGetBranchList,
  REQUEST_GET_BRANCH_LIST,
  successGetBranchList,
  requestGetTeamList,
  REQUEST_GET_TEAM_LIST,
  successGetTeamList,
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
    console.log('insert branch Data =>', response);
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
    const { name, branch_id, team_id } = action.payload;
    const response = yield call(API.insertTeam, name, branch_id);
    console.log('insert team Data =>', response);
    const { data, status } = response.data;

    if (status === 'success') {
      const payload = {
        branch_id,
        before_id: team_id,
        next_id: data,
        name,
      };
      yield put(successAddTeamInfo(payload));
    }
  } catch (error) {
    console.log(error);
  }
}

function* updateTeam(action: ReturnType<typeof requestUpdateTeamInfo>) {
  try {
    const { id, name, branch_id } = action.payload;
    const response = yield call(API.updateTeam, id, name);
    console.log('update team Data =>', response);
    const { data, status } = response.data;

    if (status === 'success') {
      const payload = {
        id: Number(data.id),
        name,
        branch_id,
      };
      yield put(successUpdateTeamInfo(payload));
    }
  } catch (error) {
    console.log(error);
  }
}

function* updateBranch(action: ReturnType<typeof requestUpdateBranchInfo>) {
  try {
    const { id, name } = action.payload;
    const response = yield call(API.updateBranch, id, name);
    console.log('update branch Data =>', response);
    const { data, status } = response.data;

    if (status === 'success') {
      const payload = {
        id: Number(data.id),
        name,
      };
      yield put(successUpdateBranchInfo(payload));
    }
  } catch (error) {
    console.log(error);
  }
}

function* getBranchList(action: ReturnType<typeof requestGetBranchList>) {
  try {
    const response = yield call(API.getBranchList);
    console.log('get branch list Data =>', response);
    const { status, data } = response.data;
    if (status === 'success') {
      console.log(data.branchs);
      yield put(successGetBranchList(data.branchs));
    }
  } catch (error) {
    console.log(error);
  }
}

function* getTeamList(action: ReturnType<typeof requestGetTeamList>) {
  const { branch_id } = action.payload;
  try {
    const response = yield call(API.getTeamList, branch_id);
    console.log('get team list Data =>', response);
    const { status, data } = response.data;

    if (status === 'success') {
      console.log(data.teams);
      yield put(successGetTeamList(data.teams));
    }
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

function* watchUpdateTeam() {
  yield takeLatest(REQEUST_UPDATE_TEAM_INFO, updateTeam);
}

function* watchUpdateBranch() {
  yield takeLatest(REQUEST_UPDATE_BRANCH_INFO, updateBranch);
}

function* watchGetBranchList() {
  yield takeLatest(REQUEST_GET_BRANCH_LIST, getBranchList);
}

function* watchGetTeamList() {
  yield takeLatest(REQUEST_GET_TEAM_LIST, getTeamList);
}

function* branchSaga() {
  yield all([
    fork(watchGetBranchInfo),
    fork(watchInsertBranch),
    fork(watchInsertTeam),
    fork(watchUpdateTeam),
    fork(watchUpdateBranch),
    fork(watchGetBranchList),
    fork(watchGetTeamList),
  ]);
}

export default branchSaga;
