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
} from 'modules/actions/user';
import { ConsultantInfoType } from 'modules/types/user';
import * as API from 'lib/api';
import Socket from 'lib/socket';

const mergeConsultantInfo = (users: Array<ConsultantInfoType>, status: any) => {
  // api로 가져온 상담원 정보와 소켓으로 응답받은 상담원 통화 상태 정보 merge
  const newUserList = users.map((user) => {
    if (status[user.number] && status[user.number].number === user.number) {
      const { type, number, time } = status[user.number];
      let newUser = Object.assign({}, user);
      newUser.call_time = Number(time);
      newUser.call_type = type;

      return newUser;
    } else {
      return user;
    }
  });

  return newUserList;
};

function* getConsultantInfoProcess(
  action: ReturnType<typeof requestGetUserInfo>,
) {
  const { location, branchId, teamId, limit, page } = action.payload;
  const payload = {
    branch_id: branchId,
    team_id: teamId,
    limit,
    page,
  };

  console.log(payload)

  try {
    const response = yield call(API.getConsultantInfo, payload);
    console.log('consultant Data => ', response);
    const { status, data } = response.data;

    if (status === 'success') {
      const { users, max_count } = data;

      if (location.pathname === '/main') {
        const status = yield Socket.getInstance().onConnectEvent();
        const mergeUsers = mergeConsultantInfo(users, status);
        console.log(mergeUsers);
        const payload = {
          users: mergeUsers,
          count: max_count,
        };
        yield put(successGetUserInfo(payload));
      } else {
        console.log(users);
        const payload = {
          users,
          count: max_count,
        };
        yield put(successGetUserInfo(payload));
      }
    }
  } catch (error) {
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

function* watchGetConsultantInfo() {
  yield takeLatest(REQUEST_GET_USER_INFO, getConsultantInfoProcess);
}

function* watchInsertUser() {
  yield takeLatest(REQUEST_ADD_USER, insertUserProcess);
}

function* watchUpdateUser() {
  yield takeLatest(REQUEST_UPDATE_USER, updateUserProcess);
}

function* userSaga() {
  yield all([
    fork(watchGetConsultantInfo),
    fork(watchInsertUser),
    fork(watchUpdateUser),
  ]);
}

export default userSaga;
