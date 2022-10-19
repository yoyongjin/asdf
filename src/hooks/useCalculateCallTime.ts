import { setCalculatedCallTime } from 'modules/actions/user';
import { RootState } from 'modules/reducers';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import useInterval from 'hooks/useInterval';

let server_time = 0;
let local_time = 0;

/**
 * @description 통화 시간 실시간 계산하는 hook
 */
function useCalculateCallTime() {
  const serverTime = useSelector((state: RootState) => state.auth.serverTime);
  const localTime = useSelector((state: RootState) => state.auth.localTime);

  const dispatch = useDispatch();

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
}

export default useCalculateCallTime;
