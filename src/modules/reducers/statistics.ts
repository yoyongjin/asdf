import produce from 'immer';
import { createReducer } from 'typesafe-actions';

import * as actions from 'modules/actions/statistics';
import { IStatisticsState, TStatisticsAction } from 'types/statistics';

const defalutCallStatisticsItem = {
  DATE: '',
  connect_call: 0,
  fail_call: 0,
  ring_time: 0,
  talk_time: 0,
  total_call: 0,
  total_time: 0,
};

// 상태
const initialState: IStatisticsState = {
  request: {
    getStatistics: {
      fetch: false,
      error: '',
    },
    getCallStatisticsByConsultant: {
      fetch: false,
      error: '',
    },
  },
  statistics: [],
  callStatisticsByConsultant: [],
  callStatisticsByConsultantAllCount: 0,
  callStatisticsByConsultantTotal: {
    all: defalutCallStatisticsItem,
    incoming: defalutCallStatisticsItem,
    outcoming: defalutCallStatisticsItem,
  },
};

// 리듀서
const authReducer = createReducer<IStatisticsState, TStatisticsAction>(
  initialState,
  {
    [actions.REQUEST_GET_STATISTICS]: (state, action) => {
      return produce(state, (draft) => {
        draft.request.getStatistics.fetch = true;
      });
    },
    [actions.SUCCESS_GET_STATISTICS]: (state, action) => {
      return produce(state, (draft) => {
        draft.statistics = action.payload;

        draft.request.getStatistics.fetch = false;
        if (state.request.getStatistics.error) {
          draft.request.getStatistics.error = '';
        }
      });
    },
    [actions.FAILURE_GET_STATISTICS]: (state, action) => {
      return produce(state, (draft) => {
        draft.request.getStatistics.fetch = false;
        draft.request.getStatistics.error = action.payload;
      });
    },
    [actions.REQUEST_GET_CALL_STATISTICS_BY_CONSULTANT]: (state, action) => {
      // 상담원별 통화 통계 가져오기
      return produce(state, (draft) => {
        draft.request.getCallStatisticsByConsultant.fetch = true;
      });
    },
    [actions.SUCCESS_GET_CALL_STATISTICS_BY_CONSULTANT]: (state, action) => {
      // 상담원별 통화 통계 가져오기 성공
      return produce(state, (draft) => {
        draft.callStatisticsByConsultant = action.payload.list;
        draft.callStatisticsByConsultantAllCount = action.payload.common.cnt;
        draft.callStatisticsByConsultantTotal = action.payload.common.total;
        draft.request.getCallStatisticsByConsultant.fetch = false;
        draft.request.getCallStatisticsByConsultant.error = '';
      });
    },
    [actions.FAILURE_GET_CALL_STATISTICS_BY_CONSULTANT]: (state, action) => {
      // 상담원별 통화 통계 가져오기 실패
      return produce(state, (draft) => {
        draft.request.getStatistics.fetch = false;
        draft.request.getStatistics.error = action.payload;
      });
    },
  },
);

export default authReducer;
