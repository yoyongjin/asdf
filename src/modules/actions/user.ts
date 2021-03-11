import { createAction } from 'typesafe-actions';

import {
  getRequestType,
  UserInfoType,
  UpdateUserInfoType,
  ConsultantInfoType,
  deleteUserType,
  UserInfo,
  StatusType,
} from 'modules/types/user';
import { ChangeUser, ConsultantStatusByNumber, SuccessGetUsers } from 'types/user';

export const REQUEST_GET_USERS = 'REQUEST_GET_USERS';
export const SUCCESS_GET_USERS = 'SUCCESS_GET_USERS';
export const SUCCESS_GET_FILTER_USERS = 'SUCCESS_GET_FILTER_USERS';
export const FAILURE_GET_USERS = 'FAILURE_GET_USERS';
export const REQUEST_ADD_USER = 'REQUEST_ADD_USER';
export const SUCCESS_ADD_USER = 'SUCCESS_ADD_USER';
export const FAILRUE_ADD_USER = 'FAILRUE_ADD_USER';
export const REQUEST_UPDATE_USER = 'REQUEST_UPDATE_USER';
export const SUCCESS_UPDATE_USER = 'SUCCESS_UPDATE_USER';
export const FAILURE_UPDATE_USER = 'FAILURE_UPDATE_USER';
export const REQUEST_DELETE_USER = 'REQUEST_DELETE_USER';
export const SUCCESS_DELETE_USER = 'SUCCESS_DELETE_USER';
export const FAILURE_DELETE_USER = 'FAILURE_DELETE_USER';
export const REQUEST_RESET_PASSWORD = 'REQUEST_RESET_PASSWORD';
export const SUCCESS_RESET_PASSWORD = 'SUCCESS_RESET_PASSWORD';
export const FAILURE_RESET_PASSWORD = 'FAILURE_RESET_PASSWORD';
export const RESET_FILTERED_USER = 'RESET_FILTERED_USER';
export const RESET_FILTERED_CONSULTANT = 'RESET_FILTERED_CONSULTANT';
export const REQUEST_ZIBOX_VOLUME = 'UPDATE_ZIBOX_VOLUME';
export const SUCCESS_ZIBOX_VOLUME = 'SUCCESS_ZIBOX_VOLUME';
export const FAILURE_ZIBOX_VOLUME = 'FAILURE_ZIBOX_VOLUME';

export const INSERT_USER = 'INSERT_USER';
export const UPDATE_USER = 'UPDATE_USER';
export const DELETE_USER = 'DELETE_USER';
export const INSERT_CONSULTANT = 'INSERT_CONSULTANT';
export const UPDATE_CONSULTANT = 'UPDATE_CONSULTANT';
export const SET_CONSULTANT_STATUS = 'SET_CONSULTANT_STATUS';
export const CHANGE_STATUS = 'CHANGE_STATUS';
export const SAVE_STATUS = 'SAVE_STATUS';
export const RESET_STATUS = 'RESET_STATUS';
export const CHANGE_MONIT_STATUS = 'CHANGE_MONIT_STATUS';
export const SET_MONIT_STATUS = 'SET_MONIT_STATUS';
export const DISCONNECT_FORCE = 'DISCONNECT_FORCE';

// new
export const SET_USER_STATUS = 'SET_USER_STATUS';
export const ADD_USER = 'ADD_USER';
export const MODIFY_USER = 'MODIFY_USER';
export const SET_CALCULATED_CALL_TIME = 'SET_CALCULATED_CALL_TIME';

export const requestGetUsers = createAction(
  REQUEST_GET_USERS,
)<getRequestType>();
export const successGetUsers = createAction(
  SUCCESS_GET_USERS,
)<SuccessGetUsers>();
export const successGetFilterUsers = createAction(
  SUCCESS_GET_FILTER_USERS,
)<SuccessGetUsers>();
export const failureGetUsers = createAction(FAILURE_GET_USERS)<string>();
export const requestAddUser = createAction(REQUEST_ADD_USER)<UserInfoType>();
export const successAddUser = createAction(SUCCESS_ADD_USER)();
export const failureAddUser = createAction(FAILRUE_ADD_USER)<string>();
export const requestUpdateUser = createAction(
  REQUEST_UPDATE_USER,
)<UpdateUserInfoType>();
export const successUpdateUser = createAction(SUCCESS_UPDATE_USER)();
export const failureUpdateUser = createAction(FAILURE_UPDATE_USER)<string>();
export const insertUser = createAction(INSERT_USER)<{
  data: UserInfo;
  branch_id: number;
}>();
export const updateUser = createAction(UPDATE_USER)<{
  data: UserInfo;
  branch_id: number;
}>();
export const deleteUser = createAction(DELETE_USER)<{ id: number }>();
export const requestDeleteUser = createAction(
  REQUEST_DELETE_USER,
)<deleteUserType>();
export const successDeleteUser = createAction(SUCCESS_DELETE_USER)();
export const failureDeleteUser = createAction(FAILURE_DELETE_USER)<string>();
export const changeStatus = createAction(CHANGE_STATUS)<{
  data: {
    number: string;
    tmr?: number;
    ats?: number;
    connection?: number;
    monitoring?: number;
    record?: number;
    zibox_ip?: string;
    zibox_mac?: string;
    pc_ip?: string;
    call?: string;
    time?: number;
    monit_user?: number;
  };
  type: string;
}>();
export const saveStatus = createAction(SAVE_STATUS)<{
  [key: string]: string;
}>();
export const resetStatus = createAction(RESET_STATUS)<StatusType>();
export const requestResetPassword = createAction(REQUEST_RESET_PASSWORD)<{
  id: number;
}>();
export const successResetPassword = createAction(SUCCESS_RESET_PASSWORD)();
export const failureResetPassword = createAction(
  FAILURE_RESET_PASSWORD,
)<string>();
export const insertConsultant = createAction(
  INSERT_CONSULTANT,
)<ConsultantInfoType>();
export const updateConsultant = createAction(
  UPDATE_CONSULTANT,
)<ConsultantInfoType>();
export const resetFilteredUser = createAction(RESET_FILTERED_USER)();
export const resetFilteredConsultant = createAction(
  RESET_FILTERED_CONSULTANT,
)();
export const requestZiboxVolume = createAction(REQUEST_ZIBOX_VOLUME)<{
  id: number;
  ziboxmic: number;
  ziboxspk: number;
}>();
export const successZiboxVolume = createAction(SUCCESS_ZIBOX_VOLUME)<{
  id: number;
  ziboxmic: number;
  ziboxspk: number;
}>();
export const failureZiboxVolume = createAction(FAILURE_ZIBOX_VOLUME)<string>();
export const changeMonitStatus = createAction(CHANGE_MONIT_STATUS)<{
  status: number;
  number: string;
  user_id: number;
}>();
export const setMonitStatus = createAction(SET_MONIT_STATUS)<number>();
export const disconnectForce = createAction(DISCONNECT_FORCE)<{
  number: string;
}>();

// new
export const setUserStatus = createAction(
  SET_USER_STATUS,
)<ConsultantStatusByNumber>();
export const addUser = createAction(ADD_USER)<ChangeUser>();
export const modifyUser = createAction(MODIFY_USER)<ChangeUser>();
export const setCalculatedCallTime = createAction(SET_CALCULATED_CALL_TIME)();

// 삭제 예정
export const GET_CALL_STATUS = 'GET_CALL_STATUS';
export const getCallStatus = createAction(GET_CALL_STATUS)<any>();
export const RUN_TIMER = 'RUN_TIMER';
export const runTimer = createAction(RUN_TIMER)();
