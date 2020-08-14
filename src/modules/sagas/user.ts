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
  successGetConsultantInfo,
  requestResetPassword,
  REQUEST_RESET_PASSWORD,
} from 'modules/actions/user';
import * as API from 'lib/api';
import Socket from 'lib/socket';

function* getConsultantInfoProcess(
  action: ReturnType<typeof requestGetUserInfo>,
) {
  const { location, branchId, teamId, limit, page, search } = action.payload;
  const payload = {
    branch_id: branchId,
    team_id: teamId,
    limit,
    page,
    search_name: search!,
  };

  console.log(location, branchId, teamId, limit, page, search);

  try {
    const response = yield call(API.getConsultantInfo, payload);
    console.log('consultant Data => ', response);
    const { status, data } = response.data;

    if (status === 'success') {
      const { users, max_count } = data;

      if (location && location!.pathname === '/main') {
        const payload = {
          users,
          count: max_count,
        };
        Socket.getInstance().onEmit('call-state');
        yield put(successGetConsultantInfo(payload));
      } else {
        const payload = {
          users,
          count: max_count,
        };
        yield put(successGetUserInfo(payload));
      }
    }
  } catch (error) {
    console.log(error);
    yield put(failureGetUserInfo(error));
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
  console.log(
    branch_id,
    team_id,
    admin_id,
    name,
    user_name,
    password,
    number,
    ziboxip,
  );
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
    console.log('insert user Data', response);
  } catch (error) {
    console.log(error);
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
  console.log(
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

    console.log(response);
  } catch (error) {
    console.log(error);
  }
}

function* deleteUserProcess(action: ReturnType<typeof requestDeleteUser>) {
  try {
    const { id, branchId, teamId, page } = action.payload;
    console.log(id, branchId, teamId, page);

    const response = yield call(API.deleteUser, id);
    console.log(response);
    if (response.data.data) {
      const payload = {
        branchId: Number(branchId),
        teamId: Number(teamId),
        limit: 5,
        page,
      };
      yield put(requestGetUserInfo(payload));
    }
  } catch (error) {
    console.log(error);
  }
}

function* resetPasswordProcess(
  action: ReturnType<typeof requestResetPassword>,
) {
  try {
    const { id } = action.payload;
    const response = yield call(API.resetPassword, id);
    console.log(response);
  } catch (error) {
    console.log(error);
  }
}

function* watchGetConsultantInfo() {
  yield takeLatest(REQUEST_GET_USER_INFO, getConsultantInfoProcess);
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
    fork(watchGetConsultantInfo),
    fork(watchInsertUser),
    fork(watchUpdateUser),
    fork(watchDeleteUser),
    fork(watchResetPassword),
  ]);
}

export default userSaga;
