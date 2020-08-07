import React from 'react';
import styled from 'styled-components';

import { Text } from 'components/atoms';
import { COLORS } from 'utils/color';

const StyledWrapper = styled.tr`
  /* Display */
  height: 3rem;
`;

const StyledTitle = styled.th``;

function TableTitle({ titleList, fontColor }: TableTitleProps) {
  return (
    <StyledWrapper>
      {titleList.map((title, i) => {
        return (
          <StyledTitle key={`styled-title-${i}`}>
            <Text fontSize={0.81} fontColor={fontColor} fontWeight={'bold'}>
              {title}
            </Text>
          </StyledTitle>
        );
      })}
    </StyledWrapper>
  );
}

interface TableTitleProps {
  titleList: Array<string>;
  fontColor: string;
}

TableTitle.defaultProps = {
  bgColor: COLORS.dark_gray1,
  fontColor: COLORS.white,
};

export default TableTitle;
