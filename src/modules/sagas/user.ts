import { all, call, fork, put, takeLatest } from 'redux-saga/effects';

import {
  requestGetUsers,
  REQUEST_GET_USERS,
  successGetUsers,
  failureGetUsers,
  requestAddUser,
  REQUEST_ADD_USER,
  requestUpdateUser,
  REQUEST_UPDATE_USER,
  requestDeleteUser,
  REQUEST_DELETE_USER,
  successGetFilterUsers,
  requestResetPassword,
  REQUEST_RESET_PASSWORD,
  successAddUser,
  failureAddUser,
  successUpdateUser,
  failureUpdateUser,
  successDeleteUser,
  failureDeleteUser,
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
import Logger from 'utils/log';
import { ResponseFailureData, ResponseSuccessData } from 'types/common';
import { API_FETCH } from 'utils/constants';

function* getUsersProcess(action: ReturnType<typeof requestGetUsers>) {
  const { branchId, teamId, limit, page, search, url, adminId, loginId } =
    action.payload;

  try {
    const response: ResponseSuccessData | ResponseFailureData = yield call(
      ZMSUser.getConsultData,
      branchId,
      teamId,
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
        loginId: loginId!,
      };

      if (adminId === 2) {
        if (branchId === -1 && teamId === -1 && !search?.trim()) {
          // 전체 지점
          yield put(successGetUsers(payload));
        } else {
          // 필터링된 유저
          yield put(successGetFilterUsers(payload));
        }

        if (url === '/main') {
          Socket.getInstance().onEmit('state');
        }
      } else if (adminId === 1) {
        if (teamId === -1 && !search?.trim()) {
          // 전체 지점
          yield put(successGetUsers(payload));
        } else {
          // 필터링된 유저
          yield put(successGetFilterUsers(payload));
        }

        if (url === '/main') {
          Socket.getInstance().onEmit('state');
        }
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
    password,
    number,
    ziboxip,
  } = action.payload;
  try {
    const response = yield call(
      API.insertUser,
      branch_id,
      team_id,
      admin_id,
      name,
      user_name,
      password,
      number,
      ziboxip,
    );
    Logger.log('insert user Data', response);
    yield put(successAddUser());
  } catch (error) {
    console.log(error);
    yield put(failureAddUser(error.message));
    alert('동일한 전화번호, 아이디, 지박스 IP가 존재합니다.');
  }
}

function* modifyUserProcess(action: ReturnType<typeof requestUpdateUser>) {
  const {
    user_id,
    branch_id,
    team_id,
    admin_id,
    name,
    user_name,
    password,
    number,
    ziboxip,
    ziboxmic,
    ziboxspk,
  } = action.payload;
  try {
    yield call(
      API.updateUser,
      user_id,
      branch_id,
      team_id,
      admin_id,
      name,
      user_name,
      password,
      number,
      ziboxip,
      ziboxmic!,
      ziboxspk!,
    );
    yield put(successUpdateUser());
  } catch (error) {
    console.log(error);
    yield put(failureUpdateUser(error));
    alert('동일한 전화번호, 아이디, 지박스 IP가 존재합니다.');
  }
}

function* removeUserProcess(action: ReturnType<typeof requestDeleteUser>) {
  try {
    const { id, branchId, teamId, page, adminId } = action.payload;

    const response = yield call(API.deleteUser, id);
    if (response.data.data) {
      const payload = {
        adminId,
        branchId,
        teamId,
        limit: 5,
        page,
        url: '/main/manage/user',
      };
      yield put(requestGetUsers(payload));
      yield put(successDeleteUser());
    }
  } catch (error) {
    console.log(error);
    yield put(failureDeleteUser(error));
  }
}

function* resetPasswordProcess(
  action: ReturnType<typeof requestResetPassword>,
) {
  try {
    const { id } = action.payload;
    yield call(API.resetPassword, id);
    yield put(successResetPassword());
    alert('초기 비밀번호는 0000 입니다.');
  } catch (error) {
    console.log(error);
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
  yield takeLatest(REQUEST_UPDATE_USER, modifyUserProcess);
}

function* watchRemoveUser() {
  yield takeLatest(REQUEST_DELETE_USER, removeUserProcess);
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
