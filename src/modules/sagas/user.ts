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
  requestGetPluralConsultant,
  successGetPluralConsultant,
  failureGetPluralConsultant,
  REQUEST_GET_PLURAL_CONSULTANT,
} from 'modules/actions/user';
import ZMSUser from 'lib/api/zms/user';
import { ResponseFailureData, ResponseSuccessData } from 'types/common';
import { API_FETCH } from 'utils/constants';
import Communicator from 'lib/communicator';
import Toast from 'utils/toast';

function* getUsersProcess(action: ReturnType<typeof requestGetUsers>) {
  const { branch_id, team_id, limit, page, search, url, include_leaver } =
    action.payload;

  Toast.notification('잠시만 기다려주세요..🙄');
  yield delay(500);
  const response: ResponseSuccessData | ResponseFailureData = yield call(
    ZMSUser.getUsers,
    branch_id,
    team_id,
    limit,
    page,
    include_leaver,
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

    if (max_count < 1) {
      Toast.warning('데이터가 없습니다🙄');
    } else {
      Toast.success('가져오기 완료😊');
    }

    if (url === '/main') {
      Communicator.getInstance().emitMessage('state', '');
    }

    return;
  }

  const { error_msg } = response as ResponseFailureData;
  yield put(failureGetUsers(error_msg));

  Toast.error(`요청에 실패했어요..😭\n(${error_msg})`);
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
}

function* removeUserProcess(action: ReturnType<typeof requestRemoveUser>) {
  const { id } = action.payload;

  const response: ResponseSuccessData | ResponseFailureData = yield call(
    ZMSUser.removeUser,
    id,
  );

  if (response.status === API_FETCH.SUCCESS) {
    const { data } = response as ResponseSuccessData;

    yield put(successRemoveUser());

    Toast.success('삭제 완료😊');

    return;
  }

  const { error_msg } = response as ResponseFailureData;
  yield put(failureRemoveUser(error_msg));

  Toast.error(`요청에 실패했어요..😭\n(${error_msg})`);
}

function* resetPasswordProcess(
  action: ReturnType<typeof requestResetPassword>,
) {
  const { id } = action.payload;

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

  Toast.error(`요청에 실패했어요..😭\n(${error_msg})`);
}

function* modifyZiboxVolumeProcess(
  action: ReturnType<typeof requestZiboxVolume>,
) {
  const { number, ziboxmic, ziboxspk } = action.payload;

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

  Toast.error(`요청에 실패했어요..😭\n(${error_msg})`);
}

function* getPluralConsultantProcess(
  action: ReturnType<typeof requestGetPluralConsultant>,
) {
  const { ids } = action.payload;

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

  Toast.error(`요청에 실패했어요..😭\n(${error_msg})`);
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
    fork(watchGetPluralConsultant),
  ]);
}

export default userSaga;
