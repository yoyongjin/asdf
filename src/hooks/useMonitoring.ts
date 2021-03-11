import { useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import useInterval from 'hooks/useInterval';
import { setCalculatedCallTime } from 'modules/actions/user';
import { RootState } from 'modules/reducers';
import { setTappingStatus } from 'modules/actions/auth';

// let interval: any = null;
function useMonitoring() {
  const tapping = useSelector((state: RootState) => state.auth.tappingStatus); // 전체 유저 정보
  const dispatch = useDispatch();

  const changeTapping = useCallback(
    (status: boolean) => {
      dispatch(setTappingStatus(status));
    },
    [dispatch],
  );

  useInterval(() => {
    dispatch(setCalculatedCallTime());
  }, 1000);

  return {
    tapping,
    changeTapping,
  };
}

export type changeTapping = (status: boolean) => void;

export default useMonitoring;
