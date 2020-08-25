import React from 'react';
import styled, { css } from 'styled-components';
import { darken, lighten } from 'polished';

import { COLORS } from 'utils/color';

const StyledButton = styled.button<ButtonProps>`
  /* Initialized */
  border: none;
  outline: none;

  /* Display */
  width: ${(props) => props.width}rem;
  height: ${(props) => props.height}rem;
  border-radius: ${(props) => props.borderRadius}rem;
  border-width: ${(props) => props.borderWidth}px;
  ${(props) => {
    if (props.bgImage) {
      return css<ButtonProps>`
        background-image: url(${(props) => props.bgImage});
        background-repeat: no-repeat;
        background-size: ${(props) => props.width}rem
          ${(props) => props.height}rem;
      `;
    }
  }}

  /* Text */
  font-size: ${(props) => props.fontSize};

  /* Color */
  color: ${(props) => props.fontColor};
  background-color: ${(props) => props.bgColor};

  &:hover {
    cursor: pointer;
    ${(props) => {
      if (props.bgHoverImage) {
        return css<ButtonProps>`
          background-image: url(${(props) => props.bgHoverImage});
          background-repeat: no-repeat;
          background-size: ${(props) => props.width}rem
            ${(props) => props.height}rem;
        `;
      } else if(props.bgImage) {
        return css`
          opacity: 0.6;
        `;

      } else {
        return css<ButtonProps>`
          color: ${darken(0.1, props.fontColor)};
        `;
      }
    }}
  }
  &:active {
    ${(props) => {
      if (props.bgHoverImage || props.bgImage) {
        return css`
          opacity: 0.8;
        `;
      } else {
        return css<ButtonProps>`
          color: ${darken(0.2, props.fontColor)};
        `;
      }
    }}
  }
  ${(props) => props.customStyle}
`;

function Button({ onClick, children, ...props }: ButtonProps) {
  return (
    <StyledButton onClick={onClick} {...props}>
      {children}
    </StyledButton>
  );
}

interface ButtonProps {
  readonly width: number;
  readonly height: number;
  readonly borderWidth: number;
  readonly borderRadius: number;
  readonly fontColor: string;
  readonly fontSize: number;
  readonly bgColor: string;
  readonly bgImage?: string;
  readonly bgHoverImage?: string;
  readonly children?: string | React.ReactChild;
  readonly customStyle?: string;
  onClick?: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
}

Button.defaultProps = {
  width: 15,
  height: 2.3,
  borderWidth: 0,
  borderRadius: 1,
  fontColor: COLORS.white,
  fontSize: 1,
  bgColor: COLORS.black,
};

export default Button;
