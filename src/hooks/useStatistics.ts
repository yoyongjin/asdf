import { useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { requestGetStatistics } from 'modules/actions/statistics';
import { RootState } from 'modules/reducers';
import { RequestGetStatistics } from 'types/statistics';

function useStatistics() {
  const statistics = useSelector(
    (state: RootState) => state.statistics.statistics,
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

  return {
    statistics,
    handleGetStatistics,
  };
}

export type HandleGetStatistics = (
  startDate: string,
  endDate: string,
  searchType?: number,
  searchText?: string,
) => void;

export default useStatistics;
