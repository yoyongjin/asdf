import { useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import useInterval from 'hooks/useInterval';
import { setCalculatedCallTime } from 'modules/actions/user';
import { RootState } from 'modules/reducers';
import { setTappingStatus } from 'modules/actions/auth';

function useMonitoring() {
  const tappingStatus = useSelector((state: RootState) => state.auth.tappingStatus);
  const tappingTarget = useSelector((state: RootState) => state.auth.tappingTarget);
  const serverTime = useSelector((state: RootState) => state.auth.serverTime);
  const localTime = useSelector((state: RootState) => state.auth.localTime);

  const dispatch = useDispatch();

  const changeTapping = useCallback(
    (status: number) => {
      dispatch(setTappingStatus(status));
    },
    [dispatch],
  );

  useInterval(() => {
    const payload = {
      server_time: serverTime,
      local_time: localTime,
    };
    dispatch(setCalculatedCallTime(payload));
  }, 1000);

  return {
    tappingStatus,
    tappingTarget,
    changeTapping,
  };
}

export type changeTapping = (status: number) => void;

export default useMonitoring;
