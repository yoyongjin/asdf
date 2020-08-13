import { useCallback } from 'react';
import { useDispatch } from 'react-redux';

import Socket from 'lib/socket';
import { getCallStatus, insertUser, updateUser } from 'modules/actions/user';
import { UserInfo } from 'modules/types/user';

function useSocket() {
  const dispatch = useDispatch();

  const requestCallState = useCallback(() => {
    Socket.getInstance().onEmit('call-state');
  }, []);

  const getInitInfo = useCallback(async () => {
    const response: any = await Socket.getInstance().onMessageInit();
    console.log('getInitInfo => ', response);

    // const newUserList = users.map((user) => {
    //   console.log(response[user.number])
    //   // console.log(response[user.number].number)
    //   console.log(user.number)
    //   if (
    //     response[user.number] &&
    //     response[user.number].number === user.number
    //   ) {
    //     const { type, number, time } = response[user.number];
    //     let newUser = Object.assign({}, user);
    //     newUser.call_time = Number(time);
    //     newUser.call_type = type;

    //     return newUser;
    //   } else {
    //     return user;
    //   }
    // });

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

  const getCallState = useCallback(() => {
    Socket.getInstance().onMessageAllCallStates((parameters) => {
      console.log(parameters);
      // const { type, data } = parameters;
    });
  }, []);

  const getAllCallState = useCallback(() => {
    Socket.getInstance().onMessageAllCallStates((response) => {
      dispatch(getCallStatus(response));
    });
  }, []);

  return {
    requestCallState,
    getInitInfo,
    getUserInfo,
    getCallState,
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
