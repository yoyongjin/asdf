import produce from 'immer';
import { createReducer } from 'typesafe-actions';

import * as actions from 'modules/actions/statistics';
import { StatisticsAction, StatisticsState } from 'types/statistics';

// 상태
const initialState: StatisticsState = {
  request: {
    getStatistics: {
      fetch: false,
      error: '',
    },
  },
  statistics: [],
};

// 리듀서
const authReducer = createReducer<StatisticsState, StatisticsAction>(
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
  },
);

export default authReducer;
