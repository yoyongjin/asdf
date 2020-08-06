import React from 'react';
import styled from 'styled-components';

import { COLORS } from 'utils/color';

const StyledInput = styled.input<InputProps>`
  width: ${(props) => props.width}rem;
  height: ${(props) => props.height}rem;
  border-width: ${(props) => props.borderWidth}rem;
  border-radius: ${(props) => props.borderRadius}rem;
  border-color: ${(props) => props.borderColor};
  text-align: center;
  outline: none;
  ::-webkit-input-placeholder {
    color: ${(props) => props.phColor};
  }
`;

function Input({
  innerRef,
  type,
  name,
  value,
  placeholder,
  ...rest
}: InputProps) {
  return (
    <StyledInput
      ref={innerRef}
      type={type}
      name={name}
      value={value}
      placeholder={placeholder}
      {...rest}
    ></StyledInput>
  );
}

interface InputProps {
  readonly innerRef?: React.MutableRefObject<HTMLInputElement>;
  readonly type: string;
  readonly name?: string;
  readonly value: string;
  readonly placeholder: string;
  readonly width: number;
  readonly height: number;
  readonly borderWidth: number | string;
  readonly borderRadius: number;
  readonly borderColor: string;
  readonly phColor: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onKeyUp?: (e: React.KeyboardEvent<HTMLInputElement>) => void;
}

Input.defaultProps = {
  type: 'input',
  value: '',
  placeholder: 'Not Placeholder',
  width: 15,
  height: 1.7,
  borderWidth: 0,
  borderRadius: 1,
  borderColor: COLORS.light_gray3,
  phColor: COLORS.black,
};

export default Input;
