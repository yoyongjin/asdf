import { useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import {
  requestGetCallStatisticsByConsultant,
  requestGetStatistics,
} from 'modules/actions/statistics';
import { RootState } from 'modules/reducers';
import { RequestGetStatistics } from 'types/statistics';

function useStatistics() {
  const statistics = useSelector(
    (state: RootState) => state.statistics.statistics,
  );
  const callStatisticsByConsultantData = useSelector(
    (state: RootState) => state.statistics.callStatisticsByConsultant,
  );

  const dispatch = useDispatch();

  const handleGetStatistics = useCallback(
    (
      startDate: string,
      endDate: string,
      searchType?: number,
      searchText?: string,
    ) => {
      const payload: RequestGetStatistics = {
        start_date: startDate,
        end_date: endDate,
      };

      if (searchType && searchText) {
        payload.search_type = searchType;
        payload.search_text = searchText;
      }

      dispatch(requestGetStatistics(payload));
    },
    [dispatch],
  );

  const handleGetCallStatisticsByConsultant = useCallback(
    (
      ids: string,
      breakUp: string,
      startDate: string,
      endDate: string,
      startTime: string,
      endTime: string,
      searchType: number,
      page: number,
      limit: number,
    ) => {
      const payload = {
        ids,
        include_leaver: breakUp,
        start_date: startDate,
        end_date: endDate,
        start_time: startTime,
        end_time: endTime,
        search_type: searchType,
        page,
        page_count: limit,
      };

      dispatch(requestGetCallStatisticsByConsultant(payload));
    },
    [dispatch],
  );

  return {
    statistics,
    handleGetStatistics,
    handleGetCallStatisticsByConsultant,
    callStatisticsByConsultantData,
  };
}

export type HandleGetStatistics = (
  startDate: string,
  endDate: string,
  searchType?: number,
  searchText?: string,
) => void;

export type THandleGetCallStatisticsByConsultant = (
  ids: string,
  breakUp: string,
  startDate: string,
  endDate: string,
  startTime: string,
  endTime: string,
  searchType: number,
  page: number,
  limit: number,
) => void;

export default useStatistics;
