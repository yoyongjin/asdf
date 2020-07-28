import React from 'react';
import styled, { css } from 'styled-components';

import { COLORS } from 'utils/color';

const StyledInput = styled.input.attrs<InputProps>((props) => ({
  type: props.type,
  value: props.value,
  placeholder: props.placeholder,
}))<InputProps>`
  width: ${(props) => props.width}rem;
  height: ${(props) => props.height}rem;
  border-width: ${(props) => props.borderWidth};
  ${(props) => {
    if (props.shape === 'ellipse') {
      return css<InputProps>`
        border-radius: ${(props) => props.borderRadius}rem;
      `;
    }
  }};
  text-align: center;
  ::-webkit-input-placeholder {
    color: ${(props) => props.phColor};
  }
`;

function Input({ ...props }: InputProps) {
  return <StyledInput {...props}></StyledInput>;
}

interface InputProps {
  readonly type: string;
  readonly value: string;
  readonly placeholder: string;
  readonly width: number;
  readonly height: number;
  readonly shape: string;
  readonly borderWidth: number | string;
  readonly borderRadius: number;
  readonly phColor: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

Input.defaultProps = {
  type: 'input',
  value: '',
  placeholder: 'Not Placeholder',
  width: 15,
  height: 1.7,
  shape: 'ellipse',
  borderWidth: 0,
  borderRadius: 1,
  phColor: COLORS.black,
};

export default Input;
