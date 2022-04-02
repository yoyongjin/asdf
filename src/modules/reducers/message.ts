import produce from 'immer';
import { createReducer } from 'typesafe-actions';

import * as types from 'modules/actions/message';
import { TMessageAction, IMessageState } from 'types/message';

const defaultMaxCountItem = {
  branch_id: 0,
  branch_name: '',
  max_count_date: 0,
  max_count_mouth: 0,
};

const initialState: IMessageState = {
  request: {
    getSmsCount: {
      fetch: false,
      error: '',
    },
    modifySmsCount: {
      fetch: false,
      error: '',
    },
  },
  max_count_data: [defaultMaxCountItem],
};

const userReducer = createReducer<IMessageState, TMessageAction>(initialState, {
  [types.FAILURE_GET_SMS_COUNT]: (state, action) => {
    // 발송 수량 가져오기 실패
    return produce(state, (draft) => {
      draft.request.getSmsCount.fetch = false;
      draft.request.getSmsCount.error = action.payload;
    });
  },
  [types.REQUEST_GET_SMS_COUNT]: (state, action) => {
    // 발송 수량 가져오기 요청
    return produce(state, (draft) => {
      draft.request.getSmsCount.fetch = true;
    });
  },
  [types.SUCCESS_GET_SMS_COUNT]: (state, action) => {
    // 발송 수량 가져오기 성공
    return produce(state, (draft) => {
      draft.max_count_data = action.payload;
      draft.request.getSmsCount.fetch = false;
      draft.request.getSmsCount.error = '';
    });
  },
  [types.FAILURE_MODIFY_SMS_COUNT]: (state, action) => {
    // 발송 수량 수정하기 실패
    return produce(state, (draft) => {
      draft.request.modifySmsCount.fetch = false;
      draft.request.modifySmsCount.error = action.payload;
    });
  },
  [types.REQUEST_MODIFY_SMS_COUNT]: (state, action) => {
    // 발송 수량 수정하기 요청
    return produce(state, (draft) => {
      draft.request.modifySmsCount.fetch = true;
    });
  },
  [types.SUCCESS_MODIFY_SMS_COUNT]: (state, action) => {
    // 발송 수량 수정하기 성공
    return produce(state, (draft) => {
      draft.request.modifySmsCount.fetch = false;
      draft.request.modifySmsCount.error = '';
    });
  },
});

export default userReducer;
