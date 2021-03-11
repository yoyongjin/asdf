import { useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { History } from 'history';

import {
  requestLogin,
  requestCheckLogin,
  requestLogout,
} from 'modules/actions/auth';
import { RootState } from 'modules/reducers';

function useAuth() {
  const socketConnection = useSelector(
    (state: RootState) => state.auth.socketConnectionStatus,
  );
  const loginInfo = useSelector((state: RootState) => state.auth.loginInfo); // 로그인 정보

  const dispatch = useDispatch();

  const onClickLogin = useCallback(
    (id: string, password: string, history: History) => {
      const payload = {
        id,
        password,
        history,
      };
      dispatch(requestLogin(payload));
    },
    [dispatch],
  );

  const onCheckLogin = useCallback(
    (history: History) => {
      const payload = {
        history,
      };
      dispatch(requestCheckLogin(payload));
    },
    [dispatch],
  );

  const onClickLogout = useCallback(
    (history: History) => {
      const payload = {
        history,
      };
      dispatch(requestLogout(payload));
    },
    [dispatch],
  );

  return {
    socketConnection,
    loginInfo,
    onCheckLogin,
    onClickLogin,
    onClickLogout,
  };
}

export default useAuth;
