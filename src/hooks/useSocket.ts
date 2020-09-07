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

function useSocket() {
  const dispatch = useDispatch();

  const getInitInfo = useCallback(() => {
    Socket.getInstance().onMessageInit((response) => {
      console.log('Get init Data => ', response);
      dispatch(getCallStatus(response));
    });
  }, [dispatch]);

  const getUserInfo = useCallback((branchId: number, adminId: number) => {
    Socket.getInstance().onMessageUser((response) => {
      const { type, data } = response;

      console.log(data.admin_id)

      let payload = {
        data,
        branch_id: adminId === 2 ? data.branch_id : branchId,
      }

      switch (type) {
        case 'signup':
          console.log('Sign up user data', data);
          dispatch(insertUser(payload));
          break;
        case 'update':
          console.log('Update user data', data);
          dispatch(updateUser(payload));
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
