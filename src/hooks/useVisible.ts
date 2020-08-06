import { useState } from 'react';
function useVisible() {
  const [visible, setVisible] = useState<boolean>(false);

  const onClickVisible = () => {
    setVisible(!visible);
  };

  return {
    visible,
    onClickVisible,
  };
}

export default useVisible;
