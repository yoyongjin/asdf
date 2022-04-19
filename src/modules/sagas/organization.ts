import { all, call, fork, takeLatest, put } from 'redux-saga/effects';

import {
  requestGetOrganization,
  REQUEST_GET_ORGANIZATION,
  successGetOrganization,
  failureGetOrganization,
  REQUEST_ADD_BRANCH,
  requestAddBranch,
  REQUEST_ADD_TEAM,
  requestAddTeam,
  successAddBranch,
  successAddTeam,
  requestModifyTeam,
  REQEUST_MODIFY_TEAM,
  successModifyTeam,
  requestModifyBranch,
  REQUEST_MODIFY_BRANCH,
  successModifyBranch,
  requestGetBranch,
  REQUEST_GET_BRANCH,
  successGetBranch,
  requestGetTeam,
  REQUEST_GET_TEAM,
  successGetTeam,
  successGetUserBranch,
  successGetUserTeam,
  REQUEST_REMOVE_TEAM,
  requestRemoveTeam,
  successRemoveTeam,
  successRemoveBranch,
  REQUEST_REMOVE_BRANCH,
  requestRemoveBranch,
  failureAddBranch,
  failureAddTeam,
  failureModifyBranch,
  failureModifyTeam,
  failureRemoveBranch,
  failureRemoveTeam,
  failureGetBranch,
  requestGetPluralBranch,
  successGetPluralBranch,
  failureGetPluralBranch,
  REQUEST_GET_PLURAL_BRANCH,
  requestGetPluralTeam,
  successGetPluralTeam,
  failureGetPluralTeam,
  REQUEST_GET_PLURAL_TEAM,
} from 'modules/actions/organization';
import ZMSOrganization from 'lib/api/zms/organization';
import { ResponseFailureData, ResponseSuccessData } from 'types/common';
import { API_FETCH } from 'utils/constants';
import Toast from 'utils/toast';

function* getOrganizationProcess(
  action: ReturnType<typeof requestGetOrganization>,
) {
  const response: ResponseSuccessData | ResponseFailureData = yield call(
    ZMSOrganization.getOrganization,
  );

  if (response.status === API_FETCH.SUCCESS) {
    const { data } = response as ResponseSuccessData;
    const { ...rest } = data;

    yield put(successGetOrganization(rest));

    return;
  }

  const { error_msg } = response as ResponseFailureData;
  yield put(failureGetOrganization(error_msg));

  Toast.error(`요청에 실패했어요..😭\n(${error_msg})`);
}

function* getBranchProcess(action: ReturnType<typeof requestGetBranch>) {
  const { isIndividual } = action.payload;

  const response: ResponseSuccessData | ResponseFailureData = yield call(
    ZMSOrganization.getBranches,
  );

  if (response.status === API_FETCH.SUCCESS) {
    const { data } = response as ResponseSuccessData;

    if (isIndividual) {
      // 개인의 센터 가져오기
      yield put(successGetUserBranch(data.branchs));

      return;
    }

    yield put(successGetBranch(data.branchs));

    return;
  }

  const { error_msg } = response as ResponseFailureData;
  yield put(failureGetBranch(error_msg));

  Toast.error(`요청에 실패했어요..😭\n(${error_msg})`);
}

function* getPluralBranchProcess(
  action: ReturnType<typeof requestGetPluralBranch>,
) {
  const response: ResponseSuccessData | ResponseFailureData = yield call(
    ZMSOrganization.getPluralBranch,
  );

  if (response.status === API_FETCH.SUCCESS) {
    const { data } = response as ResponseSuccessData;

    yield put(successGetPluralBranch(data));

    return;
  }

  const { error_msg } = response as ResponseFailureData;
  yield put(failureGetPluralBranch(error_msg));

  Toast.error(`요청에 실패했어요..😭\n(${error_msg})`);
}

function* getPluralTeamProcess(
  action: ReturnType<typeof requestGetPluralTeam>,
) {
  const { ids } = action.payload;

  const response: ResponseSuccessData | ResponseFailureData = yield call(
    ZMSOrganization.getPluralTeam,
    ids,
  );

  if (response.status === API_FETCH.SUCCESS) {
    const { data } = response as ResponseSuccessData;

    yield put(successGetPluralTeam(data));

    return;
  }

  const { error_msg } = response as ResponseFailureData;
  yield put(failureGetPluralTeam(error_msg));

  Toast.error(`요청에 실패했어요..😭\n(${error_msg})`);
}

function* getTeamProcess(action: ReturnType<typeof requestGetTeam>) {
  const { branch_id, isIndividual } = action.payload;

  const response: ResponseSuccessData | ResponseFailureData = yield call(
    ZMSOrganization.getTeams,
    branch_id,
  );

  if (response.status === API_FETCH.SUCCESS) {
    const { data } = response as ResponseSuccessData;

    if (isIndividual) {
      // 개인의 팀 가져오기
      yield put(successGetUserTeam(data.teams));

      return;
    }

    yield put(successGetTeam(data.teams));

    return;
  }

  const { error_msg } = response as ResponseFailureData;
  // yield put(failureGetOrganization(error_msg));

  Toast.error(`요청에 실패했어요..😭\n(${error_msg})`);
}

function* addBranchProcess(action: ReturnType<typeof requestAddBranch>) {
  const { name } = action.payload;

  const response: ResponseSuccessData | ResponseFailureData = yield call(
    ZMSOrganization.addBranch,
    name,
  );

  if (response.status === API_FETCH.SUCCESS) {
    const { data } = response as ResponseSuccessData;

    const payload = {
      id: data,
      name,
    };

    yield put(successAddBranch(payload));

    Toast.success('추가 완료😊');

    return;
  }

  const { error_msg } = response as ResponseFailureData;
  yield put(failureAddBranch(error_msg));

  Toast.error(`요청에 실패했어요..😭\n(${error_msg})`);
}

function* addTeamProcess(action: ReturnType<typeof requestAddTeam>) {
  const { name, branch_id, team_id } = action.payload;

  const response: ResponseSuccessData | ResponseFailureData = yield call(
    ZMSOrganization.addTeam,
    branch_id,
    name,
  );

  if (response.status === API_FETCH.SUCCESS) {
    const { data } = response as ResponseSuccessData;

    const payload = {
      branch_id,
      before_id: team_id,
      next_id: data,
      name,
    };

    yield put(successAddTeam(payload));

    Toast.success('추가 완료😊');

    return;
  }

  const { error_msg } = response as ResponseFailureData;
  yield put(failureAddTeam(error_msg));

  Toast.error(`요청에 실패했어요..😭\n(${error_msg})`);
}

function* modifyBranchProcess(action: ReturnType<typeof requestModifyBranch>) {
  const { id, name } = action.payload;

  const response: ResponseSuccessData | ResponseFailureData = yield call(
    ZMSOrganization.modifyBranch,
    id,
    name,
  );

  if (response.status === API_FETCH.SUCCESS) {
    const { data } = response as ResponseSuccessData;

    const payload = {
      id: Number(data.id),
      name,
    };

    yield put(successModifyBranch(payload));

    Toast.success('수정 완료😊');

    return;
  }

  const { error_msg } = response as ResponseFailureData;
  yield put(failureModifyBranch(error_msg));

  Toast.error(`요청에 실패했어요..😭\n(${error_msg})`);
}

function* modifyTeamProcess(action: ReturnType<typeof requestModifyTeam>) {
  const { id: team_id, name, branch_id } = action.payload;

  const response: ResponseSuccessData | ResponseFailureData = yield call(
    ZMSOrganization.modifyTeam,
    team_id,
    branch_id,
    name,
  );

  if (response.status === API_FETCH.SUCCESS) {
    const { data } = response as ResponseSuccessData;

    const payload = {
      id: Number(data.id),
      name,
      branch_id,
    };

    yield put(successModifyTeam(payload));

    Toast.success('수정 완료😊');

    return;
  }

  const { error_msg } = response as ResponseFailureData;
  yield put(failureModifyTeam(error_msg));

  Toast.error(`요청에 실패했어요..😭\n(${error_msg})`);
}

function* removeBranchProcess(action: ReturnType<typeof requestRemoveBranch>) {
  const { id } = action.payload;

  const response: ResponseSuccessData | ResponseFailureData = yield call(
    ZMSOrganization.removeBranch,
    id,
  );

  if (response.status === API_FETCH.SUCCESS) {
    const { data } = response as ResponseSuccessData;

    const payload = {
      branch_id: Number(data.id),
    };

    yield put(successRemoveBranch(payload));

    Toast.success('삭제 완료😊');

    return;
  }

  const { error_msg } = response as ResponseFailureData;
  yield put(failureRemoveBranch(error_msg));

  Toast.error(`요청에 실패했어요..😭\n(${error_msg})`);
}

function* removeTeamProcess(action: ReturnType<typeof requestRemoveTeam>) {
  const { branch_id, team_id } = action.payload;

  const response: ResponseSuccessData | ResponseFailureData = yield call(
    ZMSOrganization.removeTeam,
    branch_id,
    team_id,
  );

  if (response.status === API_FETCH.SUCCESS) {
    const { data } = response as ResponseSuccessData;

    const payload = {
      branch_id,
      team_id: Number(data.id),
      count: data.count || 0,
    };

    yield put(successRemoveTeam(payload));

    Toast.success('삭제 완료😊');

    return;
  }

  const { error_msg } = response as ResponseFailureData;
  yield put(failureRemoveTeam(error_msg));

  Toast.error(`요청에 실패했어요..😭\n(${error_msg})`);
}

function* watchGetOrganization() {
  yield takeLatest(REQUEST_GET_ORGANIZATION, getOrganizationProcess);
}

function* watchAddBranch() {
  yield takeLatest(REQUEST_ADD_BRANCH, addBranchProcess);
}

function* watchAddTeam() {
  yield takeLatest(REQUEST_ADD_TEAM, addTeamProcess);
}
function* watchModifyBranch() {
  yield takeLatest(REQUEST_MODIFY_BRANCH, modifyBranchProcess);
}

function* watchModifyTeam() {
  yield takeLatest(REQEUST_MODIFY_TEAM, modifyTeamProcess);
}

function* watchRemoveBranch() {
  yield takeLatest(REQUEST_REMOVE_BRANCH, removeBranchProcess);
}

function* watchRemoveTeam() {
  yield takeLatest(REQUEST_REMOVE_TEAM, removeTeamProcess);
}

function* watchGetBranch() {
  yield takeLatest(REQUEST_GET_BRANCH, getBranchProcess);
}

function* watchGetTeam() {
  yield takeLatest(REQUEST_GET_TEAM, getTeamProcess);
}

function* watchGetPluralBranch() {
  yield takeLatest(REQUEST_GET_PLURAL_BRANCH, getPluralBranchProcess);
}

function* wtachGetPluralTeam() {
  yield takeLatest(REQUEST_GET_PLURAL_TEAM, getPluralTeamProcess);
}

function* branchSaga() {
  yield all([
    fork(watchGetOrganization),
    fork(watchGetBranch),
    fork(watchGetTeam),
    fork(watchAddBranch),
    fork(watchAddTeam),
    fork(watchModifyBranch),
    fork(watchModifyTeam),
    fork(watchRemoveBranch),
    fork(watchRemoveTeam),
    fork(watchGetPluralBranch),
    fork(wtachGetPluralTeam),
  ]);
}

export default branchSaga;
