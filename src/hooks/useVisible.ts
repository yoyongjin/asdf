import { useCallback, useState } from 'react';

function useVisible() {
  const [visible, setVisible] = useState<boolean>(false);

  const onClickVisible = useCallback(() => {
    setVisible(!visible);
  }, [visible]);

  return {
    visible,
    onClickVisible,
  };
}

export type TOnClickVisible = () => void;

export default useVisible;
