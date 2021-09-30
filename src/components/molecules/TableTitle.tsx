import React from 'react';
import styled from 'styled-components';

import { Text } from 'components/atoms';
import { Colors } from 'utils/color';
import constants, { ZIBOX_TRANSPORT, ZIBOX_VERSION } from 'utils/constants';

const StyledWrapper = styled.tr`
  /* Display */
  width: 100%;
  height: 100%;
`;

const StyledTitle = styled.th<StyledProps>`
  width: ${(props) => props.width}%;
  vertical-align: middle;
`;

function TableTitle({ titles, fontColor, fontSize }: TableTitleProps) {
  return (
    <StyledWrapper>
      {titles.map((titleData, i) => {
        if (constants.TRANSPORT === ZIBOX_TRANSPORT.OCX) {
          if (constants.ZIBOX_VERSION === ZIBOX_VERSION.ZIBOX2) {
            if (
              titleData.title === 'ZiBox IP.' ||
              titleData.title === 'ZiBox Mac.'
            )
              return '';
          }
        } else {
          if (titleData.title === 'PC IP.') return '';
        }

        return (
          <StyledTitle key={`styled-title-${i}`} width={titleData.width}>
            <Text
              fontColor={fontColor}
              fontFamily="NanumBarunGothic"
              fontSize={fontSize}
            >
              {titleData.title}
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
  titles: Array<TitleProps>;
  fontColor: string;
  fontSize: number;
}

TableTitle.defaultProps = {
  bgColor: Colors.gray4,
  fontColor: Colors.white,
  fontSize: 13,
};

export default TableTitle;
