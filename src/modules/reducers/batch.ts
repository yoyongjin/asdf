import produce from 'immer';
import { createReducer } from 'typesafe-actions';

import * as types from 'modules/actions/batch';
import { IBatchState, TBatchAction } from 'types/batch';

const initialState: IBatchState = {
  request: {
    syncBatchUser: {
      fetch: false,
      error: '',
    },
    syncKSVC: {
      fetch: false,
      error: '',
    },
    syncPhoneInfo: {
      fetch: false,
      error: '',
    },
    syncIP: {
      fetch: false,
      error: '',
    },
  },
  ksvc_process_status: false,
};

const userReducer = createReducer<IBatchState, TBatchAction>(initialState, {
  [types.FAILURE_SYNC_BRANCH_USER]: (state, action) => {
    // 조직, 인사 배치 실패
    return produce(state, (draft) => {
      draft.request.syncBatchUser.fetch = false;
      draft.request.syncBatchUser.error = action.payload;
    });
  },
  [types.FAILURE_SYNC_IP]: (state, action) => {
    // IP 배치 실패
    return produce(state, (draft) => {
      draft.request.syncIP.fetch = false;
      draft.request.syncIP.error = action.payload;
    });
  },
  [types.FAILURE_SYNC_KSVC]: (state, action) => {
    // KSVC 배치 실패
    return produce(state, (draft) => {
      draft.request.syncKSVC.fetch = false;
      draft.request.syncKSVC.error = action.payload;
    });
  },
  [types.FAILURE_SYNC_PHONE_INFO]: (state, action) => {
    // phone info 배치 실패
    return produce(state, (draft) => {
      draft.request.syncPhoneInfo.fetch = false;
      draft.request.syncPhoneInfo.error = action.payload;
    });
  },
  [types.REQUEST_SYNC_BRANCH_USER]: (state, action) => {
    // 조직, 인사 배치 요청
    return produce(state, (draft) => {
      draft.request.syncBatchUser.fetch = true;
    });
  },
  [types.REQUEST_SYNC_IP]: (state, action) => {
    // IP 배치 요청
    return produce(state, (draft) => {
      draft.request.syncIP.fetch = true;
    });
  },
  [types.REQUEST_SYNC_KSVC]: (state, action) => {
    // KSVC 배치 요청
    return produce(state, (draft) => {
      draft.request.syncKSVC.fetch = true;
    });
  },
  [types.REQUEST_SYNC_PHONE_INFO]: (state, action) => {
    // phone info 배치 요청
    return produce(state, (draft) => {
      draft.request.syncPhoneInfo.fetch = true;
    });
  },
  [types.SUCCESS_SYNC_BRANCH_USER]: (state, action) => {
    // 휴대전화 정보 가져오기 성공
    return produce(state, (draft) => {
      draft.request.syncBatchUser.fetch = false;
      draft.request.syncBatchUser.error = '';
    });
  },
  [types.SUCCESS_SYNC_IP]: (state, action) => {
    // 통신사별 요금제 가져오기 성공
    return produce(state, (draft) => {
      draft.request.syncIP.fetch = false;
      draft.request.syncIP.error = '';
    });
  },
  [types.SUCCESS_SYNC_KSVC]: (state, action) => {
    // 통신사 가져오기 성공
    return produce(state, (draft) => {
      draft.request.syncKSVC.fetch = false;
      draft.request.syncKSVC.error = '';
    });
  },
  [types.SUCCESS_SYNC_PHONE_INFO]: (state, action) => {
    // 전체 휴대전화 정보 가져오기 성공
    return produce(state, (draft) => {
      draft.request.syncPhoneInfo.fetch = false;
      draft.request.syncPhoneInfo.error = '';
    });
  },
  [types.SET_KSVC_PROCESS_STATUS]: (state, action) => {
    // KSVC 처리 상태
    return produce(state, (draft) => {
      draft.ksvc_process_status = action.payload;
    });
  },
});

export default userReducer;
