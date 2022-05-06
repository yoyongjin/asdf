import produce from 'immer';
import { createReducer } from 'typesafe-actions';

import * as types from 'modules/actions/phone';
import { TPhoneAction, IPhoneState } from 'types/phone';
import { USED_PHONE_STATUS } from 'utils/constants';

const defaultTelecomValue = [
  {
    id: 0,
    telecom: '통신사',
  },
];

const defaultPlanByTelecomValue = [
  {
    id: 0,
    plan: '요금제',
  },
];

const defaultPhoneInfoValue = {
  serial_number: '',
  telecom: '',
  plan: '',
  used: USED_PHONE_STATUS.DEFAULT,
};

const initialState: IPhoneState = {
  request: {
    getTelecom: {
      fetch: false,
      error: '',
    },
    getPlanByTelecom: {
      fetch: false,
      error: '',
    },
    getPhoneInfo: {
      fetch: false,
      error: '',
    },
    getPhones: {
      fetch: false,
      error: '',
    },
    modifyPhoneInfo: {
      fetch: false,
      error: '',
    },
    removePhoneInfo: {
      fetch: false,
      error: '',
    },
  },
  telecoms: defaultTelecomValue,
  plans: defaultPlanByTelecomValue,
  info: defaultPhoneInfoValue,
  phones: [],
  phonesAllCount: 0,
};

const userReducer = createReducer<IPhoneState, TPhoneAction>(initialState, {
  [types.FAILURE_GET_PHONES]: (state, action) => {
    // 전체 휴대전화 정보 가져오기 실패
    return produce(state, (draft) => {
      draft.request.getPhones.fetch = false;
      draft.request.getPhones.error = action.payload;
    });
  },
  [types.FAILURE_GET_PHONE_INFO]: (state, action) => {
    // 휴대전화 정보 가져오기 실패
    return produce(state, (draft) => {
      draft.request.getPhoneInfo.fetch = false;
      draft.request.getPhoneInfo.error = action.payload;
    });
  },
  [types.FAILURE_GET_PLAN_BY_TELECOM]: (state, action) => {
    // 통신사별 요금제 가져오기 실패
    return produce(state, (draft) => {
      draft.request.getPlanByTelecom.fetch = false;
      draft.request.getPlanByTelecom.error = action.payload;
    });
  },
  [types.FAILURE_GET_TELECOM]: (state, action) => {
    // 통신사 가져오기 실패
    return produce(state, (draft) => {
      draft.request.getTelecom.fetch = false;
      draft.request.getTelecom.error = action.payload;
    });
  },
  [types.FAILURE_MODIFY_PHONE_INFO]: (state, action) => {
    // 휴대폰 정보 변경하기 실패
    return produce(state, (draft) => {
      draft.request.modifyPhoneInfo.fetch = false;
      draft.request.modifyPhoneInfo.error = action.payload;
    });
  },
  [types.FAILURE_REMOVE_PHONE_INFO]: (state, action) => {
    // 휴대폰 정보 삭제하기 실패
    return produce(state, (draft) => {
      draft.request.removePhoneInfo.fetch = false;
      draft.request.removePhoneInfo.error = action.payload;
    });
  },
  [types.REQUEST_GET_PHONE_INFO]: (state, action) => {
    // 휴대전화 정보 가져오기 요청
    return produce(state, (draft) => {
      draft.request.getPhoneInfo.fetch = true;
    });
  },
  [types.REQUEST_GET_PHONES]: (state, action) => {
    // 전체 휴대전화 정보 가져오기 요청
    return produce(state, (draft) => {
      draft.request.getPhones.fetch = true;
    });
  },
  [types.REQUEST_GET_PLAN_BY_TELECOM]: (state, action) => {
    // 통신사별 요금제 가져오기 요청
    return produce(state, (draft) => {
      draft.request.getPlanByTelecom.fetch = true;
    });
  },
  [types.REQUEST_GET_TELECOM]: (state, action) => {
    // 통신사 가져오기 요청
    return produce(state, (draft) => {
      draft.request.getTelecom.fetch = true;
    });
  },
  [types.REQUEST_MODIFY_PHONE_INFO]: (state, action) => {
    // 휴대폰 정보 변경하기 요청
    return produce(state, (draft) => {
      draft.request.modifyPhoneInfo.fetch = true;
    });
  },
  [types.REQUEST_REMOVE_PHONE_INFO]: (state, action) => {
    // 휴대폰 정보 삭제하기 요청
    return produce(state, (draft) => {
      draft.request.removePhoneInfo.fetch = true;
    });
  },
  [types.SET_INITIALIZE_PHONE_INFO]: (state, action) => {
    // phone info 초기화하기
    return produce(state, (draft) => {
      draft.info = defaultPhoneInfoValue;
    });
  },
  [types.SUCCESS_GET_PHONE_INFO]: (state, action) => {
    // 휴대전화 정보 가져오기 성공
    return produce(state, (draft) => {
      draft.info = action.payload || defaultPhoneInfoValue;

      draft.request.getPhoneInfo.fetch = false;
      draft.request.getPhoneInfo.error = '';
    });
  },
  [types.SUCCESS_GET_PLAN_BY_TELECOM]: (state, action) => {
    // 통신사별 요금제 가져오기 성공
    const newPlan = defaultPlanByTelecomValue.concat(...action.payload);

    return produce(state, (draft) => {
      draft.plans = newPlan;
      draft.request.getPlanByTelecom.fetch = false;
      draft.request.getPlanByTelecom.error = '';
    });
  },
  [types.SUCCESS_GET_TELECOM]: (state, action) => {
    // 통신사 가져오기 성공
    const newTelecom = defaultTelecomValue.concat(...action.payload);

    return produce(state, (draft) => {
      draft.telecoms = newTelecom;
      draft.request.getTelecom.fetch = false;
      draft.request.getTelecom.error = '';
    });
  },
  [types.SUCCESS_GET_PHONES]: (state, action) => {
    // 전체 휴대전화 정보 가져오기 성공
    return produce(state, (draft) => {
      draft.request.getPhones.fetch = false;
      draft.request.getPhones.error = '';

      console.log(action.payload);

      draft.phones = action.payload.list;
      draft.phonesAllCount = action.payload.cnt;
    });
  },
  [types.SUCCESS_MODIFY_PHONE_INFO]: (state, action) => {
    // 휴대전화 정보 수정하기 성공
    return produce(state, (draft) => {
      draft.request.modifyPhoneInfo.fetch = false;
      draft.request.modifyPhoneInfo.error = '';
    });
  },
  [types.SUCCESS_REMOVE_PHONE_INFO]: (state, action) => {
    // 휴대전화 정보 삭제하기 성공
    return produce(state, (draft) => {
      draft.request.removePhoneInfo.fetch = false;
      draft.request.removePhoneInfo.error = '';
    });
  },
});

export default userReducer;
