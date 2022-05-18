import { useSelector } from 'react-redux';

import { RootState } from 'modules/reducers';

/**
 * @description API 요청 상태 hook
 */
function useFetch() {
  const addAutoMessageStatus = useSelector(
    (state: RootState) => state.message.request.addAutoMessage.fetch,
  ); // 자동 문자 삭제 API 상태
  const modifyAutoMessageStatus = useSelector(
    (state: RootState) => state.message.request.modifyAutoMessage.fetch,
  ); // 자동 문자 수정 API 상태
  const removeAutoMessageStatus = useSelector(
    (state: RootState) => state.message.request.removeAutoMessage.fetch,
  ); // 자동 문자 삭제 API 상태
  const removeUserStatus = useSelector(
    (state: RootState) => state.user.request.removeUser.fetch,
  );
  const modifyPhoneInfoStatus = useSelector(
    (state: RootState) => state.phone.request.modifyPhoneInfo.fetch,
  ); // 휴대폰 정보 수정 API 상태
  const removePhoneInfoStatus = useSelector(
    (state: RootState) => state.phone.request.removePhoneInfo.fetch,
  ); // 휴대폰 정보 삭제 API 상태
  const syncBatchUserStatus = useSelector(
    (state: RootState) => state.batch.request.syncBatchUser.fetch,
  ); // 유저 배치 API 상태
  const syncIPStatus = useSelector(
    (state: RootState) => state.batch.request.syncIP.fetch,
  ); // IP 배치 API 상태
  const syncKSVCStatus = useSelector(
    (state: RootState) => state.batch.request.syncKSVC.fetch,
  ); // KSVC 배치 API 상태
  const syncPhoneInfoStatus = useSelector(
    (state: RootState) => state.batch.request.syncPhoneInfo.fetch,
  ); // 휴대폰 정보 배치 API 상태

  return {
    addAutoMessageStatus,
    modifyAutoMessageStatus,
    removeAutoMessageStatus,
    removeUserStatus,
    modifyPhoneInfoStatus,
    removePhoneInfoStatus,
    syncBatchUserStatus,
    syncIPStatus,
    syncKSVCStatus,
    syncPhoneInfoStatus,
  };
}

export default useFetch;
