import { useSelector } from 'react-redux';

import { RootState } from 'modules/reducers';

/**
 * @description API 요청 상태 hook
 */
function useFetch() {
  const removeAutoMessageStatus = useSelector(
    (state: RootState) => state.message.request.removeAutoMessage.fetch,
  ); // 자동 문자 삭제 API 상태

  return {
    removeAutoMessageStatus,
  };
}

export default useFetch;
