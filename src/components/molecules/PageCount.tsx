import React from 'react';
import styled from 'styled-components';

import { Text } from 'components/atoms';
import { COLORS } from 'utils/color';

const StyledWrapper = styled.div`
  display: flex;
  justify-content: center;
`;

const StyledCurrent = styled.div`
  border: 1px solid ${COLORS.light_gray2};
  padding-left: 1rem;
  padding-right: 1rem;
`;

const StyledDivide = styled.div`
  padding-left: 1rem;
  padding-right: 1rem;
`;

const StyledMax = styled.div``;

function PageCount({ curPage, maxPage }: PageCountProps) {
  return (
    <StyledWrapper>
      <StyledCurrent>
        <Text fontSize={1.3} fontColor={COLORS.dark_gray1}>
          {curPage}
        </Text>
      </StyledCurrent>
      <StyledDivide>
        <Text fontSize={1.3} fontColor={COLORS.dark_gray1}>
          /
        </Text>
      </StyledDivide>
      <StyledMax>
        <Text fontSize={1.3} fontColor={COLORS.dark_gray1}>
          {maxPage}
        </Text>
      </StyledMax>
    </StyledWrapper>
  );
}

interface PageCountProps {
  curPage: number;
  maxPage: number;
}

PageCount.defaultProps = {};

export default PageCount;
