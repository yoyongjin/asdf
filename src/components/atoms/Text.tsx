import React from 'react';
import styled, { css } from 'styled-components';

import { COLORS } from 'utils/color';

const StyledText = styled.span<TextProps>`
  font-family: ${(props) => props.fontFamily};
  font-weight: ${(props) => props.fontWeight};
  font-size: ${(props) => {
    if (props.fontSize > 10) {
      return `${props.fontSize}px`;
    }

    return `${props.fontSize}rem`;
  }};

  /* Color */
  color: ${(props) => props.fontColor};

  ${(props) => {
    if (props.onClick) {
      return css`
        &:hover {
          cursor: pointer;
        }
      `;
    }
  }};
`;

function Text({ onClick, children, ...props }: TextProps) {
  return (
    <StyledText onClick={onClick} {...props}>
      {children}
    </StyledText>
  );
}

interface TextProps {
  children: number | string;
  readonly fontColor: string;
  readonly fontFamily: string;
  readonly fontSize: number;
  readonly fontWeight: number | string;
  onClick?: () => void;
}

Text.defaultProps = {
  fontColor: COLORS.black,
  fontFamily: 'inherit',
  fontSize: 1,
  fontWeight: 'normal',
};

export default Text;
