import { useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import {
  requestGetAutoMessageStatistics,
  requestGetCallStatisticsByConsultant,
  requestGetCallStatisticsByTeam,
  requestGetMessageStatistics,
  requestGetStatistics,
  setInitializeAutoMessageStatistics,
  setInitializeCallStatisticsByConsultant,
  setInitializeCallStatisticsByTeam,
  setInitializeMessageStatistics,
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
  const callStatisticsByTeamData = useSelector(
    (state: RootState) => state.statistics.callStatisticsByTeam,
  );
  const autoMessageStatisticsData = useSelector(
    (state: RootState) => state.statistics.autoMessageStatistics,
  );
  const messageStatisticsData = useSelector(
    (state: RootState) => state.statistics.messageStatistics,
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
      breakUp: boolean,
      startDate: string,
      endDate: string,
      startTime: string,
      endTime: string,
      searchType: number,
      page: number,
      limit: number,
      isExcel: boolean,
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
        isExcel,
      };

      dispatch(requestGetCallStatisticsByConsultant(payload));
    },
    [dispatch],
  );

  const handleGetCallStatisticsByTeam = useCallback(
    (
      ids: string,
      breakUp: boolean,
      startDate: string,
      endDate: string,
      startTime: string,
      endTime: string,
      searchType: number,
      page: number,
      limit: number,
      isExcel: boolean,
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
        isExcel,
      };

      dispatch(requestGetCallStatisticsByTeam(payload));
    },
    [dispatch],
  );

  const handleInitializeCallStatisticsByConsultant = useCallback(() => {
    dispatch(setInitializeCallStatisticsByConsultant());
  }, [dispatch]);

  const handleInitializeCallStatisticsByTeam = useCallback(() => {
    dispatch(setInitializeCallStatisticsByTeam());
  }, [dispatch]);

  const handleInitializeAutoMessageStatistics = useCallback(() => {
    dispatch(setInitializeAutoMessageStatistics());
  }, [dispatch]);

  const handleInitializeMessageStatistics = useCallback(() => {
    dispatch(setInitializeMessageStatistics());
  }, [dispatch]);

  const handleGetAutoMessageStatistics = useCallback(
    (
      ids: string,
      breakUp: boolean,
      startDate: string,
      endDate: string,
      page: number,
      limit: number,
      isExcel: boolean,
    ) => {
      const payload = {
        ids,
        include_leaver: breakUp,
        isExcel,
        start_date: startDate,
        end_date: endDate,
        page,
        page_count: limit,
      };

      dispatch(requestGetAutoMessageStatistics(payload));
    },
    [dispatch],
  );

  const handleGetMessageStatistics = useCallback(
    (
      ids: string,
      breakUp: boolean,
      startDate: string,
      endDate: string,
      page: number,
      limit: number,
      isExcel: boolean,
    ) => {
      const payload = {
        ids,
        include_leaver: breakUp,
        start_date: startDate,
        end_date: endDate,
        page,
        page_count: limit,
        isExcel,
      };

      dispatch(requestGetMessageStatistics(payload));
    },
    [dispatch],
  );

  return {
    statistics,
    handleGetStatistics,
    handleGetCallStatisticsByConsultant,
    callStatisticsByConsultantData,
    autoMessageStatisticsData,
    messageStatisticsData,
    handleGetAutoMessageStatistics,
    handleInitializeCallStatisticsByConsultant,
    handleInitializeAutoMessageStatistics,
    handleGetMessageStatistics,
    handleInitializeMessageStatistics,
    handleInitializeCallStatisticsByTeam,
    handleGetCallStatisticsByTeam,
    callStatisticsByTeamData,
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
  breakUp: boolean,
  startDate: string,
  endDate: string,
  startTime: string,
  endTime: string,
  searchType: number,
  page: number,
  limit: number,
) => void;

export default useStatistics;
