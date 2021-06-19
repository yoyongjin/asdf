import { useCallback, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import useInterval from 'hooks/useInterval';
import { setCalculatedCallTime } from 'modules/actions/user';
import { RootState } from 'modules/reducers';
import { setTappingData } from 'modules/actions/auth';

let server_time = 0;
let local_time = 0;

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

  const changeTappingStatus = useCallback(
    (status: number) => {
      const data = {
        status,
      };
      dispatch(setTappingData(data));
    },
    [dispatch],
  );

  useEffect(() => {
    server_time = serverTime;
    local_time = localTime;
  }, [serverTime, localTime]);

  useInterval(() => {
    const payload = {
      server_time,
      local_time,
    };
    dispatch(setCalculatedCallTime(payload));
  }, 1000);

  return {
    tappingStatus,
    tappingTarget,
    changeTappingData,
    changeTappingStatus,
  };
}

export type changeTappingData = (
  status: number,
  ip: string,
  id: number,
  number: string,
) => void;

export type changeTappingStatus = (status: number) => void;

export default useMonitoring;
