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
  successGetUserBranchList,
  successGetUserTeamList,
  REQUEST_DELETE_TEAM_INFO,
  requestDeleteTeamInfo,
  successDeleteTeamInfo,
  successDeleteBranchInfo,
  REQUEST_DELETE_BRANCH_INFO,
  requestDeleteBranchInfo,
} from 'modules/actions/branch';
import * as API from 'lib/api';
import Logger from 'utils/log';

function* getBranchInfoProcess(
  action: ReturnType<typeof requestGetBranchInfo>,
) {
  try {
    const response = yield call(API.getBranchInfo);
    Logger.log('branch Data =>', response);
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
    Logger.log('insert branch Data =>', response);
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
    Logger.log('insert team Data =>', response);
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
    Logger.log('update team Data =>', response);
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
    Logger.log('update branch Data =>', response);
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
    const { type } = action.payload;
    const response = yield call(API.getBranchList);
    Logger.log('get branch list Data =>', response);
    const { status, data } = response.data;
    if (status === 'success') {
      if (type) {
        yield put(successGetBranchList(data.branchs));
      } else {
        yield put(successGetUserBranchList(data.branchs));
      }
    }
  } catch (error) {
    console.log(error);
  }
}

function* getTeamList(action: ReturnType<typeof requestGetTeamList>) {
  const { branch_id, type } = action.payload;
  try {
    const response = yield call(API.getTeamList, branch_id);
    Logger.log('get team list Data =>', response);
    const { status, data } = response.data;

    if (status === 'success') {
      if (type) {
        yield put(successGetTeamList(data.teams));
      } else {
        yield put(successGetUserTeamList(data.teams));
      }
    }
  } catch (error) {
    console.log(error);
  }
}

function* deleteBranchProcess(
  action: ReturnType<typeof requestDeleteBranchInfo>,
) {
  try {
    const { branch_id } = action.payload;
    const response = yield call(API.deleteBranch, branch_id);
    Logger.log('delete branch Data =>', response);
    const { data, status } = response.data;

    if (status === 'success') {
      const payload = {
        branch_id: Number(data.id),
        count: data.count ? data.count : 0,
      };
      yield put(successDeleteBranchInfo(payload));
    }
  } catch (error) {
    console.log(error);
  }
}

function* deleteTeamProcess(action: ReturnType<typeof requestDeleteTeamInfo>) {
  try {
    const { branch_id, team_id } = action.payload;
    const response = yield call(API.deleteTeam, branch_id, team_id);
    Logger.log('delete team Data =>', response);
    const { data, status } = response.data;

    if (status === 'success') {
      const payload = {
        branch_id,
        team_id: Number(data.id),
        count: data.count || 0,
      };
      yield put(successDeleteTeamInfo(payload));
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

function* watchDeleteTeam() {
  yield takeLatest(REQUEST_DELETE_TEAM_INFO, deleteTeamProcess);
}

function* watchDeleteBranch() {
  yield takeLatest(REQUEST_DELETE_BRANCH_INFO, deleteBranchProcess);
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
    fork(watchDeleteTeam),
    fork(watchDeleteBranch),
  ]);
}

export default branchSaga;
