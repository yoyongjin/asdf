import React from 'react';
import styled, { css } from 'styled-components';

import { Text } from 'components/atoms';
import { Colors } from 'utils/color';

const StyledWrapper = styled.div<IStyledWrapper>`
  display: grid;
  grid-template-columns: ${(props) => props.widthTemplate};
  height: 100%;
`;

const StyledRow = styled.div<IStyledRow>`
  background-color: ${(props) => props.backgroundColor};
  border-width: ${(props) => props.borderWidth}px;
  border-style: ${(props) => props.borderStyle};
  border-color: ${(props) => props.borderColor};
  display: grid;
  /* height: 100%; */
  padding-left: ${(props) => props.paddingLeft}px;
  align-items: center;
  justify-content: ${(props) => props.justifyContent};

  ${(props) => {
    if (props.rowSpanValue && props.rowSpanValue > 1) {
      return css<IStyledRow>`
        grid-row: span ${(props) => props.rowSpanValue};
      `;
    }
  }}
  ${(props) => {
    if (props.colSpanValue && props.colSpanValue > 1) {
      return css<IStyledRow>`
        grid-column: span ${(props) => props.colSpanValue};
      `;
    }
  }}
`;

function TableHeader({ widthTemplate, titles }: ITableHeader) {
  return (
    <StyledWrapper widthTemplate={widthTemplate}>
      {titles.map((titleData, index) => {
        if (titleData.isNotShow) {
          return null;
        }

        return (
          <StyledRow
            key={`styled-table-title-${titleData.title}-${index}`}
            backgroundColor={titleData.backgroundColor}
            borderColor={titleData.borderColor}
            borderStyle={titleData.borderStyle}
            borderWidth={titleData.borderWidth}
            colSpanValue={titleData.colSpan}
            justifyContent={titleData.justifyContent}
            paddingLeft={titleData.paddingLeft}
            rowSpanValue={titleData.rowSpan}
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
          </StyledRow>
        );
      })}
    </StyledWrapper>
  );
}

interface IStyledRow {
  backgroundColor?: string;
  borderColor?: string;
  borderStyle?: string;
  borderWidth?: number;
  colSpanValue?: number;
  justifyContent?: string;
  paddingLeft?: number;
  rowSpanValue?: number;
}

interface IStyledWrapper {
  widthTemplate: string;
}

export interface ITableHeaderData extends IStyledRow {
  fontColor?: string;
  fontFamily?: string;
  fontWeight?: number;
  fontSize?: number;
  isNotShow?: boolean; // 화면에 표시 여부
  letterSpacing?: number;
  title: string; // 화면에 보여질 텍스트
  colSpan?: number;
  rowSpan?: number;
}

interface ITableHeader {
  titles: Array<ITableHeaderData>;
  widthTemplate: string;
}

export default TableHeader;
