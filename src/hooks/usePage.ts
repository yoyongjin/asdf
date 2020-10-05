import { useState, useCallback } from 'react';
import { useSelector } from 'react-redux';

import { RootState } from 'modules/reducers';
import { getMaxPage } from 'utils/utils';

// import useInputForm from 'hooks/useInputForm';

function usePage() {
  const countBranch = useSelector(
    (state: RootState) => state.branch.numberOfBranch,
  );
  const countUser = useSelector(
    (state: RootState) => state.user.userList.numberOfUsers,
  );
  const filterCountUser = useSelector(
    (state: RootState) => state.user.filterUserList.numberOfUsers,
  );
  const [page, setPage] = useState<number>(1);
  // const { form } = useInputForm({
  //   userListCount: 5,
  // });

  const onChangePageFirst = useCallback(() => {
    setPage(1);
  }, []);

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
    countUser,
    filterCountUser,
    countBranch,
    onClickNextPage,
    onClickPrevPage,
    onChangeCurrentPage,
    onChangePageFirst,
  };
}

export default usePage;
