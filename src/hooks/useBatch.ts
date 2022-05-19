import {
  requestSyncBranchUser,
  requestSyncIP,
  requestSyncKSVC,
  requestSyncPhoneInfo,
  setKSVCProcessStatus,
} from 'modules/actions/batch';
import { RootState } from 'modules/reducers';
import { useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Toast from 'utils/toast';

let ksvcProcessTimeout: NodeJS.Timeout | null = null;

function useBatch() {
  const ksvcProcessStatus = useSelector(
    (state: RootState) => state.batch.ksvc_process_status,
  );

  const dispatch = useDispatch();

  /**
   * @description 소켓으로 이벤트를 받지 못할 경우를 처리하기 위한 로직
   */
  useEffect(() => {
    if (ksvcProcessStatus) {
      ksvcProcessTimeout = setTimeout(() => {
        Toast.warning('KSVC 프로세스에 실패했어요..😭');

        dispatch(setKSVCProcessStatus(false));

        if (ksvcProcessTimeout) {
          clearTimeout(ksvcProcessTimeout);
          ksvcProcessTimeout = null;
        }
      }, 1000 * 10);

      return;
    }

    if (ksvcProcessTimeout) {
      clearTimeout(ksvcProcessTimeout);
      ksvcProcessTimeout = null;
    }
  }, [dispatch, ksvcProcessStatus]);

  const handleSyncBranchAndUser = useCallback(() => {
    dispatch(requestSyncBranchUser());
  }, [dispatch]);

  const handleSyncKSVC = useCallback(() => {
    dispatch(requestSyncKSVC());
  }, [dispatch]);

  const handleSyncIP = useCallback(() => {
    dispatch(requestSyncIP());
  }, [dispatch]);

  const handleSyncPhoneInfo = useCallback(() => {
    dispatch(requestSyncPhoneInfo());
  }, [dispatch]);

  return {
    ksvcProcessStatus,
    handleSyncBranchAndUser,
    handleSyncKSVC,
    handleSyncIP,
    handleSyncPhoneInfo,
  };
}

export default useBatch;
