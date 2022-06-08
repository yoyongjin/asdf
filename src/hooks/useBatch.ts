import { useCallback } from 'react';
import { useDispatch } from 'react-redux';

import {
  requestSyncBranchUser,
  requestSyncIP,
  requestSyncKSVC,
  requestSyncPhoneInfo,
} from 'modules/actions/batch';

function useBatch() {
  const dispatch = useDispatch();

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
    handleSyncBranchAndUser,
    handleSyncKSVC,
    handleSyncIP,
    handleSyncPhoneInfo,
  };
}

export default useBatch;
