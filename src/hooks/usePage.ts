import { useState, useCallback } from 'react';
import { useSelector } from 'react-redux';

import { RootState } from 'modules/reducers';
import Utils from 'utils/new_utils';

function usePage() {
  const maxPhones = useSelector(
    (state: RootState) => state.phone.phonesAllCount,
  );
  const maxBranch = useSelector(
    (state: RootState) => state.organization.numberOfBranch,
  );
  const maxUser = useSelector((state: RootState) => state.user.numberOfUsers);
  const maxAutoMessage = useSelector(
    (state: RootState) => state.message.autoMessageAllCount,
  );
  const maxCallStatisticsByConsultant = useSelector(
    (state: RootState) => state.statistics.callStatisticsByConsultantAllCount,
  );
  const maxCallStatisticsByTeam = useSelector(
    (state: RootState) => state.statistics.callStatisticsByTeamAllCount,
  );
  const maxAutoMessageStatistics = useSelector(
    (state: RootState) => state.statistics.autoMessageStatisticsAllCount,
  );
  const maxMessageStatistics = useSelector(
    (state: RootState) => state.statistics.messageStatisticsAllCount,
  );
  const [page, setPage] = useState<number>(1);

  const onChangeCurrentPage = useCallback(
    (cur: number, total: number, divide: number) => {
      let maxPage = Utils.getMaxPage(total, divide);

      if (cur > maxPage) {
        setPage(maxPage);
      }
    },
    [],
  );

  const onClickNextPage = useCallback(
    (cur: number, total: number, divide: number, isEnd = false) => {
      let maxPage = Utils.getMaxPage(total, divide);
      if (cur >= maxPage) return;

      if (isEnd) {
        setPage(maxPage);
      } else {
        setPage((page) => page + 1);
      }
    },
    [],
  );

  const onClickPrevPage = useCallback(
    (cur: number, total: number, isStart = false) => {
      if (cur <= 1) return;

      if (isStart) {
        setPage(1);
      } else {
        setPage((page) => page - 1);
      }
    },
    [],
  );

  return {
    page,
    maxPhones,
    maxUser,
    maxBranch,
    maxAutoMessage,
    maxCallStatisticsByConsultant,
    maxAutoMessageStatistics,
    onClickNextPage,
    onClickPrevPage,
    onChangeCurrentPage,
    maxMessageStatistics,
    maxCallStatisticsByTeam,
  };
}

export default usePage;
