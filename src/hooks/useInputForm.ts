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
    (e: React.ChangeEvent<HTMLSelectElement>, data?: number) => {
      if (data === -1) {
        alert('지점명을 선택한 후 진행해주세요.');
        return;
      }
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

  const initValue = useCallback((data: T) => {
    setForm(() => data);
  }, []);

  return {
    form,
    onChangeInput,
    setKeyValue,
    initValue,
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
