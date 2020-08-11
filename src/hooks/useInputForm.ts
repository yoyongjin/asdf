import { useState, useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { History } from 'history';

import { requestLogin } from 'modules/actions/auth';

function useInputForm<T>(initialForm: T) {
  const [form, setForm] = useState<T>(initialForm);

  const dispatch = useDispatch();

  const onChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm((form) => ({ ...form, [name]: value }));
  }, []);

  const onChangeSelect = useCallback(
    (e: React.ChangeEvent<HTMLSelectElement>) => {
      const { name, value } = e.target;
      setForm((form) => ({ ...form, [name]: value }));
    },
    [],
  );

  const initTempValue = useCallback((name: string) => {
    setForm((form) => ({ ...form, [name]: '' }));
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
