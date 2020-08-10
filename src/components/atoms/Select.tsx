import React from 'react';
import styled from 'styled-components';

import { COLORS } from 'utils/color';

const StyledSelect = styled.select<SelectProps>`
/* Display */
  width: ${(props) => props.width}${(props) => props.width > 10 ? "px" : "rem"};
  border-radius: ${props => props.borderRadius}rem;
  float: right;
  /* Color */
  border-color: ${(props) => props.borderColor};
  color: ${(props) => props.fontColor};
`;

const StyledOption = styled.option<OptionProps>`
  /* Color */
  color: ${(props) => props.fontColor};
`;

function Select({ options, ...rest }: SelectProps) {
  return (
    <StyledSelect {...rest}>
      {options?.map((option, i) => {
        return (
          <StyledOption key={`option-${i}`} {...rest}>
            {option}
          </StyledOption>
        );
      })}
    </StyledSelect>
  );
}

interface SelectProps extends OptionProps {
  options?: string[];
  width: number;
  borderColor: string;
  borderRadius: number;
}

interface OptionProps {
  fontColor: string;
}

Select.defaultProps = {
  width: 10,
  fontColor: COLORS.black,
  borderColor: COLORS.black,
  borderRadius: 1,
};

export default Select;
