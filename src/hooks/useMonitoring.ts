import { useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { runTimer } from 'modules/actions/user';
import { RootState } from 'modules/reducers';
import { changeMonitStatus } from 'modules/actions/user';

let interval: number | null = null;
function useMonitoring() {
  const monit = useSelector((state: RootState) => state.user.monit); // 전체 유저 정보
  const dispatch = useDispatch();

  const onRunTimer = useCallback(() => {
    if (interval) return;

    interval = setInterval(() => {
      dispatch(runTimer());
    }, 1000);
  }, [dispatch]);

  const onRemoveTimer = useCallback(() => {
    clearInterval(interval!);
    interval = null;
  }, []);

  const setMonit = useCallback(
    (status) => {
      dispatch(changeMonitStatus(status));
    },
    [dispatch],
  );

  return {
    monit,
    setMonit,
    onRunTimer,
    onRemoveTimer,
  };
}

export default useMonitoring;
