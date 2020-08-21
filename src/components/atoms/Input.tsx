import React from 'react';
import styled, { css } from 'styled-components';
import { darken, lighten } from 'polished';

import { COLORS } from 'utils/color';

const StyledInput = styled.input<InputProps>`
  /* Initialized */
  border: none;
  outline: none;

  /* Display */
  width: ${(props) => props.width}rem;
  height: ${(props) => {
    if (props.height > 10) {
      return `${props.height}px`;
    }

    return `${props.height}rem`;
  }};
  border-style: ${(props) => props.borderStyle};
  border-width: ${(props) => props.borderWidth}px;
  border-radius: ${(props) => props.borderRadius}rem;
  font-size: ${(props) => props.fontSize}rem;
  font-weight: ${(props) => props.fontWeight}rem;
  text-align: ${(props) => {
    if (props.textAlign === 1) {
      return 'left';
    } else if (props.textAlign === 2) {
      return 'center';
    } else if (props.textAlign === 3) {
      return 'right';
    }
  }};
  padding-left: ${(props) => {
    if (props.textAlign === 1) {
      return '1.5rem';
    } else {
      return '';
    }
  }};
  padding-right: ${(props) => {
    if (props.textAlign === 3) {
      return '1.25rem';
    } else {
      return '';
    }
  }};

  /* Color */
  color: ${COLORS.dark_gray1};
  border-color: ${(props) => props.borderColor};

  ${(props) => {
    if (props.image) {
      return css`
        background-image: url(${props.image});
        background-position: 5%;
        background-repeat: no-repeat;
      `;
    }
  }}

  /* Other */
  :focus {
    outline: none !important;
    box-shadow: 0 0 10px ${(props) => darken(0.1, props.borderColor)};
  }
  ::placeholder {
    /* Display */
    font-weight: 500;
    color: ${(props) => props.phColor};
  }
  ::-webkit-search-decoration,
  ::-webkit-search-cancel-button,
  ::-webkit-search-results-button,
  ::-webkit-search-results-decoration {
    display: none;
  }

  ${(props) => props.customStyle};
`;

function Input({
  innerRef,
  type,
  name,
  value,
  placeholder,
  onChange,
  onKeyUp,
  ...rest
}: InputProps) {
  return (
    <StyledInput
      ref={innerRef}
      type={type}
      name={name}
      value={value}
      placeholder={placeholder}
      onChange={onChange}
      onKeyUp={onKeyUp}
      {...rest}
    ></StyledInput>
  );
}

interface InputProps {
  readonly type: string;
  readonly value: string;
  readonly name?: string;
  readonly placeholder?: string;
  readonly width: number;
  readonly height: number;
  readonly borderColor: string;
  readonly borderRadius: number;
  readonly borderWidth: number;
  readonly fontSize: number;
  readonly fontWeight: number | string;
  readonly phColor?: string;
  readonly textAlign: number;
  readonly image?: string;
  readonly borderStyle: string;
  readonly customStyle?: string;
  readonly innerRef?: ((instance: HTMLInputElement) => void) | React.MutableRefObject<HTMLInputElement>;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onKeyUp?: (e: React.KeyboardEvent<HTMLInputElement>) => void;
}

Input.defaultProps = {
  type: 'text',
  value: '',
  width: 15,
  height: 2,
  borderColor: COLORS.light_gray3,
  borderRadius: 1,
  borderStyle: 'solid',
  borderWidth: 1,
  fontSize: 1,
  fontWeight: 'normal',
  textAlign: 2,
};

export default Input;
