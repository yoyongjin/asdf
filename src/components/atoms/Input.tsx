import React from 'react';
import styled, { css } from 'styled-components';

import { COLORS } from 'utils/color';

const StyledInput = styled.input<InputProps>`
  /* Display */
  width: ${(props) => props.width}rem;
  height: ${(props) => props.height}${(props) => (props.height > 10 ? 'px' : 'rem')};
  border-width: ${(props) => props.borderWidth}rem;
  border-radius: ${(props) => props.borderRadius}rem;
  font-size: ${props => props.fontSize}rem;
  font-weight: 600;
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
  outline: none;
  ::-webkit-input-placeholder {
    color: ${(props) => props.phColor};
  }
  :focus {
    outline: none !important;
    border: 2px solid ${COLORS.green};
    box-shadow: 0 0 3px ${COLORS.green};
  }
  ::placeholder {
    /* Display */
    font-weight: 500;
    color: ${COLORS.dark_gray1};
    /* text-align: left; */
  }
  ::-ms-clear,
  ::-ms-reveal {
    display: none;
    width: 0;
    height: 0;
  }
  ::-webkit-search-decoration,
  ::-webkit-search-cancel-button,
  ::-webkit-search-results-button,
  ::-webkit-search-results-decoration {
    display: none;
  }

  ${(props) => props.customStyle}
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
  readonly innerRef?: (instance: HTMLInputElement) => void;
  readonly type: string;
  readonly name?: string;
  readonly value: string;
  readonly placeholder: string;
  readonly width: number;
  readonly height: number;
  readonly borderWidth: number | string;
  readonly borderRadius: number;
  readonly borderColor: string;
  readonly textAlign: number;
  readonly phColor: string;
  readonly customStyle?: string;
  readonly image?: string;
  readonly fontSize?: number;
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
  textAlign: 2,
  phColor: COLORS.black,
  fontSize: 1,
};

export default Input;
