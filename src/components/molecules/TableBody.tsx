import React, { useCallback } from 'react';
import { ScrollSyncPane } from 'react-scroll-sync';
import AutoSizer from 'react-virtualized-auto-sizer';
import { FixedSizeList } from 'react-window';
import styled from 'styled-components';

import { TableProperty } from 'components/molecules';
import { Colors } from 'utils/color';

const StyledWrapper = styled.div<IStyledWrapper>`
  align-items: center;
  border-bottom: 1px solid ${Colors.gray7};
  display: grid;
  grid-template-columns: ${(props) => props.widthTemplate};
  height: ${(props) => props.height}px;
`;

function TableBody({ widthTemplate, contents, isVirtual }: ITableBody) {
  const DefaultListView = useCallback(() => {
    return (
      <ScrollSyncPane group="one">
        <div
          style={{
            overflow: 'auto',
          }}
        >
          {contents.data.map((data, index) => {
            return (
              <StyledWrapper
                key={`styled-table-content-${index}`}
                height={contents.styles?.rowHeight || 45}
                widthTemplate={widthTemplate}
              >
                <TableProperty
                  contents={data}
                  contentType={contents.type}
                  listLength={contents.data.length}
                  orderId={index}
                  originItem={contents.originData![index]}
                />
              </StyledWrapper>
            );
          })}
        </div>
      </ScrollSyncPane>
    );
  }, [
    contents.data,
    contents.originData,
    contents.styles,
    contents.type,
    widthTemplate,
  ]);

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
                    widthTemplate={widthTemplate}
                  >
                    <TableProperty
                      contents={data[index]}
                      contentType={contents.type}
                      listLength={contents.data.length}
                      orderId={index}
                      originItem={contents.originData![index]}
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
    widthTemplate,
  ]);

  const RenderView = useCallback(() => {
    if (isVirtual) {
      return VirtualListView();
    }

    return DefaultListView();
  }, [DefaultListView, VirtualListView, isVirtual]);

  return <>{RenderView()}</>;
}

interface IStyledWrapper {
  height: number;
  widthTemplate: string;
}

export interface ITableBodyStyles {
  rowHeight: number;
}

export interface ITableBodyData {
  originData?: Array<any>;
  data: Array<any>;
  styles?: ITableBodyStyles;
  type: string;
}

interface ITableBody {
  contents: ITableBodyData;
  isVirtual: boolean;
  widthTemplate: string;
}

export default TableBody;

TableBody.defaultProps = {};
