import { useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';

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
    (id: string, password: string) => {
      const payload = {
        id,
        password,
      };
      dispatch(requestLogin(payload));
    },
    [dispatch],
  );

  const onCheckLogin = useCallback(() => {
    dispatch(requestCheckLogin());
  }, [dispatch]);

  const onClickLogout = useCallback(() => {
    dispatch(requestLogout());
  }, [dispatch]);

  return {
    socketConnection,
    loginInfo,
    onCheckLogin,
    onClickLogin,
    onClickLogout,
  };
}

export default useAuth;
