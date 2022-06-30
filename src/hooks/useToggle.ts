import { useCallback, useState } from 'react';

function useToggle(init = false) {
  const [isToggle, setToggle] = useState<boolean>(init);

  const onClickToggle = useCallback((isChecked?: boolean) => {
    setToggle((currentToggle) => {
      return isChecked ?? !currentToggle;
    });
  }, []);

  return {
    isToggle,
    onClickToggle,
  };
}

export type TOnClickToggle = () => void;

export default useToggle;
