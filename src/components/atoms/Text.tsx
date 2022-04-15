import React from 'react';
import styled, { css } from 'styled-components';
import { darken, lighten } from 'polished';

const StyledText = styled.span<TextProps>`
  /* Text */
  font-family: ${(props) => props.fontFamily};
  font-weight: ${(props) => props.fontWeight};
  font-size: ${(props) => props.fontSize}px;
  letter-spacing: ${(props) => props.letterSpacing}px;
  line-height: ${(props) => props.lineHeight};

  /* Color */
  color: ${(props) => props.fontColor || props.theme.color.main};

  ${(props) => {
    if (props.onClick) {
      return css<StyledTextProps>`
        cursor: pointer;
        &:hover {
          color: ${lighten(0.2, props.fontColor!)};
        }
        &:active {
          color: ${darken(0.2, props.fontColor!)};
        }
      `;
    }

    if (props.minWidth) {
      return css<StyledTextProps>`
        min-width: ${(props) => props.minWidth}px;
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
  readonly fontColor?: string;
  readonly fontFamily: string;
  readonly fontSize: number;
  readonly fontWeight: number | string;
  readonly letterSpacing: number | string;
  readonly lineHeight?: number;
  readonly minWidth?: number;
}

interface TextProps extends StyledTextProps {
  children: number | string | React.ReactChild;
  onClick?: () => void;
}

Text.defaultProps = {
  fontFamily: 'inherit',
  fontSize: 14,
  fontWeight: 'normal',
  letterSpacing: 'normal',
};

export default Text;
