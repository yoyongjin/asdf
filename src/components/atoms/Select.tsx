import React from 'react';
import styled from 'styled-components';

import { COLORS } from 'utils/color';

const StyledSelect = styled.select<SelectProps>`
  /* Position */
  float: right;
  padding-left: ${(props) => props.paddingLeft}px;

  /* Display */
  border-width: ${(props) => props.borderWidth}px;
  border-radius: ${(props) => props.borderRadius}rem;
  height: ${(props) => props.height}rem;
  width: ${(props) => props.width}rem;

  /* Text */
  font-size: 0.87rem;

  /* Color */
  border-color: ${(props) => props.borderColor};
  color: ${(props) => props.fontColor};
  background-color: ${(props) => props.bgColor};

  /* Other */
  outline: none;
`;

const StyledOption = styled.option<StyledOptionProps>`
  /* Color */
  color: ${(props) => props.optionFontColor};
`;

function Select({
  defaultValue,
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
      {...rest}
    >
      {options?.map((option, i) => {
        return (
          <StyledOption
            key={`option-${i}`}
            value={option.id}
            selected={option.id === defaultValue}
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
  borderColor: string;
  borderRadius: number;
  borderWidth: number;
  fontColor: string;
  height: number;
  paddingLeft: number;
  width: number;
  bgColor?: string;
}

interface StyledOptionProps {
  optionFontColor: string;
}

interface SelectProps extends StyledSelectProps {
  defaultOption?: string;
  defaultValue?: number;
  name: string;
  options?: Array<any>;
  onChange?: (e: React.ChangeEvent<HTMLSelectElement>) => void;
}

Select.defaultProps = {
  borderColor: COLORS.black,
  borderRadius: 1,
  borderWidth: 1,
  fontColor: COLORS.black,
  height: 2,
  optionFontColor: COLORS.black,
  paddingLeft: 6,
  width: 10,
  bgColor: COLORS.white,
};

export default React.memo(Select);
