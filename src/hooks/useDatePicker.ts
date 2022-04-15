import { useCallback, useState } from 'react';

/**
 * @description 날짜 / 시간 설정 hook
 * @param date 날짜
 */
function useDatePicker(date?: Date) {
  const [datePicker, setDatePicker] = useState(date);

  const onChangeDatePicker = useCallback((date?: Date) => {
    setDatePicker(date);
  }, []);

  return {
    datePicker,
    onChangeDatePicker,
  };
}

export type TonChangeDatePicker = (
  date: Date,
  event?: React.SyntheticEvent<any>,
) => void;

export default useDatePicker;
