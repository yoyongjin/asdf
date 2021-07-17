import { useState, useCallback } from 'react';
import { useSelector } from 'react-redux';

import { RootState } from 'modules/reducers';
import { getMaxPage } from 'utils/utils';

function usePage() {
  const maxBranch = useSelector(
    (state: RootState) => state.branch.numberOfBranch,
  );
  const maxUser = useSelector((state: RootState) => state.user.numberOfUsers);
  const [page, setPage] = useState<number>(1);

  const onChangeCurrentPage = useCallback(
    (cur: number, total: number, divide: number) => {
      let maxPage = getMaxPage(total, divide);

      if (cur > maxPage) {
        setPage(maxPage);
      }
    },
    [],
  );

  const onClickNextPage = useCallback(
    (cur: number, total: number, divide: number, isEnd = false) => {
      let maxPage = getMaxPage(total, divide);
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
    maxUser,
    maxBranch,
    onClickNextPage,
    onClickPrevPage,
    onChangeCurrentPage,
  };
}

export default usePage;
