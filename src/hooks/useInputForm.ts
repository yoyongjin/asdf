import { produce } from 'immer';
import { useState, useCallback } from 'react';

function useInputForm<T>(initialForm: T) {
  const [form, setForm] = useState<T>(initialForm);

  /**
   * @description 체크박스 onchange 이벤트
   */
  const onChangeCheckBox = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const { name, checked } = e.target;

      setForm((form) => {
        return produce(form, (draft) => {
          (draft as any)[name] = checked;
        });
      });
    },
    [],
  );

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

  const onChangeTextArea = useCallback(
    (e: React.ChangeEvent<HTMLTextAreaElement>) => {
      const { name, value } = e.target;

      setForm((form) => {
        return produce(form, (draft) => {
          (draft as any)[name] = value;
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
    onChangeCheckBox,
    onChangeInput,
    setSpecificValue,
    setInitializedForm,
    onChangeTextArea,
    onChangeSelect,
  };
}

export type SetSpecificValue = (name: string, value: string | number) => void;

export type TonChangeCheckBox = (
  e: React.ChangeEvent<HTMLInputElement>,
) => void;

export default useInputForm;
