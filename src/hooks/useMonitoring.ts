import { useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import useInterval from 'hooks/useInterval';
import { setCalculatedCallTime } from 'modules/actions/user';
import { RootState } from 'modules/reducers';
import { setTappingData } from 'modules/actions/auth';

function useMonitoring() {
  const tappingStatus = useSelector(
    (state: RootState) => state.auth.tappingStatus,
  );
  const tappingTarget = useSelector(
    (state: RootState) => state.auth.tappingTarget,
  );
  const serverTime = useSelector((state: RootState) => state.auth.serverTime);
  const localTime = useSelector((state: RootState) => state.auth.localTime);

  const dispatch = useDispatch();

  const changeTappingData = useCallback(
    (status: number, ip?: string, id?: number, number?: string) => {
      const data = {
        status,
        ip,
        id,
        number,
      };
      dispatch(setTappingData(data));
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
    changeTappingData,
  };
}

export type changeTappingData = (
  status: number,
  ip: string,
  id: number,
  number: string,
) => void;

export default useMonitoring;
