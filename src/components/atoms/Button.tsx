import React from 'react';
import styled, { css } from 'styled-components';

import { Colors } from 'utils/color';

const StyledButton = styled.button<ButtonProps>`
  /* Initialized */
  border: none;
  outline: none;

  /* Display */
  border-color: ${(props) => props.borderColor};
  border-radius: ${(props) => props.borderRadius}px;
  border-style: ${(props) => props.borderStyle};
  border-width: ${(props) => props.borderWidth}px;
  height: ${(props) => props.height}rem;
  width: ${(props) => props.width}rem;
  ${(props) => {
    if (props.image) {
      return css<StyledButtonProps>`
        background-image: url(${(props) => props.image});
        background-repeat: no-repeat;
        background-size: ${(props) => props.imageWidth}px
          ${(props) => props.imageHeight}px;
      `;
    }
  }}

  /* Color */
  background-color: ${(props) => props.bgColor || props.theme.color.button};

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
  readonly borderColor?: string;
  readonly borderRadius: number;
  readonly borderStyle?: string;
  readonly borderWidth?: number;
  readonly customStyle?: string;
  readonly fontColor: string;
  readonly fontSize: number;
  readonly height: number;
  readonly hoverImg?: string;
  readonly image?: string;
  readonly width: number;
  readonly imageWidth?: number;
  readonly imageHeight?: number;
}

interface ButtonProps extends StyledButtonProps {
  readonly children?: React.ReactChild;
  readonly disabled: boolean;
  readonly onClick?: (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>,
  ) => void;
}

Button.defaultProps = {
  borderRadius: 16,
  borderStyle: 'none',
  disabled: false,
  fontColor: Colors.white,
  fontSize: 1,
  height: 2.3,
  width: 15,
};

export default React.memo(Button);
