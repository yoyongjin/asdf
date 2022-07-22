import React from 'react';
import styled from 'styled-components';

import { Text } from 'components/atoms';
import { Colors } from 'utils/color';

const StyledWrapper = styled.tr`
  width: 100%;
`;

const StyledTitle = styled.th<IStyledTitle>`
  background-color: ${(props) => props.backgroundColor};
  border-width: ${(props) => props.borderWidth}px;
  border-style: ${(props) => props.borderStyle};
  border-color: ${(props) => props.borderColor};
  padding: 0px;
  padding-left: ${(props) => props.paddingLeft}px;
  text-align: ${(props) => props.textAlign};
  vertical-align: middle;
  width: ${(props) => props.widthValue};
`;

function TableTitle({ titles, tableWidth }: ITableTitleProps) {
  return (
    <StyledWrapper>
      {titles.map((titleData, i) => {
        if (titleData.isNotShow) {
          return null;
        }

        return (
          <StyledTitle
            key={`styled-table-title-${titleData.title}-${i}`}
            backgroundColor={titleData.backgroundColor}
            borderColor={titleData.borderColor}
            borderStyle={titleData.borderStyle}
            borderWidth={titleData.borderWidth}
            colSpan={titleData.colSpan}
            isWidthPercent={titleData.isWidthPercent}
            paddingLeft={titleData.paddingLeft}
            rowSpan={titleData.rowSpan}
            textAlign={titleData.textAlign}
            width={titleData.width}
            widthValue={tableWidth[i]}
          >
            <Text
              fontColor={titleData.fontColor || Colors.navy2}
              fontFamily={titleData.fontFamily || 'NanumBarunGothic'}
              fontSize={titleData.fontSize}
              fontWeight={titleData.fontWeight || 800}
              letterSpacing={titleData.letterSpacing}
            >
              {titleData.title}
            </Text>
          </StyledTitle>
        );
      })}
    </StyledWrapper>
  );
}

interface IStyledTitle {
  backgroundColor?: string;
  borderColor?: string;
  borderStyle?: string;
  borderWidth?: number;
  textAlign?: string;
  paddingLeft?: number;
  isWidthPercent?: boolean; // width 고정/비고정 여부
  width: number;
  widthValue?: string;
}

export interface ITableTitleData extends IStyledTitle {
  colSpan?: number;
  fontColor?: string;
  fontFamily?: string;
  fontWeight?: number;
  fontSize?: number;
  isNotShow?: boolean; // 화면에 표시 여부
  letterSpacing?: number;
  rowSpan?: number;
  title: string; // 화면에 보여질 텍스트
}

interface ITableTitleProps {
  titles: Array<ITableTitleData>;
  tableWidth: Array<string>;
}

TableTitle.defaultProps = {};

export default TableTitle;
