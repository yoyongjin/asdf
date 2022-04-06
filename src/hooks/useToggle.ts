import { useCallback, useState } from 'react';

function useToggle() {
  const [isToggle, setToggle] = useState<boolean>(false);

  const onClickToggle = useCallback(() => {
    setToggle(!isToggle);
  }, [isToggle]);

  return {
    isToggle,
    onClickToggle,
  };
}

export type TOnClickToggle = () => void;

export default useToggle;
