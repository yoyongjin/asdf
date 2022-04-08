import React, { Fragment } from 'react';
import styled from 'styled-components';

import { Text } from 'components/atoms';
import { StyledCommonBothWhiteSpace } from 'styles/common';
import { Colors } from 'utils/color';

const StyledWrapper = styled.div`
  width: 100%;
`;

function TabTitle({
  fontFamily,
  fontSize,
  fontWeight,
  notSelectedFontColor,
  selectedFontColor,
  selectedItem,
  setSelectedItem,
  tabs,
}: ITabTitleProps) {
  return (
    <StyledWrapper>
      {tabs.map((tab, index) => {
        return (
          <Fragment key={`TabTitle-Fragment-${index}`}>
            <Text
              fontColor={
                index === selectedItem
                  ? selectedFontColor
                  : notSelectedFontColor
              }
              fontFamily={fontFamily}
              fontSize={fontSize}
              fontWeight={fontWeight}
              onClick={() => setSelectedItem(index)}
            >
              {tab.name}
            </Text>
            {index + 1 !== tabs.length ? (
              <>
                <StyledCommonBothWhiteSpace pixel={15} />
                <Text
                  fontColor={notSelectedFontColor}
                  fontFamily={fontFamily}
                  fontSize={fontSize}
                >
                  |
                </Text>
                <StyledCommonBothWhiteSpace pixel={15} />
              </>
            ) : null}
          </Fragment>
        );
      })}
    </StyledWrapper>
  );
}

export interface ITabItem {
  name: string;
}

interface ITabTitleProps {
  fontFamily: string;
  fontSize: number;
  fontWeight: string;
  notSelectedFontColor: string;
  selectedFontColor: string;
  selectedItem: number;
  setSelectedItem: (index: number) => void;
  tabs: Array<ITabItem>;
}

TabTitle.defaultProps = {
  fontFamily: 'NanumGothic',
  fontSize: 18,
  fontWeight: 800,
  notSelectedFontColor: Colors.gray1,
  selectedFontColor: Colors.blue4,
  selectedItem: 0,
};

export default TabTitle;
