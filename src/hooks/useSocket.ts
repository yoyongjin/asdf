import { useCallback } from 'react';
import { useDispatch } from 'react-redux';

import Socket from 'lib/socket';
import {
  getCallStatus,
  insertUser,
  updateUser,
  changeCallState,
  changeMonitoringState,
  insertConsultant,
  updateConsultant,
  deleteUser,
} from 'modules/actions/user';
import { UserInfo, ConsultantInfoType } from 'modules/types/user';

function useSocket() {
  const dispatch = useDispatch();

  const getInitInfo = useCallback(() => {
    Socket.getInstance().onMessageInit((response) => {
      console.log('Get init Data => ', response);
      dispatch(getCallStatus(response));
    });
  }, [dispatch]);

  const getUserInfo = useCallback(() => {
    Socket.getInstance().onMessageUser((response) => {
      const { type, data } = response;

      switch (type) {
        case 'signup':
          console.log('Sign up user data', data);
          dispatch(insertUser(data));
          break;
        case 'update':
          console.log('Update user data', data);
          dispatch(updateUser(data));
          break;
        case 'delete':
          console.log('Delete user data', data);
          dispatch(deleteUser(data));
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
    getInitInfo,
    getUserInfo,
    getChangeState,
    getAllCallState,
  };
}

export default useSocket;
