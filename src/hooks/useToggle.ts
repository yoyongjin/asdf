import { useCallback, useState } from 'react';

function useToggle() {
  const [isToggle, setToggle] = useState<boolean>(false);

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
