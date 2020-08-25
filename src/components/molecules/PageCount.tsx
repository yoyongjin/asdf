import React from 'react';
import styled, { css } from 'styled-components';

import { Text } from 'components/atoms';
import { COLORS } from 'utils/color';

const StyledWrapper = styled.div`
  display: flex;
  justify-content: center;
`;

const StyledCurrent = styled.div<StyledProps>`
  border: 1px solid ${COLORS.light_gray2};
  width: calc(41px - 5px);
  ${(props) => {
    if (props.textAlign === 0) {
      return css`
        text-align: left;
        padding-left: 5px;
      `;
    } else if (props.textAlign === 1) {
      return css`
        text-align: center;
      `;
    } else if (props.textAlign === 2) {
      return css`
        text-align: right;
        padding-right: 5px;
      `;
    }
  }}
`;

const StyledDivide = styled.div<StyledProps>`
  padding-left: ${(props) => props.padding || 0.2}rem;
  padding-right: ${(props) => props.padding || 0.2}rem;
`;

const StyledMax = styled.div``;

function PageCount({ curPage, maxPage, padding, textAlign }: PageCountProps) {
  return (
    <StyledWrapper>
      <StyledCurrent textAlign={textAlign}>
        <Text fontSize={0.87} fontWeight={700} fontColor={COLORS.dark_gray1}>
          {curPage}
        </Text>
      </StyledCurrent>
      <StyledDivide padding={padding}>
        <Text fontSize={0.87} fontWeight={700} fontColor={COLORS.dark_gray1}>
          /
        </Text>
      </StyledDivide>
      <StyledMax>
        <Text fontSize={0.87} fontWeight={700} fontColor={COLORS.dark_gray1}>
          {maxPage}
        </Text>
      </StyledMax>
    </StyledWrapper>
  );
}

interface StyledProps {
  padding?: number;
  textAlign?: number;
}

interface PageCountProps extends StyledProps {
  curPage: number;
  maxPage: number;
}

PageCount.defaultProps = {
  textAlign: 1,
};

export default PageCount;
