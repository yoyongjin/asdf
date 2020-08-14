import React from 'react';
import styled from 'styled-components';

import { COLORS } from 'utils/color';

const StyledSelect = styled.select<SelectProps>`
  /* Display */
  width: ${(props) => props.width}${(props) => (props.width > 10 ? 'px' : 'rem')};
  height: ${(props) => props.height};
  border-radius: ${(props) => props.borderRadius}rem;
  border-color: ${(props) => props.borderColor};
  float: right;
  padding-left: 1rem;

  /* Color */
  border-color: ${(props) => props.borderColor};
  color: ${(props) => props.fontColor};

  /* Other */
  outline: none;
`;

const StyledOption = styled.option<OptionProps>`
  /* Color */
  color: ${(props) => props.optionFontColor};
`;

function Select({
  options,
  defaultValue,
  // defaultOption,
  name,
  // selected,
  onChange,
  ...rest
}: SelectProps) {
  return (
    <StyledSelect
      name={name}
      onChange={onChange}
      value={defaultValue}
      {...rest}
    >
      {/* <StyledOption value={defaultValue} {...rest}>
        {defaultOption}
      </StyledOption> */}
      {options?.map((option, i) => {
        return (
          <StyledOption
            key={`option-${i}`}
            // selected={Number(selected) === option.id}
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

interface SelectProps extends OptionProps {
  options?: Array<any>;
  fontColor: string;
  width: number;
  height: number;
  borderColor: string;
  borderRadius: number;
  onChange?: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  name: string;
  defaultOption?: string;
  defaultValue?: number;
  // selected?: string;
}

interface OptionProps {
  optionFontColor: string;
}

Select.defaultProps = {
  width: 10,
  height: 2,
  fontColor: COLORS.black,
  optionFontColor: COLORS.black,
  borderColor: COLORS.black,
  borderRadius: 1,
};

export default Select;
