import { useCallback } from 'react';
import { useDispatch } from 'react-redux';

import Socket from 'lib/socket';
import {
  getCallStatus,
  insertUser,
  updateUser,
  changeCallState,
  changeMonitoringState,
  deleteUser,
} from 'modules/actions/user';
import Logger from 'utils/log';

function useSocket() {
  const dispatch = useDispatch();

  const getInitCallStatus = useCallback(() => {
    // 유저 상태 전달
    Socket.getInstance().onMessageInit((response) => {
      Logger.log('Get init data', response);
      dispatch(getCallStatus(response));
    });
  }, [dispatch]);

  const getAllCallStatus = useCallback(() => {
    // 유저 상태 전달
    Socket.getInstance().onMessageAllCallStates((response) => {
      dispatch(getCallStatus(response));
    });
  }, [dispatch]);

  const getChangeStatus = useCallback(() => {
    Socket.getInstance().onMeesageCallState((response) => {
      const { data } = response;
      const _response = JSON.parse(data);

      if (_response.monitoring_state) {
        Logger.log('Change Monitoring State', _response);
        dispatch(changeMonitoringState(_response));
      } else {
        Logger.log('Change Call State', _response);
        dispatch(changeCallState(_response));
      }
    });
  }, [dispatch]);

  const getUserInfo = useCallback(
    (branchId: number, adminId: number) => {
      // 유저 추가, 수정, 삭제 시 관련 응답 전송
      Socket.getInstance().onMessageUser((response) => {
        const { type, data } = response;

        let payload = {
          data,
          branch_id: adminId === 2 ? data.branch_id : branchId,
        };

        switch (type) {
          case 'signup':
            Logger.log('Sign up user data', data);
            dispatch(insertUser(payload));
            break;
          case 'update':
            Logger.log('Update user data', data);
            dispatch(updateUser(payload));
            break;
          case 'delete':
            Logger.log('Delete user data', data);
            dispatch(deleteUser(data));
            break;
          default:
            break;
        }
      });
    },
    [dispatch],
  );

  return {
    getAllCallStatus,
    getChangeStatus,
    getInitCallStatus,
    getUserInfo,
  };
}

export default useSocket;
