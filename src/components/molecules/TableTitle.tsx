import React from 'react';
import styled from 'styled-components';

import { Text } from 'components/atoms';
import { Colors } from 'utils/color';

const StyledWrapper = styled.tr`
  /* Display */
  width: 100%;
  height: 100%;
`;

const StyledTitle = styled.th<StyledProps>`
  width: ${(props) => props.width}%;
  vertical-align: middle;
`;

function TableTitle({ titleList, fontColor }: TableTitleProps) {
  return (
    <StyledWrapper>
      {titleList.map((values, i) => {
        return (
          <StyledTitle key={`styled-title-${i}`} width={values.width}>
            <Text
              fontColor={fontColor}
              fontFamily="NanumBarunGothic"
              fontSize={13}
            >
              {values.title}
            </Text>
          </StyledTitle>
        );
      })}
    </StyledWrapper>
  );
}

interface StyledProps {
  width: number;
}

interface TitleProps extends StyledProps {
  title: string;
}

interface TableTitleProps {
  titleList: Array<TitleProps>;
  fontColor: string;
}

TableTitle.defaultProps = {
  bgColor: Colors.gray4,
  fontColor: Colors.white,
};

export default TableTitle;
