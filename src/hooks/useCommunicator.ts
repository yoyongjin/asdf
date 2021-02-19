import { useSelector, useDispatch } from 'react-redux';
import { useCallback } from 'react';

import Communicator from 'lib/communicator';
import OCX from 'lib/ocx';
import Socket from 'lib/socket';
import { setSocketStatus } from 'modules/actions/auth';
import { getCallStatus } from 'modules/actions/user';

function useCommunicator() {
  const dispatch = useDispatch();

  const registerEventHandler = useCallback(() => {
    const socket = Communicator.getInstance().getSocketInstance();
    socket.onConnectEventHandler((response: any) => {
      if (socket instanceof Socket) {
        dispatch(getCallStatus(response));
      } else if (socket instanceof OCX) {
        dispatch(setSocketStatus(response));
      }
    });

    socket.onChangeStatusEventHandler((response: any) => {
      console.log('!@#!@#!@#!@#', response);
    });

    window.addEventListener('beforeunload', (e) => {
      Communicator.getInstance().disconnectAll();
    });
  }, []);

  return {
    registerEventHandler,
  };
}

export default useCommunicator;
