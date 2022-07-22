import React, { useCallback } from 'react';
import AutoSizer from 'react-virtualized-auto-sizer';
import { FixedSizeList } from 'react-window';
import styled from 'styled-components';

import { StatisticsProperty, TableProperty } from 'components/molecules';
import { Colors } from 'utils/color';

const StyledWrapper = styled.tr<StyledTableContent>`
  border-bottom: 1px solid ${Colors.gray7};
  height: ${(props) => props.height}px;
  width: 100%;
`;

function TableContent({
  contents,
  isVirtual,
  type,
  tableWidth,
}: ITableContentProps) {
  const VirtualListView = useCallback(() => {
    return (
      <AutoSizer>
        {({ width, height }) => {
          return (
            <FixedSizeList
              height={height}
              itemCount={contents.data.length}
              itemData={contents.data}
              itemSize={contents.styles?.rowHeight!}
              width={width}
            >
              {({ index, style, data }) => {
                return (
                  <StyledWrapper
                    height={contents.styles?.rowHeight || 45}
                    style={style}
                  >
                    <TableProperty
                      rowHeight={contents.styles?.rowHeight || 45}
                      contents={data[index]}
                      contentType={contents.type}
                      listLength={contents.data.length}
                      orderId={index}
                      originItem={contents.originData![index]}
                      type={type}
                      tableWidth={tableWidth}
                    />
                  </StyledWrapper>
                );
              }}
            </FixedSizeList>
          );
        }}
      </AutoSizer>
    );
  }, [
    contents.data,
    contents.originData,
    contents.styles,
    contents.type,
    tableWidth,
    type,
  ]);

  const DefaultListView = useCallback(() => {
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
                listLength={contents.data.length}
                orderId={i}
                originItem={contents.originData![i]}
                type={type}
                tableWidth={tableWidth}
              />
            </StyledWrapper>
          );
        })}
      </>
    );
  }, [
    contents.data,
    contents.originData,
    contents.styles,
    contents.type,
    tableWidth,
    type,
  ]);

  const RenderView = useCallback(() => {
    if (isVirtual) {
      return VirtualListView();
    }

    return DefaultListView();
  }, [DefaultListView, VirtualListView, isVirtual]);

  return <>{RenderView()}</>;
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
  isVirtual: boolean;
  type: 'grid' | 'table';
  tableWidth: Array<string>;
}

TableContent.defaultProps = {};

export default TableContent;
