import { useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { runTimer } from 'modules/actions/user';

let interval: number | null = null;
function useMonitoring() {
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
  return {
    onRunTimer,
    onRemoveTimer,
  };
}

export default useMonitoring;
