import { useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { RootState } from 'modules/reducers';
import { setTappingData } from 'modules/actions/auth';

function useMonitoring() {
  const tappingStatus = useSelector(
    (state: RootState) => state.auth.tappingStatus,
  );
  const tappingTarget = useSelector(
    (state: RootState) => state.auth.tappingTarget,
  );

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
