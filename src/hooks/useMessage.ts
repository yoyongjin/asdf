import { useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { RootState } from 'modules/reducers';
import {
  requestGetSmsCount,
  requestModifySmsCount,
} from 'modules/actions/message';

function useMessage() {
  const maxCountData = useSelector(
    (state: RootState) => state.message.max_count_data,
  );

  const dispatch = useDispatch();

  /**
   * @description 발송 수량 가져오기
   */
  const getSmsCount = useCallback(() => {
    dispatch(requestGetSmsCount());
  }, [dispatch]);

  /**
   * @description 발송 수량 수정하기
   */
  const modifySmsCount = useCallback(
    (id: number, maxCountDate: number, maxCountMonth: number) => {
      const payload = {
        branch_id: id,
        max_count_date: maxCountDate,
        max_count_mouth: maxCountMonth,
      };

      dispatch(requestModifySmsCount(payload));
    },
    [dispatch],
  );

  return {
    getSmsCount,
    maxCountData,
    modifySmsCount,
  };
}

export default useMessage;

export type TModifySmsCount = (
  id: number,
  maxCountDate: number,
  maxCountMonth: number,
) => void;
