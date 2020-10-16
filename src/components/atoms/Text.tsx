import React from 'react';
import styled, { css } from 'styled-components';
import { darken, lighten } from 'polished';

import { COLORS } from 'utils/color';

const StyledText = styled.span<TextProps>`
  /* Text */
  font-family: ${(props) => props.fontFamily};
  font-weight: ${(props) => props.fontWeight};
  font-size: ${(props) => props.fontSize}rem;
  line-height: ${(props) => props.lineHeight};

  /* Color */
  color: ${(props) => props.fontColor};

  ${(props) => {
    if (props.onClick) {
      return css<StyledTextProps>`
        cursor: pointer;
        &:hover {
          color: ${lighten(0.2, props.fontColor)};
        }
        &:active {
          color: ${darken(0.2, props.fontColor)};
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

interface StyledTextProps {
  readonly fontColor: string;
  readonly fontFamily: string;
  readonly fontSize: number;
  readonly fontWeight: number | string;
  readonly lineHeight?: number;
}

interface TextProps extends StyledTextProps {
  children: number | string | React.ReactChild;
  onClick?: () => void;
}

Text.defaultProps = {
  fontColor: COLORS.black,
  fontFamily: 'inherit',
  fontSize: 1,
  fontWeight: 'normal',
};

export default Text;
