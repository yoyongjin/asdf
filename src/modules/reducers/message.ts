import _ from 'lodash';
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

const defaultAutoMessageItem = {
  id: 0,
  branch_id: 0,
  title: '',
  content: '',
  start_date: null,
  end_date: null,
  start_time: null,
  end_time: null,
  days: null,
  use_yn: '',
  code: null,
  priority: null,
  created_at: '',
};

const initialState: IMessageState = {
  request: {
    getAutoMessage: {
      fetch: false,
      error: '',
    },
    getSmsCount: {
      fetch: false,
      error: '',
    },
    modifySmsCount: {
      fetch: false,
      error: '',
    },
    removeAutoMessage: {
      fetch: false,
      error: '',
    },
    setUsedAutoMessage: {
      fetch: false,
      error: '',
    },
  },
  max_count_data: [defaultMaxCountItem],
  autoMessageData: [defaultAutoMessageItem],
  autoMessageAllCount: 0,
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
  [types.FAILURE_GET_AUTO_MESSAGE]: (state, action) => {
    // 자동 문자 가져오기 실패
    return produce(state, (draft) => {
      draft.request.getAutoMessage.fetch = false;
      draft.request.getAutoMessage.error = action.payload;
    });
  },
  [types.REQUEST_GET_AUTO_MESSAGE]: (state, action) => {
    // 자동 문자 가져오기 요청
    return produce(state, (draft) => {
      draft.request.getAutoMessage.fetch = true;
    });
  },
  [types.SUCCESS_GET_AUTO_MESSAGE]: (state, action) => {
    // 자동 문자 가져오기 성공
    return produce(state, (draft) => {
      draft.autoMessageData = action.payload.data;
      draft.autoMessageAllCount = action.payload.count;
      draft.request.getAutoMessage.fetch = false;
      draft.request.getAutoMessage.error = '';
    });
  },
  [types.FAILURE_SET_USED_AUTO_MESSAGE]: (state, action) => {
    // 자동 문자 사용 유무 설정하기 실패
    return produce(state, (draft) => {
      draft.request.setUsedAutoMessage.fetch = false;
      draft.request.setUsedAutoMessage.error = action.payload;
    });
  },
  [types.REQUEST_SET_USED_AUTO_MESSAGE]: (state, action) => {
    // 자동 문자 사용 유무 설정하기 요청
    return produce(state, (draft) => {
      draft.request.setUsedAutoMessage.fetch = true;
    });
  },
  [types.SUCCESS_SET_USED_AUTO_MESSAGE]: (state, action) => {
    // 자동 문자 사용 유무 설정하기 성공
    return produce(state, (draft) => {
      draft.request.setUsedAutoMessage.fetch = false;
      draft.request.setUsedAutoMessage.error = '';

      const autoMessageData = _.cloneDeep(state.autoMessageData);

      const index = autoMessageData.findIndex(
        (values) => values.id === action.payload.id,
      );

      if (index < 0) {
        return;
      }

      autoMessageData[index].use_yn = action.payload.use_yn;

      draft.autoMessageData = autoMessageData;
    });
  },
  [types.FAILURE_REMOVE_AUTO_MESSAGE]: (state, action) => {
    // 자동 문자 삭제하기 실패
    return produce(state, (draft) => {
      draft.request.removeAutoMessage.fetch = false;
      draft.request.removeAutoMessage.error = action.payload;
    });
  },
  [types.REQUEST_REMOVE_AUTO_MESSAGE]: (state, action) => {
    // 자동 문자 삭제하기 요청
    return produce(state, (draft) => {
      draft.request.removeAutoMessage.fetch = true;
    });
  },
  [types.SUCCESS_REMOVE_AUTO_MESSAGE]: (state, action) => {
    // 자동 문자 삭제하기 성공
    return produce(state, (draft) => {
      draft.request.removeAutoMessage.fetch = false;
      draft.request.removeAutoMessage.error = '';
    });
  },
});

export default userReducer;
