import React from 'react';
import styled, { css } from 'styled-components';
import { darken, lighten } from 'polished';

import deleteImage from 'images/bt-del.png';
import { COLORS } from 'utils/color';

const StyledInput = styled.input<InputProps>`
  /* Initialized */
  border: none;
  outline: none;

  /* Position */
  padding-left: ${(props) => {
    if (props.textAlign === 1) {
      if (props.image) {
        return 30;
      } else {
        return 22;
      }
    } else {
      return 0;
    }
  }}px;
  padding-right: ${(props) => {
    if (props.textAlign === 3) {
      return 22;
    } else {
      return 0;
    }
  }}px;

  /* Display */
  width: ${(props) => props.width}rem;
  height: ${(props) => props.height}rem;
  border-radius: ${(props) => props.borderRadius}px;
  border-style: ${(props) => props.borderStyle};
  border-width: ${(props) => props.borderWidth}px;
  font-size: ${(props) => props.fontSize}rem;
  font-weight: ${(props) => props.fontWeight};
  text-align: ${(props) => {
    if (props.textAlign === 1) {
      return 'left';
    } else if (props.textAlign === 2) {
      return 'center';
    } else if (props.textAlign === 3) {
      return 'right';
    }
  }};
  ${(props) => {
    if (props.image) {
      return css`
        background-image: url(${props.image});
        background-position: 5%;
        background-repeat: no-repeat;
      `;
    }
  }}

  /* Color */
  color: ${(props) => props.fontColor};
  border-color: ${(props) => props.borderColor};

  /* Other */
  :focus {
    outline: none !important;
    box-shadow: 0 0 10px ${(props) => darken(0.1, props.borderColor)};
  }
  ::placeholder {
    /* Display */
    font-weight: 800;
    color: ${(props) => props.fontColor};
    font-size: 0.87rem;
  }

  ::-webkit-search-cancel-button {
    -webkit-appearance: none;
    width: 20px;
    height: 20px;
    background-image: url(${deleteImage});
    background-position: 5%;
    background-repeat: no-repeat;
    &:hover {
      opacity: 0.7;
    }
    &:active {
      opacity: 0.9;
    }
  }

  ${(props) => props.customStyle};
`;

function Input({
  innerRef,
  type,
  name,
  value,
  placeholder,
  disabled,
  onChange,
  onKeyDown,
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
      onKeyDown={onKeyDown}
      disabled={disabled}
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
  readonly fontColor: string;
  readonly fontFamily: string;
  readonly fontSize: number;
  readonly fontWeight: number | string;
  readonly phColor?: string;
  readonly textAlign: number;
  readonly image?: string;
  readonly borderStyle: string;
  readonly customStyle?: string;
  readonly disabled: boolean;
  readonly innerRef?:
    | ((instance: HTMLInputElement) => void)
    | React.MutableRefObject<HTMLInputElement>
    | null;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onKeyUp?: (e: React.KeyboardEvent<HTMLInputElement>) => void;
  onKeyDown?: (e: React.KeyboardEvent<HTMLInputElement>) => void;
}

Input.defaultProps = {
  type: 'text',
  value: '',
  width: 15,
  height: 2,
  borderColor: COLORS.light_gray3,
  borderRadius: 16,
  borderStyle: 'solid',
  borderWidth: 1,
  fontSize: 1,
  fontWeight: 'normal',
  fontFamily: 'inherit',
  textAlign: 2,
  fontColor: COLORS.dark_gray1,
  disabled: false,
};

export default Input;
