import React from 'react';
import styled from 'styled-components';

import { StatisticsProperty, TableProperty } from 'components/molecules';
import { Colors } from 'utils/color';

const StyledWrapper = styled.tr<StyledTableContent>`
  border-bottom: 1px solid ${Colors.gray7};
  height: ${(props) => props.height}px;
  width: 100%;
`;

function TableContent({ contents }: ITableContentProps) {
  return (
    <>
      {contents.data.map((data, i) => {
        if (contents.type === 'stat') {
          return (
            <StyledWrapper
              key={`styled-statistics-property-${i}`}
              height={contents.styles?.rowHeight!}
            >
              <StatisticsProperty
                key={`table-statistics-property-${i}`}
                statisticsData={data}
                orderId={i + 1}
              />
            </StyledWrapper>
          );
        }

        return (
          <StyledWrapper
            key={`styled-table-content-${i}`}
            height={contents.styles?.rowHeight || 45}
          >
            <TableProperty
              contents={data}
              contentType={contents.type}
              originItem={contents.originData![i]}
            />
          </StyledWrapper>
        );
      })}
    </>
  );
}

interface StyledTableContent {
  height: number;
}

export interface ITableContentStyles {
  rowHeight: number;
}

export interface ITableContentData {
  originData?: Array<any>;
  data: Array<any>;
  styles?: ITableContentStyles;
  type: string;
}

interface ITableContentProps {
  contents: ITableContentData;
}

TableContent.defaultProps = {};

export default TableContent;
