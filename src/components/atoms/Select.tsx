import React from 'react';
import styled from 'styled-components';

import { Colors } from 'utils/color';

const StyledSelect = styled.select<SelectProps>`
  /* Position */
  float: right;
  padding-left: ${(props) => props.paddingLeft}px;

  /* Display */
  border-width: ${(props) => props.borderWidth}px;
  border-radius: ${(props) => props.borderRadius}px;
  height: ${(props) => props.height}px;
  width: ${(props) => props.width}px;

  /* Text */
  font-size: ${(props) => props.fontSize}px;

  /* Color */
  border-color: ${(props) => props.borderColor || props.theme.color.main};
  color: ${(props) => props.fontColor || props.theme.color.main};
  background-color: ${(props) => props.bgColor};

  /* Other */
  outline: none;
`;

const StyledOption = styled.option<StyledOptionProps>`
  /* Color */
  color: ${(props) => props.optionFontColor};
  font-size: ${(props) => props.optionFontSize}px;
`;

function Select({
  disabled,
  defaultValue,
  isUsedId,
  name,
  options,
  onChange,
  ...rest
}: SelectProps) {
  return (
    <StyledSelect
      name={name}
      value={defaultValue}
      onChange={onChange}
      disabled={disabled}
      isUsedId={isUsedId}
      {...rest}
    >
      {options?.map((option, i) => {
        return (
          <StyledOption
            key={`option-${i}`}
            value={isUsedId ? option.id : option.data}
            {...rest}
          >
            {option.data}
          </StyledOption>
        );
      })}
    </StyledSelect>
  );
}

interface StyledSelectProps extends StyledOptionProps {
  borderColor?: string;
  borderRadius: number;
  borderWidth: number;
  fontColor?: string;
  fontSize: number;
  height: number;
  paddingLeft: number;
  width: number;
  bgColor?: string;
}

interface StyledOptionProps {
  optionFontColor: string;
  optionFontSize: number;
}

export interface IOption {
  id: number;
  data: string;
}

interface SelectProps extends StyledSelectProps {
  disabled: boolean;
  defaultValue?: number | string;
  isUsedId: boolean; // id를 key로 사용할지에 대한 여부
  name: string;
  options?: Array<IOption>;
  onChange?: (e: React.ChangeEvent<HTMLSelectElement>) => void;
}

Select.defaultProps = {
  borderRadius: 6,
  borderWidth: 1,
  disabled: false,
  fontSize: 14,
  height: 30,
  isUsedId: true,
  optionFontColor: Colors.gray10,
  optionFontSize: 14,
  paddingLeft: 6,
  width: 100,
  bgColor: Colors.white,
};

export default React.memo(Select);
