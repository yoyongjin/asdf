import { useState, useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { History } from 'history';

import { requestLogin } from 'modules/actions/auth';
import { requestGetUserInfo } from 'modules/actions/user';

function useInputForm<T>(initialForm: T) {
  const [form, setForm] = useState<T>(initialForm);

  const dispatch = useDispatch();

  const onChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm((form) => ({ ...form, [name]: value }));
  }, []);

  const onChangeSelect = useCallback(
    (
      e: React.ChangeEvent<HTMLSelectElement>,
      type = '',
      data = '',
    ) => {
      console.log(type, data);
      if (type === 'team' && data === '') {
        alert('지점명을 선택한 후 진행해주세요.');
        return;
      }
      const { name, value } = e.target;
      setForm((form) => ({ ...form, [name]: value }));
    },
    [],
  );

  const initTempValue = useCallback((name: string, value: string | number) => {
    setForm((form) => ({ ...form, [name]: value }));
  }, []);

  const initValue = useCallback((data: T) => {
    setForm(() => data);
  }, []);

  const onClickLogin = useCallback(
    (id: string, password: string, history: History) => {
      const payload = {
        id,
        password,
        history,
      };
      dispatch(requestLogin(payload));
    },
    [dispatch],
  );

  return {
    form,
    onChange,
    onClickLogin,
    initTempValue,
    initValue,
    onChangeSelect,
  };
}

interface DataType {
  branch: string;
  team: string;
  admin: string;
  name: string;
  id: string;
  password: string;
  tel: string;
  zibox: string;
}

export default useInputForm;
