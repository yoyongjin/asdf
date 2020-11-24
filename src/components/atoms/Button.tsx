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
    if (props.image) {
      return css<StyledButtonProps>`
        background-image: url(${(props) => props.image});
        background-repeat: no-repeat;
        background-size: ${(props) => props.width}rem
          ${(props) => props.height}rem;
      `;
    }
  }}

  /* Color */
  background-color: ${(props) => props.bgColor};

  &:hover {
    cursor: pointer;
    ${(props) => {
      if (props.hoverImg) {
        return css<StyledButtonProps>`
          background-image: url(${(props) => props.hoverImg});
          background-repeat: no-repeat;
          background-size: ${(props) => props.width}rem
            ${(props) => props.height}rem;
        `;
      } else {
        return css`
          opacity: 0.8;
        `;
      }
    }}
  }
  &:active {
    opacity: 0.9;
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
  readonly bgColor?: string;
  readonly borderRadius: number;
  readonly borderWidth?: number;
  readonly customStyle?: string;
  readonly fontColor: string;
  readonly fontSize: number;
  readonly height: number;
  readonly hoverImg?: string;
  readonly image?: string;
  readonly width: number;
}

interface ButtonProps extends StyledButtonProps {
  readonly children?: React.ReactChild;
  readonly onClick?: (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>,
  ) => void;
}

Button.defaultProps = {
  bgColor: COLORS.white,
  borderRadius: 1,
  fontColor: COLORS.white,
  fontSize: 1,
  height: 2.3,
  width: 15,
};

export default React.memo(Button);
