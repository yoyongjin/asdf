import React from 'react';
import styled, { css } from 'styled-components';
import { darken, lighten } from 'polished';

import { COLORS } from 'utils/color';

const StyledButton = styled.button<ButtonProps>`
  /* Initialized */
  border: none;
  outline: none;

  /* Display */
  border-radius: ${(props) => props.borderRadius}rem;
  border-width: ${(props) => props.borderWidth}px;
  height: ${(props) => props.height}rem;
  width: ${(props) => props.width}rem;
  ${(props) => {
    if (props.bgImg) {
      return css<StyledButtonProps>`
        background-image: url(${(props) => props.bgImg});
        background-repeat: no-repeat;
      `;
      // background-size: ${(props) => props.width}rem
      //     ${(props) => props.height}rem;
    }
  }}

  /* Text */
  font-size: ${(props) => props.fontSize};

  /* Color */
  background-color: ${(props) => props.bgColor};
  color: ${(props) => props.fontColor};

  &:hover {
    cursor: pointer;
    ${(props) => {
      if (props.bgHoverImg) {
        return css<StyledButtonProps>`
          background-image: url(${(props) => props.bgHoverImg});
          background-repeat: no-repeat;
        `;
        // background-size: ${(props) => props.width}rem
        //     ${(props) => props.height}rem;
      } else if (props.bgImg) {
        return css`
          opacity: 0.6;
        `;
      } else {
        return css<StyledButtonProps>`
          color: ${darken(0.1, props.fontColor)};
        `;
      }
    }}
  }
  &:active {
    ${(props) => {
      if (props.bgHoverImg || props.bgImg) {
        return css`
          opacity: 0.8;
        `;
      } else {
        return css<StyledButtonProps>`
          color: ${darken(0.2, props.fontColor)};
        `;
      }
    }}
  }
  ${(props) => props.customStyle}
`;

function Button({ children, onClick, ...rest }: ButtonProps) {
  return (
    <StyledButton onClick={onClick} {...rest}>
      {children}
    </StyledButton>
  );
}

interface StyledButtonProps {
  readonly bgColor: string;
  readonly bgImg?: string;
  readonly bgHoverImg?: string;
  readonly borderRadius: number;
  readonly borderWidth?: number;
  readonly customStyle?: string;
  readonly fontColor: string;
  readonly fontSize: number;
  readonly height: number;
  readonly width: number;
}

interface ButtonProps extends StyledButtonProps {
  readonly children?: React.ReactChild;
  readonly onClick?: (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>,
  ) => void;
}

Button.defaultProps = {
  bgColor: COLORS.black,
  borderRadius: 1,
  fontColor: COLORS.white,
  fontSize: 1,
  height: 2.3,
  width: 15,
};

export default Button;
