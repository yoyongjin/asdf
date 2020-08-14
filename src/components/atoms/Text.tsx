import React from 'react';
import styled, {css} from 'styled-components';

import { COLORS } from 'utils/color';

const StyledText = styled.span<TextProps>`
  font-size: ${(props) => props.fontSize}${(props) => props.fontSize > 10 ? "px" : "rem"};
  color: ${(props) => props.fontColor};
  font-weight: ${(props) => props.fontWeight};

  ${props => {
    if(props.onClick){
      return css`
        &:hover {
          cursor: pointer;
        }
      `
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
  fontSize: number;
  fontColor: string;
  fontWeight: number | string;
  onClick?: () => void;
  children: number | string;
}

Text.defaultProps = {
  children: 'Not Children',
  fontSize: 1,
  fontColor: COLORS.black,
  fontWeight: 'normal',
};

export default Text;
