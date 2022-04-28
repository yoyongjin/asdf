import { useCallback, useState } from 'react';

function useHover() {
  const [isHover, setIsHover] = useState<boolean>(false);

  const onMouseIn = useCallback(() => {
    setIsHover(true);
  }, []);

  const onMouseOut = useCallback(() => {
    setIsHover(false);
  }, []);

  return {
    isHover,
    onMouseIn,
    onMouseOut,
  };
}

export default useHover;
