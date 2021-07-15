import React from 'react';
import styled, { css } from 'styled-components';
import { darken, lighten } from 'polished';

import deleteImage from 'images/bt-del.png';
import { Colors } from 'utils/color';

const StyledInput = styled.input<StyledInputProps>`
  /* Initialized */
  border: none;
  outline: none;

  /* Position */
  padding-left: ${(props) => {
    if (props.textAlign === 1) {
      if (props.logoImg) {
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
  border-radius: ${(props) => props.borderRadius}px;
  border-style: ${(props) => props.borderStyle};
  border-width: ${(props) => props.borderWidth}px;
  height: ${(props) => props.height}rem;
  width: ${(props) => props.width}rem;
  ${(props) => {
    if (props.logoImg) {
      return css`
        background-image: url(${props.logoImg});
        background-position: 5%;
        background-repeat: no-repeat;
      `;
    }
  }}

  /* Text */
  font-size: ${(props) => props.fontSize}px;
  font-weight: ${(props) => props.fontWeight};
  font-family: ${(props) => props.fontFamily};
  text-align: ${(props) => {
    if (props.textAlign === 1) {
      return 'left';
    } else if (props.textAlign === 2) {
      return 'center';
    } else if (props.textAlign === 3) {
      return 'right';
    }
  }};
  font-stretch: normal;
  letter-spacing: normal;
  box-sizing: border-box;

  /* Color */
  border-color: ${(props) => props.borderColor};
  color: ${(props) => props.fontColor};

  /* Other */
  :focus {
    box-shadow: 0 0 5px ${(props) => darken(0.1, props.borderColor)};
    outline: none !important;
  }
  ::placeholder {
    /* Display */
    color: ${(props) => props.phColor};
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
  disabled,
  innerRef,
  name,
  placeholder,
  type,
  maxLength,
  value,
  onChange,
  onKeyDown,
  onKeyUp,
  ...rest
}: InputProps) {
  return (
    <StyledInput
      disabled={disabled}
      maxLength={maxLength === 0 ? 524288 : maxLength}
      ref={innerRef}
      type={type}
      name={name}
      value={value}
      placeholder={placeholder}
      onChange={onChange}
      onKeyDown={onKeyDown}
      onKeyUp={onKeyUp}
      {...rest}
    ></StyledInput>
  );
}

interface StyledInputProps {
  readonly borderColor: string;
  readonly borderRadius: number;
  readonly borderStyle: string;
  readonly borderWidth: number;
  readonly customStyle?: string;
  readonly fontColor: string;
  readonly fontFamily: string;
  readonly fontSize: number;
  readonly fontWeight: number | string;
  readonly height: number;
  readonly logoImg?: string;
  readonly phColor?: string;
  readonly textAlign: number;
  readonly width: number;
}

interface InputProps extends StyledInputProps {
  readonly disabled: boolean;
  readonly innerRef?:
    | ((instance: HTMLInputElement) => void)
    | React.MutableRefObject<HTMLInputElement>
    | null;
  readonly maxLength: number;
  readonly name?: string;
  readonly placeholder?: string;
  readonly type: string;
  readonly value: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onKeyDown?: (e: React.KeyboardEvent<HTMLInputElement>) => void;
  onKeyUp?: (e: React.KeyboardEvent<HTMLInputElement>) => void;
}

Input.defaultProps = {
  type: 'text',
  value: '',
  width: 20,
  height: 15,
  borderColor: Colors.gray3,
  borderRadius: 16,
  borderStyle: 'solid',
  borderWidth: 1,
  fontSize: 10,
  fontWeight: 'normal',
  fontFamily: 'inherit',
  textAlign: 2,
  fontColor: Colors.gray4,
  disabled: false,
  maxLength: 524288,
};

export default React.memo(Input);
