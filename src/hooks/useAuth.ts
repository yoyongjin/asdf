import { useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { History } from 'history';

import { requestCheckLogin, requestLogout } from 'modules/actions/auth';
import { RootState } from 'modules/reducers';

function useAuth() {
  const userInfo = useSelector((state: RootState) => state.auth.userInfo);

  const dispatch = useDispatch();

  const onClickLogout = useCallback((history: History) => {
    const payload = {
      history,
    };
    dispatch(requestLogout(payload));
  }, [dispatch]);

  const onCheckLogin = useCallback(
    (history: History) => {
      const payload = {
        history,
      };
      dispatch(requestCheckLogin(payload));
    },
    [dispatch],
  );

  return {
    userInfo,
    onCheckLogin,
    onClickLogout,
  };
}

export default useAuth;
