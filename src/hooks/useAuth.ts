import { useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { History, Location } from 'history';

import { requestCheckLogin, requestLogout } from 'modules/actions/auth';
import { RootState } from 'modules/reducers';

function useAuth() {
  const loginInfo = useSelector((state: RootState) => state.auth.loginInfo);

  const dispatch = useDispatch();

  const onClickLogout = useCallback(
    (history: History) => {
      const payload = {
        history,
      };
      dispatch(requestLogout(payload));
    },
    [dispatch],
  );

  const onCheckLogin = useCallback(
    (history: History, location: Location) => {
      const payload = {
        history,
        location,
      };
      dispatch(requestCheckLogin(payload));
    },
    [dispatch],
  );

  return {
    loginInfo,
    onCheckLogin,
    onClickLogout,
  };
}

export default useAuth;
