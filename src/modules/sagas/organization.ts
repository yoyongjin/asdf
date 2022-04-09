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
} from 'modules/actions/organization';
import ZMSOrganization from 'lib/api/zms/organization';
import { ResponseFailureData, ResponseSuccessData } from 'types/common';
import { API_FETCH } from 'utils/constants';

function* getOrganizationProcess(
  action: ReturnType<typeof requestGetOrganization>,
) {
  try {
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

    alert(error_msg);
  } catch (error) {
    let message = '';

    if (error instanceof Error) {
      message = error.message;
    }

    yield put(failureGetOrganization(message));
  }
}

function* getBranchProcess(action: ReturnType<typeof requestGetBranch>) {
  const { isIndividual } = action.payload;
  try {
    const response: ResponseSuccessData | ResponseFailureData = yield call(
      ZMSOrganization.getBranches,
    );

    if (response.status === API_FETCH.SUCCESS) {
      const { data } = response as ResponseSuccessData;

      if (isIndividual) {
        // 개인의 지점 가져오기
        yield put(successGetUserBranch(data.branchs));

        return;
      }

      yield put(successGetBranch(data.branchs));

      return;
    }

    const { error_msg } = response as ResponseFailureData;
    yield put(failureGetBranch(error_msg));

    alert(error_msg);
  } catch (error) {
    let message = '';

    if (error instanceof Error) {
      message = error.message;
    }

    yield put(failureGetBranch(message));
  }
}

function* getPluralBranchProcess(
  action: ReturnType<typeof requestGetPluralBranch>,
) {
  try {
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

    alert(error_msg);
  } catch (error) {
    let message = '';

    if (error instanceof Error) {
      message = error.message;
    }

    yield put(failureGetPluralBranch(message));
  }
}

function* getTeamProcess(action: ReturnType<typeof requestGetTeam>) {
  const { branch_id, isIndividual } = action.payload;
  try {
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

    alert(error_msg);
  } catch (error) {
    // yield put(failureGetOrganization(error.message));
  }
}

function* addBranchProcess(action: ReturnType<typeof requestAddBranch>) {
  const { name } = action.payload;

  try {
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

      return;
    }

    const { error_msg } = response as ResponseFailureData;
    yield put(failureAddBranch(error_msg));

    alert(error_msg);
  } catch (error) {
    let message = '';

    if (error instanceof Error) {
      message = error.message;
    }

    yield put(failureAddBranch(message));
  }
}

function* addTeamProcess(action: ReturnType<typeof requestAddTeam>) {
  const { name, branch_id, team_id } = action.payload;

  try {
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

      return;
    }

    const { error_msg } = response as ResponseFailureData;
    yield put(failureAddTeam(error_msg));

    alert(error_msg);
  } catch (error) {
    let message = '';

    if (error instanceof Error) {
      message = error.message;
    }

    yield put(failureAddTeam(message));
  }
}

function* modifyBranchProcess(action: ReturnType<typeof requestModifyBranch>) {
  const { id, name } = action.payload;

  try {
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

      return;
    }

    const { error_msg } = response as ResponseFailureData;
    yield put(failureModifyBranch(error_msg));

    alert(error_msg);
  } catch (error) {
    let message = '';

    if (error instanceof Error) {
      message = error.message;
    }

    yield put(failureModifyBranch(message));
  }
}

function* modifyTeamProcess(action: ReturnType<typeof requestModifyTeam>) {
  const { id: team_id, name, branch_id } = action.payload;
  try {
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

      return;
    }

    const { error_msg } = response as ResponseFailureData;
    yield put(failureModifyTeam(error_msg));

    alert(error_msg);
  } catch (error) {
    let message = '';

    if (error instanceof Error) {
      message = error.message;
    }

    yield put(failureModifyTeam(message));
  }
}

function* removeBranchProcess(action: ReturnType<typeof requestRemoveBranch>) {
  const { id } = action.payload;

  try {
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

      return;
    }

    const { error_msg } = response as ResponseFailureData;
    yield put(failureRemoveBranch(error_msg));

    alert(error_msg);
  } catch (error) {
    let message = '';

    if (error instanceof Error) {
      message = error.message;
    }

    yield put(failureRemoveBranch(message));
  }
}

function* removeTeamProcess(action: ReturnType<typeof requestRemoveTeam>) {
  const { branch_id, team_id } = action.payload;
  try {
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

      return;
    }

    const { error_msg } = response as ResponseFailureData;
    yield put(failureRemoveTeam(error_msg));

    alert(error_msg);
  } catch (error) {
    let message = '';

    if (error instanceof Error) {
      message = error.message;
    }

    yield put(failureRemoveTeam(message));
  }
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
  ]);
}

export default branchSaga;
