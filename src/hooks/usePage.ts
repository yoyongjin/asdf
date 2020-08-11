import { useState, useCallback } from 'react';
import { useSelector } from 'react-redux';

import { RootState } from 'modules/reducers';
import { getMaxPage } from 'utils/utils';

function usePage() {
  const countBranch = useSelector((state: RootState) => state.branch.numberOfBranch)
  const countUser = useSelector((state: RootState) => state.user.numberOfUsers);
  const [page, setPage] = useState<number>(1);

  const onClickNextPage = useCallback(
    (isEnd = false) => {
      let maxPage = getMaxPage(countUser);
      if (page >= maxPage) return;

      if (isEnd) {
        setPage(maxPage);
      } else {
        setPage((page) => page + 1);
      }
    },
    [page, countUser],
  );

  const onClickPrevPage = useCallback(
    (isStart = false) => {
      if (page <= 1) return;

      if (isStart) {
        setPage(1);
      } else {
        setPage((page) => page - 1);
      }
    },
    [page],
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
