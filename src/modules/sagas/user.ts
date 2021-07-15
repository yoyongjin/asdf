import { all, call, delay, fork, put, takeLatest } from 'redux-saga/effects';

import {
  requestGetUsers,
  REQUEST_GET_USERS,
  successGetUsers,
  failureGetUsers,
  requestAddUser,
  REQUEST_ADD_USER,
  successAddUser,
  failureAddUser,
  requestModifyUser,
  successModifyUser,
  failureModifyUser,
  REQUEST_MODIFY_USER,
  requestRemoveUser,
  REQUEST_REMOVE_USER,
  successRemoveUser,
  failureRemoveUser,
  requestResetPassword,
  REQUEST_RESET_PASSWORD,
  successResetPassword,
  failureResetPassword,
  REQUEST_ZIBOX_VOLUME,
  requestZiboxVolume,
  successZiboxVolume,
  failureZiboxVolume,
  changeMonitStatus,
  CHANGE_MONIT_STATUS,
  setMonitStatus,
  disconnectForce,
  DISCONNECT_FORCE,
} from 'modules/actions/user';
import * as API from 'lib/api';
import ZMSUser from 'lib/api/zms/user';
import Socket from 'lib/socket';
import { ResponseFailureData, ResponseSuccessData } from 'types/common';
import { API_FETCH } from 'utils/constants';

function* getUsersProcess(action: ReturnType<typeof requestGetUsers>) {
  const { branch_id, team_id, limit, page, search, url } = action.payload;

  try {
    yield delay(500);
    const response: ResponseSuccessData | ResponseFailureData = yield call(
      ZMSUser.getUsers,
      branch_id,
      team_id,
      limit,
      page,
      search!,
    );

    if (response.status === API_FETCH.SUCCESS) {
      const { data } = response as ResponseSuccessData;
      const { users, max_count } = data;

      const payload = {
        users,
        count: max_count,
        url,
      };

      yield put(successGetUsers(payload));

      if (url === '/main') {
        Socket.getInstance().onEmit('state');
      }

      return;
    }

    const { error_msg } = response as ResponseFailureData;
    yield put(failureGetUsers(error_msg));

    alert(error_msg);
  } catch (error) {
    yield put(failureGetUsers(error.message));
  }
}

function* addUserProcess(action: ReturnType<typeof requestAddUser>) {
  const {
    branch_id,
    team_id,
    admin_id,
    name,
    user_name,
    number,
    ziboxip,
    ziboxmac,
    ziboxmic,
    ziboxspk,
  } = action.payload;

  try {
    const response: ResponseSuccessData | ResponseFailureData = yield call(
      ZMSUser.addUser,
      branch_id,
      team_id,
      admin_id,
      name,
      user_name,
      number,
      ziboxip,
      ziboxmac,
      ziboxmic,
      ziboxspk,
    );

    if (response.status === API_FETCH.SUCCESS) {
      const { data } = response as ResponseSuccessData;

      yield put(successAddUser());

      return;
    }

    const { error_msg } = response as ResponseFailureData;
    yield put(failureAddUser(error_msg));

    alert(error_msg);
  } catch (error) {
    yield put(failureAddUser(error.message));
  }
}

function* modifyUserProcess(action: ReturnType<typeof requestModifyUser>) {
  const {
    id,
    branch_id,
    team_id,
    admin_id,
    name,
    user_name,
    number,
    ziboxip,
    ziboxmac,
    ziboxmic,
    ziboxspk,
  } = action.payload;

  try {
    const response: ResponseSuccessData | ResponseFailureData = yield call(
      ZMSUser.modifyUser,
      id,
      branch_id,
      team_id,
      admin_id,
      name,
      user_name,
      number,
      ziboxip,
      ziboxmac,
      ziboxmic,
      ziboxspk,
    );

    if (response.status === API_FETCH.SUCCESS) {
      const { data } = response as ResponseSuccessData;

      yield put(successModifyUser());

      return;
    }

    const { error_msg } = response as ResponseFailureData;
    yield put(failureModifyUser(error_msg));

    alert(error_msg);
  } catch (error) {
    yield put(failureModifyUser(error.message));
  }
}

function* removeUserProcess(action: ReturnType<typeof requestRemoveUser>) {
  const { id, branch_id, team_id, limit, page, search } = action.payload;

  try {
    const response: ResponseSuccessData | ResponseFailureData = yield call(
      ZMSUser.removeUser,
      id,
    );

    if (response.status === API_FETCH.SUCCESS) {
      const { data } = response as ResponseSuccessData;

      yield put(successRemoveUser());

      const payload = {
        branch_id,
        team_id,
        limit,
        page,
        search,
        url: '/main/manage/user',
      };

      yield put(requestGetUsers(payload));

      return;
    }

    const { error_msg } = response as ResponseFailureData;
    yield put(failureRemoveUser(error_msg));

    alert(error_msg);
  } catch (error) {
    yield put(failureRemoveUser(error));
  }
}

function* resetPasswordProcess(
  action: ReturnType<typeof requestResetPassword>,
) {
  const { id } = action.payload;

  try {
    const response: ResponseSuccessData | ResponseFailureData = yield call(
      ZMSUser.resetPassword,
      id,
    );

    if (response.status === API_FETCH.SUCCESS) {
      const { data } = response as ResponseSuccessData;

      yield put(successResetPassword());

      return;
    }

    const { error_msg } = response as ResponseFailureData;
    yield put(failureRemoveUser(error_msg));

    alert(error_msg);
  } catch (error) {
    yield put(failureResetPassword(error));
  }
}

function* updateZiboxVolumeProcess(
  action: ReturnType<typeof requestZiboxVolume>,
) {
  try {
    const { id, ziboxmic, ziboxspk } = action.payload;
    const response = yield call(API.updateZiboxVolume, id, ziboxmic, ziboxspk);

    yield put(successZiboxVolume(action.payload));
  } catch (error) {
    console.log(error);
    yield put(failureZiboxVolume(error));
  }
}

function* changeMonitProcess(action: ReturnType<typeof changeMonitStatus>) {
  try {
    const { number, status, user_id } = action.payload as {
      status: number;
      number: string;
      user_id: number;
    };

    const response = yield call(
      API.changeStatus,
      'zibox',
      number,
      'monitoring_status',
      status,
      user_id,
    );

    console.log(JSON.stringify(response));
    yield put(setMonitStatus(status));
  } catch (error) {
    console.log(error);
  }
}

function* disconnectForceProcess(action: ReturnType<typeof disconnectForce>) {
  try {
    const { number } = action.payload;
    console.log(number);

    const response = yield call(API.disconnectForce, number);
    const { data } = response;

    if (data.success) {
      yield call(API.changeStatus, 'reset', number, 'reset_status');
    } else {
      alert('연결 끊기 실패');
    }
  } catch (error) {
    console.log(error);
  }
}

function* watchGetUsers() {
  yield takeLatest(REQUEST_GET_USERS, getUsersProcess);
}

function* watchAddUser() {
  yield takeLatest(REQUEST_ADD_USER, addUserProcess);
}

function* watchModifyUser() {
  yield takeLatest(REQUEST_MODIFY_USER, modifyUserProcess);
}

function* watchRemoveUser() {
  yield takeLatest(REQUEST_REMOVE_USER, removeUserProcess);
}

function* watchResetPassword() {
  yield takeLatest(REQUEST_RESET_PASSWORD, resetPasswordProcess);
}

function* watchUpdateZiboxVolume() {
  yield takeLatest(REQUEST_ZIBOX_VOLUME, updateZiboxVolumeProcess);
}

function* watchChangeMonit() {
  yield takeLatest(CHANGE_MONIT_STATUS, changeMonitProcess);
}

function* watchDisconnectForce() {
  yield takeLatest(DISCONNECT_FORCE, disconnectForceProcess);
}

function* userSaga() {
  yield all([
    fork(watchGetUsers),
    fork(watchAddUser),
    fork(watchModifyUser),
    fork(watchRemoveUser),
    fork(watchResetPassword),
    fork(watchUpdateZiboxVolume),
    fork(watchChangeMonit),
    fork(watchDisconnectForce),
  ]);
}

export default userSaga;
