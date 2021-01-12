import React from 'react';
import styled, { css } from 'styled-components';
import { darken, lighten } from 'polished';

import deleteImage from 'images/bt-del.png';
import { COLORS } from 'utils/color';

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

  /* Color */
  border-color: ${(props) => props.borderColor};
  color: ${(props) => props.fontColor};

  /* Other */
  :focus {
    box-shadow: 0 0 10px ${(props) => darken(0.1, props.borderColor)};
    outline: none !important;
  }
  ::placeholder {
    /* Display */
    font-weight: 800;
    color: ${(props) => props.phColor};
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
  disabled,
  innerRef,
  name,
  placeholder,
  type,
  value,
  step,
  min,
  max,
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
      disabled={disabled}
      step={step}
      min={min}
      max={max}
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
  readonly name?: string;
  readonly placeholder?: string;
  readonly type: string;
  readonly value: string;
  readonly step?: number;
  readonly min?: number;
  readonly max?: number;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onKeyDown?: (e: React.KeyboardEvent<HTMLInputElement>) => void;
  onKeyUp?: (e: React.KeyboardEvent<HTMLInputElement>) => void;
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

export default React.memo(Input);
