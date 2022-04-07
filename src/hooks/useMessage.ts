import { useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { RootState } from 'modules/reducers';
import {
  requestGetAutoMessage,
  requestGetSmsCount,
  requestModifySmsCount,
  requestSetUsedAutoMessage,
} from 'modules/actions/message';

function useMessage() {
  const maxCountData = useSelector(
    (state: RootState) => state.message.max_count_data,
  );
  const autoMessageData = useSelector(
    (state: RootState) => state.message.autoMessageData,
  );

  const dispatch = useDispatch();

  /**
   * @description 발송 수량 가져오기
   */
  const getSmsCount = useCallback(() => {
    dispatch(requestGetSmsCount());
  }, [dispatch]);

  /**
   * @description 자동 문자 가져오기
   */
  const getAutoMessage = useCallback(
    (id: number, page: number, count: number) => {
      const payload = {
        id,
        page,
        count,
      };

      dispatch(requestGetAutoMessage(payload));
    },
    [dispatch],
  );

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

  /**
   * @description 자동 문자 사용 유무 설정하기
   */
  const setUsedAutoMessage = useCallback(
    (id: number, used: string) => {
      const payload = {
        id,
        use_yn: used,
      };

      dispatch(requestSetUsedAutoMessage(payload));
    },
    [dispatch],
  );

  return {
    autoMessageData,
    getAutoMessage,
    getSmsCount,
    maxCountData,
    modifySmsCount,
    setUsedAutoMessage,
  };
}

export default useMessage;

export type TModifySmsCount = (
  id: number,
  maxCountDate: number,
  maxCountMonth: number,
) => void;

export type TSetUsedAutoMessage = (id: number, used: string) => void;
