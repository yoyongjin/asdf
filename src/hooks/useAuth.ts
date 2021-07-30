import { useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import {
  requestLogin,
  requestCheckLogin,
  requestLogout,
  requestChangePassword,
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
      if (!id || id.trim().length < 1) {
        alert('아이디를 입력해주세요.');

        return;
      }

      if (!password || password.trim().length < 1) {
        alert('비밀번호를 입력해주세요.');

        return;
      }

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

  const onClickChangePassword = useCallback(
    (
      currentPassword: string,
      newPassword: string,
      newConfirmPassword: string,
    ) => {
      if (!currentPassword || currentPassword.trim().length < 1) {
        alert('현재 비밀번호를 입력해주세요.');

        return;
      }

      if (!newPassword || newPassword.trim().length < 1) {
        alert('새로운 패스워드를 입력해주세요.');

        return;
      }

      if (!newConfirmPassword || newConfirmPassword.trim().length < 1) {
        alert('새로운 패스워드를 입력해주세요.');

        return;
      }

      if (newPassword !== newConfirmPassword) {
        alert('변경될 비밀번호가 같지않습니다.');

        return;
      }

      const payload = {
        current_password: currentPassword,
        new_password: newPassword,
        new_confirm_password: newConfirmPassword,
      };

      dispatch(requestChangePassword(payload));
    },
    [dispatch],
  );

  return {
    socketConnection,
    loginInfo,
    onClickChangePassword,
    onCheckLogin,
    onClickLogin,
    onClickLogout,
  };
}

export default useAuth;
