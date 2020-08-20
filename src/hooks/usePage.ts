import { useState, useCallback } from 'react';
import { useSelector } from 'react-redux';

import { RootState } from 'modules/reducers';
import { getMaxPage } from 'utils/utils';

function usePage() {
  const countBranch = useSelector(
    (state: RootState) => state.branch.numberOfBranch,
  );
  const countUser = useSelector((state: RootState) => state.user.numberOfUsers);
  const [page, setPage] = useState<number>(1);

  const onClickNextPage = useCallback(
    (cur: number, total: number, isEnd = false) => {
      let maxPage = getMaxPage(total);
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
    countUser,
    countBranch,
    onClickNextPage,
    onClickPrevPage,
  };
}

export default usePage;
