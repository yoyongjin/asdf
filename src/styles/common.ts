import styled from 'styled-components';

export const StyledCommonBothWhiteSpace = styled.span<StyledCommonBothWhiteSpaceProps>`
  padding-left: ${(props) => props.left ?? props.pixel}px;
  padding-right: ${(props) => props.right ?? props.pixel}px;
`;

interface StyledCommonBothWhiteSpaceProps {
  left?: number;
  right?: number;
  pixel?: number;
}
