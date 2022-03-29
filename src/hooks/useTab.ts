import { useCallback, useState } from 'react';

/**
 * @description Tab Index 변경 hook
 */
function useTab() {
  const [selectedTabIndex, setSelectedTabIndex] = useState(0);

  const onChangeSelectedTabIndex = useCallback((index: number) => {
    setSelectedTabIndex(index);
  }, []);

  return {
    onChangeSelectedTabIndex,
    selectedTabIndex,
  };
}

export type TonChangeSelectedTabIndex = (index: number) => void;

export default useTab;
