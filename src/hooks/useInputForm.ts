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

  const setInitializedForm = useCallback((data: T) => {
    setForm(() => data);
  }, []);

  const setSpecificValue = useCallback(
    (name: string, value: string | number) => {
      setForm((form) => {
        return produce(form, (draft) => {
          (draft as any)[name] = value;
        });
      });
    },
    [],
  );

  return {
    form,
    onChangeInput,
    setSpecificValue,
    setInitializedForm,
    onChangeSelect,
  };
}

export type SetSpecificValue = (name: string, value: string | number) => void;

export default useInputForm;
