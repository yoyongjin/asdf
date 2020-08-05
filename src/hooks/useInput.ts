import { useState, useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { History } from 'history';

import { requestLogin } from 'modules/actions/auth';

function useInput<T>(initialForm: T) {
  const [form, setForm] = useState<T>(initialForm);

  const dispatch = useDispatch();

  const onChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const { name, value } = e.target;
      // setForm((form: React.SetStateAction<T>) => ({...form, [name]: value}));
      setForm({ ...form, [name]: value });
    },
    [form],
  );

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
  };
}

export default useInput;
