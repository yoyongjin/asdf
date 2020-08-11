import React from 'react';
import styled, { css } from 'styled-components';
import { COLORS } from 'utils/color';

const StyledButton = styled.button<ButtonProps>`
  /* Display */
  width: ${(props) => props.width}rem;
  height: ${(props) => props.height}rem;
  border-width: ${(props) => props.borderWidth};
  border-radius: ${(props) => props.borderRadius}rem;
  outline: none;
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
    opacity: 0.5;
  }
  &:active {
    opacity: 0.9;
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
  readonly borderWidth: number | string;
  readonly borderRadius: number;
  readonly fontColor: string;
  readonly fontSize: number;
  readonly bgColor: string;
  readonly bgImage?: string;
  onClick?: (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>,
  ) => void;
  readonly children?: string | React.ReactChild;
  readonly customStyle?: string;
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
