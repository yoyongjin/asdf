import React from 'react';
import styled from 'styled-components';

import { COLORS } from 'utils/color';

const StyledWrapper = styled.tr`
  /* Display */
  height: 3rem;
`;

const StyledTitle = styled.th<StyledProps>`
  /* Color */
  color: ${(props) => props.fontColor};
`;

function TableTitle({ titleList, fontColor }: TableTitleProps) {
  return (
    <StyledWrapper>
      {titleList.map((title, i) => {
        return (
          <StyledTitle key={`styled-title-${i}`} fontColor={fontColor}>
            {title}
          </StyledTitle>
        );
      })}
    </StyledWrapper>
  );
}

interface StyledProps {
  fontColor?: string;
}

interface TableTitleProps extends StyledProps {
  titleList: Array<string>;
}

TableTitle.defaultProps = {
  bgColor: COLORS.dark_gray1,
  fontColor: COLORS.white,
};

export default TableTitle;
