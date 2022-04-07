import { useSelector } from 'react-redux';

import { RootState } from 'modules/reducers';

/**
 * @description API 요청 상태 hook
 */
function useFetch() {
  const addAutoMessageStatus = useSelector(
    (state: RootState) => state.message.request.addAutoMessage.fetch,
  ); // 자동 문자 삭제 API 상태
  const removeAutoMessageStatus = useSelector(
    (state: RootState) => state.message.request.removeAutoMessage.fetch,
  ); // 자동 문자 삭제 API 상태

  return {
    addAutoMessageStatus,
    removeAutoMessageStatus,
  };
}

export default useFetch;
