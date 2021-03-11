import { runTimer } from 'modules/actions/user';
import { useEffect, useRef } from 'react';

function useInterval(callback: () => void, delay: number) {
  const savedCallback = useRef<() => void>();

  useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  useEffect(() => {
    const id = setInterval(savedCallback.current!, delay);

    return () => {
      clearInterval(id);
    };
  }, [delay]);
}

export default useInterval;
