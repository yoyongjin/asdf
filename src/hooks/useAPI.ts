import { useCallback } from 'react';

import * as API from 'lib/api';

function useAPI() {
  // redux를 쓰지 않아도 되는 것들 모음집..!
  const resetPassword = useCallback(async () => {
    try {
      const response = await API.resetPassword();
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  }, []);

  return {
    resetPassword,
  };
}

export default useAPI;
