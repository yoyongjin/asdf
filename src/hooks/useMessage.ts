import { useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { RootState } from 'modules/reducers';
import {
  requestAddAutoMessage,
  requestGetAutoMessage,
  requestGetMessageCount,
  requestModifyAutoMessage,
  requestModifyMessageCount,
  requestRemoveAutoMessage,
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
   * @description 자동 문자 추가하기
   */
  const addAutoMessage = useCallback(
    (
      id: number,
      title: string,
      content: string,
      startDate: string,
      endDate: string,
      startTime: string,
      endTime: string,
      days: string,
    ) => {
      const payload = {
        branch_id: id,
        content,
        days,
        end_date: endDate,
        end_time: endTime,
        start_date: startDate,
        start_time: startTime,
        title,
      };

      dispatch(requestAddAutoMessage(payload));
    },
    [dispatch],
  );

  /**
   * @description 발송 수량 가져오기
   */
  const getSmsCount = useCallback(() => {
    dispatch(requestGetMessageCount());
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
   * @description 자동 문자 수정하기
   */
  const modifyAutoMessage = useCallback(
    (
      id: number,
      branchId: number,
      title: string,
      content: string,
      startDate: string,
      endDate: string,
      startTime: string,
      endTime: string,
      days: string,
    ) => {
      const payload = {
        id,
        branch_id: branchId,
        content,
        days,
        end_date: endDate,
        end_time: endTime,
        start_date: startDate,
        start_time: startTime,
        title,
      };

      dispatch(requestModifyAutoMessage(payload));
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
        max_count_month: maxCountMonth,
      };

      dispatch(requestModifyMessageCount(payload));
    },
    [dispatch],
  );

  /**
   * @description 자동 문자 삭제하기
   */
  const removeAutoMessage = useCallback(
    (id: number) => {
      const payload = {
        id,
      };

      dispatch(requestRemoveAutoMessage(payload));
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
    addAutoMessage,
    autoMessageData,
    getAutoMessage,
    getSmsCount,
    maxCountData,
    modifyAutoMessage,
    modifySmsCount,
    removeAutoMessage,
    setUsedAutoMessage,
  };
}

export default useMessage;

export type TAddAutoMessage = (
  id: number,
  title: string,
  content: string,
  startDate: string,
  endDate: string,
  startTime: string,
  endTime: string,
  days: string,
) => void;

export type TModifyAutoMessage = (
  id: number,
  branchId: number,
  title: string,
  content: string,
  startDate: string,
  endDate: string,
  startTime: string,
  endTime: string,
  days: string,
) => void;

export type TModifySmsCount = (
  id: number,
  maxCountDate: number,
  maxCountMonth: number,
) => void;

export type TRemoveAutoMessage = (id: number) => void;

export type TSetUsedAutoMessage = (id: number, used: string) => void;
