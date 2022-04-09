import { useCallback, useState } from 'react';

import { IOption } from 'components/atoms/MultiSelect';

function useMultiSelect() {
  const [selectedOption, setSelectedOption] = useState<Array<IOption>>([]);

  const handleSelectedOption = useCallback((value: Array<IOption>) => {
    setSelectedOption(value);
  }, []);

  return {
    handleSelectedOption,
    selectedOption,
  };
}

export type THandleSelectedOption = (value: Array<IOption>) => void;

export default useMultiSelect;
