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
  disconnectForce,
  DISCONNECT_FORCE,
  requestGetPluralConsultant,
  successGetPluralConsultant,
  failureGetPluralConsultant,
  REQUEST_GET_PLURAL_CONSULTANT,
} from 'modules/actions/user';
import ZMSUser from 'lib/api/zms/user';
import RelayAuth from 'lib/api/relay/auth';
import { ResponseFailureData, ResponseSuccessData } from 'types/common';
import { API_FETCH } from 'utils/constants';
import Communicator from 'lib/communicator';
import Toast from 'utils/toast';

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
        Communicator.getInstance().emitMessage('state', '');
      }

      return;
    }

    const { error_msg } = response as ResponseFailureData;
    yield put(failureGetUsers(error_msg));

    Toast.error('요청에 실패했어요..😭');
  } catch (error) {
    let message = '';

    if (error instanceof Error) {
      message = error.message;
    }

    yield put(failureGetUsers(message));

    Toast.error('요청에 실패했어요..😭');
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
    pc_ip,
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
      pc_ip,
      ziboxip,
      ziboxmac,
      ziboxmic,
      ziboxspk,
    );

    if (response.status === API_FETCH.SUCCESS) {
      const { data } = response as ResponseSuccessData;

      yield put(successAddUser());

      Toast.success('추가 완료😊');
      return;
    }

    const { error_msg } = response as ResponseFailureData;
    yield put(failureAddUser(error_msg));

    Toast.error(`요청에 실패했어요..😭\n(${error_msg})`);
  } catch (error) {
    let message = '';

    if (error instanceof Error) {
      message = error.message;
    }

    yield put(failureAddUser(message));

    Toast.error('요청에 실패했어요..😭');
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
    origin_number,
    pc_ip,
    ziboxip,
    ziboxmac,
    ziboxmic,
    ziboxspk,
    available_time,
    in_message,
    out_message,
    telecom,
    plan,
    used,
    serial_number,
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
      origin_number,
      pc_ip,
      ziboxip,
      ziboxmac,
      ziboxmic,
      ziboxspk,
      available_time,
      in_message,
      out_message,
      telecom,
      plan,
      used,
      serial_number,
    );

    if (response.status === API_FETCH.SUCCESS) {
      const { data } = response as ResponseSuccessData;

      yield put(successModifyUser());

      Toast.success('수정 완료😊');

      return;
    }

    const { error_msg } = response as ResponseFailureData;
    yield put(failureModifyUser(error_msg));

    Toast.error(`요청에 실패했어요..😭\n(${error_msg})`);
  } catch (error) {
    let message = '';

    if (error instanceof Error) {
      message = error.message;
    }

    yield put(failureModifyUser(message));

    Toast.error('요청에 실패했어요..😭');
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

      Toast.success('삭제 완료😊');

      return;
    }

    const { error_msg } = response as ResponseFailureData;
    yield put(failureRemoveUser(error_msg));

    Toast.error('요청에 실패했어요..😭');
  } catch (error) {
    let message = '';

    if (error instanceof Error) {
      message = error.message;
    }

    yield put(failureRemoveUser(message));

    Toast.error('요청에 실패했어요..😭');
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

      Toast.success('초기화 완료😊');

      return;
    }

    const { error_msg } = response as ResponseFailureData;
    yield put(failureRemoveUser(error_msg));

    Toast.error('요청에 실패했어요..😭');
  } catch (error) {
    let message = '';

    if (error instanceof Error) {
      message = error.message;
    }

    yield put(failureResetPassword(message));

    Toast.error('요청에 실패했어요..😭');
  }
}

function* modifyZiboxVolumeProcess(
  action: ReturnType<typeof requestZiboxVolume>,
) {
  const { number, ziboxmic, ziboxspk } = action.payload;

  try {
    const response: ResponseSuccessData | ResponseFailureData = yield call(
      ZMSUser.modifyZiBoxVolume,
      number,
      ziboxmic,
      ziboxspk,
    );

    if (response.status === API_FETCH.SUCCESS) {
      const { data } = response as ResponseSuccessData;

      yield put(successZiboxVolume());

      Toast.success('수정 완료😊');

      return;
    }

    const { error_msg } = response as ResponseFailureData;
    yield put(failureZiboxVolume(error_msg));

    Toast.error('요청에 실패했어요..😭');
  } catch (error) {
    let message = '';

    if (error instanceof Error) {
      message = error.message;
    }

    yield put(failureZiboxVolume(message));

    Toast.error('요청에 실패했어요..😭');
  }
}

function* disconnectForceProcess(action: ReturnType<typeof disconnectForce>) {
  const { number } = action.payload;

  try {
    const response: ResponseSuccessData | ResponseFailureData = yield call(
      RelayAuth.disconnect,
      number,
    );

    const { data } = response as ResponseSuccessData;

    console.log(data);

    if (data.success) {
      // yield call(API.changeStatus, 'reset', number, 'reset_status');
    }
  } catch (error) {
    let message = '';

    if (error instanceof Error) {
      message = error.message;
    }

    yield put(failureZiboxVolume(message));
  }

  // try {
  //   const { number } = action.payload;
  //   console.log(number);

  //   const response = yield call(API.disconnectForce, number);
  //   const { data } = response;

  //   if (data.success) {
  //     // yield call(API.changeStatus, 'reset', number, 'reset_status');
  //   } else {
  //     alert('연결 끊기 실패');
  //   }
  // } catch (error) {
  //   console.log(error);
  // }
}

function* getPluralConsultantProcess(
  action: ReturnType<typeof requestGetPluralConsultant>,
) {
  const { ids } = action.payload;
  try {
    const response: ResponseSuccessData | ResponseFailureData = yield call(
      ZMSUser.getPluralConsultant,
      ids,
    );

    if (response.status === API_FETCH.SUCCESS) {
      const { data } = response as ResponseSuccessData;

      yield put(successGetPluralConsultant(data));

      return;
    }

    const { error_msg } = response as ResponseFailureData;
    yield put(failureGetPluralConsultant(error_msg));

    Toast.error('요청에 실패했어요..😭');
  } catch (error) {
    let message = '';

    if (error instanceof Error) {
      message = error.message;
    }

    yield put(failureGetPluralConsultant(message));

    Toast.error('요청에 실패했어요..😭');
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

function* watchModifyZiboxVolume() {
  yield takeLatest(REQUEST_ZIBOX_VOLUME, modifyZiboxVolumeProcess);
}

function* watchDisconnectForce() {
  yield takeLatest(DISCONNECT_FORCE, disconnectForceProcess);
}

function* watchGetPluralConsultant() {
  yield takeLatest(REQUEST_GET_PLURAL_CONSULTANT, getPluralConsultantProcess);
}

function* userSaga() {
  yield all([
    fork(watchGetUsers),
    fork(watchAddUser),
    fork(watchModifyUser),
    fork(watchRemoveUser),
    fork(watchResetPassword),
    fork(watchModifyZiboxVolume),
    fork(watchDisconnectForce),
    fork(watchGetPluralConsultant),
  ]);
}

export default userSaga;
