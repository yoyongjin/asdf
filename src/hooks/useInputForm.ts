import { produce } from 'immer';
import { useState, useCallback } from 'react';

function useInputForm<T>(initialForm: T) {
  const [form, setForm] = useState<T>(initialForm);
  const onChangeInput = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const { name, value } = e.target;

      setForm((form) => {
        return produce(form, (draft) => {
          (draft as any)[name] = value;
        });
      });
    },
    [],
  );

  const onChangeSelect = useCallback(
    (e: React.ChangeEvent<HTMLSelectElement>) => {
      const { name, value } = e.target;

      setForm((form) => {
        return produce(form, (draft) => {
          (draft as any)[name] = Number(value);
        });
      });
    },
    [],
  );

  const setKeyValue = useCallback((name: string, value: string | number) => {
    setForm((form) => {
      return produce(form, (draft) => {
        (draft as any)[name] = value;
      });
    });
  }, []);

  const setInitializedForm = useCallback((data: T) => {
    setForm(() => data);
  }, []);

  return {
    form,
    onChangeInput,
    setKeyValue,
    setInitializedForm,
    onChangeSelect,
  };
}

interface DataType {
  userListCount: string;
  branch: string;
  team: string;
  admin: string;
  name: string;
  id: string;
  password: string;
  tel: string;
  zibox: string;
  volum: number;
}

export default useInputForm;
