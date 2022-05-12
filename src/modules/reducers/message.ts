import _ from 'lodash';
import produce from 'immer';
import { createReducer } from 'typesafe-actions';

import * as types from 'modules/actions/message';
import { TMessageAction, IMessageState } from 'types/message';

const initialState: IMessageState = {
  request: {
    addAutoMessage: {
      fetch: false,
      error: '',
    },
    getAutoMessage: {
      fetch: false,
      error: '',
    },
    getSmsCount: {
      fetch: false,
      error: '',
    },
    modifyAutoMessage: {
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
  max_count_data: [],
  autoMessageData: [],
  autoMessageAllCount: 0,
};

const userReducer = createReducer<IMessageState, TMessageAction>(initialState, {
  [types.FAILURE_GET_MESSAGE_COUNT]: (state, action) => {
    // 발송 수량 가져오기 실패
    return produce(state, (draft) => {
      draft.request.getSmsCount.fetch = false;
      draft.request.getSmsCount.error = action.payload;
    });
  },
  [types.REQUEST_GET_MESSAGE_COUNT]: (state, action) => {
    // 발송 수량 가져오기 요청
    return produce(state, (draft) => {
      draft.request.getSmsCount.fetch = true;
    });
  },
  [types.SUCCESS_GET_MESSAGE_COUNT]: (state, action) => {
    // 발송 수량 가져오기 성공
    return produce(state, (draft) => {
      draft.max_count_data = action.payload;
      draft.request.getSmsCount.fetch = false;
      draft.request.getSmsCount.error = '';
    });
  },
  [types.FAILURE_MODIFY_MESSAGE_COUNT]: (state, action) => {
    // 발송 수량 수정하기 실패
    return produce(state, (draft) => {
      draft.request.modifySmsCount.fetch = false;
      draft.request.modifySmsCount.error = action.payload;
    });
  },
  [types.REQUEST_MODIFY_MESSAGE_COUNT]: (state, action) => {
    // 발송 수량 수정하기 요청
    return produce(state, (draft) => {
      draft.request.modifySmsCount.fetch = true;
    });
  },
  [types.SUCCESS_MODIFY_MESSAGE_COUNT]: (state, action) => {
    // 발송 수량 수정하기 성공
    return produce(state, (draft) => {
      draft.request.modifySmsCount.fetch = false;
      draft.request.modifySmsCount.error = '';

      const index = state.max_count_data.findIndex(
        (values) => values.branch_id === action.payload.branch_id,
      );

      if (index > -1) {
        const maxCountData = _.cloneDeep(state.max_count_data);
        maxCountData[index].max_count_date = action.payload.max_count_date;
        maxCountData[index].max_count_month = action.payload.max_count_month;

        draft.max_count_data = maxCountData;
      }
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
  [types.FAILURE_ADD_AUTO_MESSAGE]: (state, action) => {
    // 자동 문자 추가하기 실패
    return produce(state, (draft) => {
      draft.request.addAutoMessage.fetch = false;
      draft.request.addAutoMessage.error = action.payload;
    });
  },
  [types.REQUEST_ADD_AUTO_MESSAGE]: (state, action) => {
    // 자동 문자 추가하기 요청
    return produce(state, (draft) => {
      draft.request.addAutoMessage.fetch = true;
    });
  },
  [types.SUCCESS_ADD_AUTO_MESSAGE]: (state, action) => {
    // 자동 문자 추가하기 성공
    return produce(state, (draft) => {
      draft.request.addAutoMessage.fetch = false;
      draft.request.addAutoMessage.error = '';
    });
  },
  [types.FAILURE_MODIFY_AUTO_MESSAGE]: (state, action) => {
    // 자동 문자 수정하기 실패
    return produce(state, (draft) => {
      draft.request.modifyAutoMessage.fetch = false;
      draft.request.modifyAutoMessage.error = action.payload;
    });
  },
  [types.REQUEST_MODIFY_AUTO_MESSAGE]: (state, action) => {
    // 자동 문자 수정하기 요청
    return produce(state, (draft) => {
      draft.request.modifyAutoMessage.fetch = true;
    });
  },
  [types.SUCCESS_MODIFY_AUTO_MESSAGE]: (state, action) => {
    // 자동 문자 수정하기 성공
    return produce(state, (draft) => {
      draft.request.modifyAutoMessage.fetch = false;
      draft.request.modifyAutoMessage.error = '';
    });
  },
});

export default userReducer;
