import { all, call, fork, put, takeLatest } from 'redux-saga/effects';

import {
  requestGetUserInfo,
  REQUEST_GET_USER_INFO,
  successGetUserInfo,
  failureGetUserInfo,
  requestAddUser,
  REQUEST_ADD_USER,
  requestUpdateUser,
  REQUEST_UPDATE_USER,
  requestDeleteUser,
  REQUEST_DELETE_USER,
  successGetFilterUserInfo,
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
} from 'modules/actions/user';
import * as API from 'lib/api';
import Socket from 'lib/socket';
import Logger from 'utils/log';

function* getUserInfoProcess(action: ReturnType<typeof requestGetUserInfo>) {
  const {
    branchId,
    teamId,
    limit,
    page,
    search,
    url,
    adminId,
  } = action.payload;
  const payload = {
    branch_id: branchId,
    team_id: teamId,
    limit,
    page,
    search_name: search!,
  };

  try {
    const response = yield call(API.getConsultantInfo, payload);
    const { status, data } = response.data;

    if (status === 'success') {
      Logger.log('Get consultant data => ', data);
      const { users, max_count } = data;

      const payload = {
        users,
        count: max_count,
        url,
      };

      if (adminId === 2) {
        if (branchId === -1 && teamId === -1 && !search?.trim()) {
          // 전체 지점
          yield put(successGetUserInfo(payload));
        } else {
          // 필터링된 유저
          yield put(successGetFilterUserInfo(payload));
        }

        if (url === '/main') {
          Socket.getInstance().onEmit('call-state');
        }
      } else if (adminId === 1) {
        if (teamId === -1 && !search?.trim()) {
          // 전체 지점
          yield put(successGetUserInfo(payload));
        } else {
          // 필터링된 유저
          yield put(successGetFilterUserInfo(payload));
        }

        if (url === '/main') {
          Socket.getInstance().onEmit('call-state');
        }
      }
    }
  } catch (error) {
    console.log(error);
    yield put(failureGetUserInfo(error.message));
  }
}

function* insertUserProcess(action: ReturnType<typeof requestAddUser>) {
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
    alert('동일한 전화번호나 아이디가 존재합니다.');
  }
}

function* updateUserProcess(action: ReturnType<typeof requestUpdateUser>) {
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
  } = action.payload;
  try {
    const response = yield call(
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
    );
    yield put(successUpdateUser());
  } catch (error) {
    console.log(error);
    yield put(failureUpdateUser(error));
  }
}

function* deleteUserProcess(action: ReturnType<typeof requestDeleteUser>) {
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
      yield put(requestGetUserInfo(payload));
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
    const response = yield call(API.resetPassword, id);
    yield put(successResetPassword());
    alert('초기 비밀번호는 0000 입니다.');
  } catch (error) {
    console.log(error);
    yield put(failureResetPassword(error));
  }
}

function* watchGetUserInfo() {
  yield takeLatest(REQUEST_GET_USER_INFO, getUserInfoProcess);
}

function* watchInsertUser() {
  yield takeLatest(REQUEST_ADD_USER, insertUserProcess);
}

function* watchUpdateUser() {
  yield takeLatest(REQUEST_UPDATE_USER, updateUserProcess);
}

function* watchDeleteUser() {
  yield takeLatest(REQUEST_DELETE_USER, deleteUserProcess);
}

function* watchResetPassword() {
  yield takeLatest(REQUEST_RESET_PASSWORD, resetPasswordProcess);
}

function* userSaga() {
  yield all([
    fork(watchGetUserInfo),
    fork(watchInsertUser),
    fork(watchUpdateUser),
    fork(watchDeleteUser),
    fork(watchResetPassword),
  ]);
}

export default userSaga;
