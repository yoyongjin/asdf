import React from 'react';
import { MultiSelect as MSelect } from 'react-multi-select-component';
import styled from 'styled-components';

const StyledMultiSelect = styled(MSelect)``;

function MultiSelect({
  disabled,
  isLoading,
  isSelectAll,
  labelledBy,
  onChange,
  options,
  value,
}: IMultiSelect) {
  return (
    <StyledMultiSelect
      disabled={disabled}
      isLoading={isLoading}
      hasSelectAll={isSelectAll}
      labelledBy={labelledBy}
      onChange={onChange}
      options={options}
      value={value}
    />
  );
}

interface IOption {
  disabled?: boolean;
  label: string;
  value: any;
}

interface IMultiSelect {
  disabled?: boolean; // 아예 선택 못하게 막기
  isLoading?: boolean; // 로딩 UI 여부
  isSelectAll: boolean; // 전체 선택 가능 여부
  labelledBy: string;
  onChange?: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  options: Array<IOption>; // 데이터
  value: Array<IOption>; // 기존 선택된 값
}

MultiSelect.defaultProps = {
  isSelectAll: true,
};

export default MultiSelect;
