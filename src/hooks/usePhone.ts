import { useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { RootState } from 'modules/reducers';
import {
  requestGetPhoneInfo,
  requestGetPhones,
  requestGetPlanByTelecom,
  requestGetTelecom,
  setInitializePhoneInfo,
} from 'modules/actions/phone';

function usePhone() {
  const phoneInfo = useSelector((state: RootState) => state.phone.info);
  const plans = useSelector((state: RootState) => state.phone.plans);
  const telecoms = useSelector((state: RootState) => state.phone.telecoms);
  const phones = useSelector((state: RootState) => state.phone.phones);

  const dispatch = useDispatch();

  /**
   * @description phone info 정보 초기화하기
   */
  const onEventInitializePhoneInfo = useCallback(() => {
    dispatch(setInitializePhoneInfo());
  }, [dispatch]);

  /**
   * @description 요금제 가져오기
   * @param {string} telecom 통신사
   */
  const getPlan = useCallback(
    (telecom: string) => {
      const payload = {
        telecom,
      };

      dispatch(requestGetPlanByTelecom(payload));
    },
    [dispatch],
  );

  /**
   * @description 통신사 가져오기
   */
  const getTelecom = useCallback(() => {
    dispatch(requestGetTelecom());
  }, [dispatch]);

  /**
   * @description 폰 정보 가져오기
   * @param {string} number 전화번호
   */
  const getPhoneInfo = useCallback(
    (number: string) => {
      const payload = {
        number,
      };

      dispatch(requestGetPhoneInfo(payload));
    },
    [dispatch],
  );

  const getPhones = useCallback(
    (
      isMatch: boolean,
      page: number,
      limit: number,
      searchText: string = '',
    ) => {
      const payload = {
        is_match: isMatch,
        page,
        page_count: limit,
        search_text: searchText,
      };

      dispatch(requestGetPhones(payload));
    },
    [dispatch],
  );

  return {
    getPhoneInfo,
    getPlan,
    getTelecom,
    getPhones,
    onEventInitializePhoneInfo,
    phoneInfo,
    plans,
    telecoms,
    phones,
  };
}

export default usePhone;
