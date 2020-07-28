import React from 'react';
import styled, { css } from 'styled-components';
import { COLORS } from 'utils/color';

const StyledButton = styled.button<ButtonProps>`
  /* Display */
  width: ${(props) => props.width}rem;
  height: ${(props) => props.height}rem;
  border-width: ${(props) => props.borderWidth};
  ${(props) => {
    if (props.shape === 'ellipse') {
      return css<ButtonProps>`
        border-radius: ${(props) => props.borderRadius}rem;
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
        }
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
  readonly shape?: string;
  readonly borderWidth: number | string;
  readonly borderRadius: number;
  readonly fontColor: string;
  readonly fontSize: number;
  readonly bgColor: string;
  onClick?: () => void;
  readonly children: string;
}

Button.defaultProps = {
  width: 15,
  height: 2.3,
  borderWidth: 0,
  borderRadius: 1,
  fontColor: COLORS.white,
  fontSize: 1,
  bgColor: COLORS.black,
  children: 'Not Children',
};

export default Button;
