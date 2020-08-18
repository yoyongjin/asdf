import { useCallback } from 'react';
import { useDispatch } from 'react-redux';

import Socket from 'lib/socket';
import {
  getCallStatus,
  insertUser,
  updateUser,
  changeCallState,
  changeMonitoringState,
} from 'modules/actions/user';
import { UserInfo } from 'modules/types/user';

function useSocket() {
  const dispatch = useDispatch();

  const requestCallState = useCallback(() => {
    Socket.getInstance().onEmit('call-state');
  }, []);

  const getInitInfo = useCallback(async () => {
    const response: any = await Socket.getInstance().onMessageInit();
    console.log('getInitInfo => ', response);
    dispatch(getCallStatus(response));
  }, [dispatch]);

  const getUserInfo = useCallback(() => {
    Socket.getInstance().onMessageUser((response) => {
      console.log(response);
      const { type, data } = response;

      switch (type) {
        case 'signup':
          let signup = data as UserInfo;
          dispatch(insertUser(signup));
          break;
        case 'update':
          let update = data as UserInfo;
          dispatch(updateUser(update));
          break;
        default:
          break;
      }
    });
  }, [dispatch]);

  const getChangeState = useCallback(() => {
    Socket.getInstance().onMeesageCallState((response) => {
      const { data } = response;
      const _response = JSON.parse(data);
      console.log(_response.monitoring_state);
      if (_response.monitoring_state) {
        console.log('Change Monitoring State =>', _response);
        dispatch(changeMonitoringState(_response));
      } else {
        console.log('Change Call State =>', _response);
        dispatch(changeCallState(_response));
      }
    });
  }, [dispatch]);

  const getAllCallState = useCallback(() => {
    Socket.getInstance().onMessageAllCallStates((response) => {
      dispatch(getCallStatus(response));
    });
  }, [dispatch]);

  return {
    requestCallState,
    getInitInfo,
    getUserInfo,
    getChangeState,
    getAllCallState,
  };
}

export interface ConsultantInfoType {
  admin_id: string;
  branch_id: string;
  branch_name: null | string;
  id: number;
  login_at?: number;
  name: string;
  number: string;
  team_id: string;
  team_name: null | string;
  user_name: string;
  ziboxip: string;
  call_time?: number;
  call_type?: string;
  diff?: number;
}

export default useSocket;
