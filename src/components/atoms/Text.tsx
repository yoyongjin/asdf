import React from 'react';
import styled from 'styled-components';

import { COLORS } from 'utils/color';

const StyledText = styled.span<TextProps>`
  font-size: ${(props) => props.fontSize}rem;
  color: ${(props) => props.fontColor};
  font-weight: ${(props) => props.fontWeight};
`;

function Text({ children, ...props }: TextProps) {
  return <StyledText {...props}>{children}</StyledText>;
}

interface TextProps {
  fontSize: number;
  fontColor: string;
  fontWeight: number | string;
  children: number | string;
}

Text.defaultProps = {
  children: 'Not Children',
  fontSize: 1,
  fontColor: COLORS.black,
  fontWeight: 'normal',
};

export default Text;
