import React from 'react';
import styled from 'styled-components';

import { StatisticsProperty, UserProperty } from 'components/molecules';
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
        if (contents.type === 'user') {
          return (
            <StyledWrapper
              key={`styled-user-property-${i}`}
              height={contents.styles?.rowHeight!}
            >
              <UserProperty
                key={`table-user-property-${i}`}
                userData={data}
                options={contents.option!}
                onClickUserDataPopup={contents.click![0]}
                onClickRemoveUser={contents.click![2]}
                onClickResetPassword={contents.click![1]}
              />
            </StyledWrapper>
          );
        } else if (contents.type === 'stat') {
          return (
            <StyledWrapper
              key={`styled-statistics-property-${i}`}
              height={contents.styles?.rowHeight!}
            >
              <StatisticsProperty
                key={`table-statistics-property-${i}`}
                statisticsData={data}
                options={contents.option!}
                orderId={i + 1}
              />
            </StyledWrapper>
          );
        }
      })}
    </>
  );
}

interface StyledTableContent {
  height: number;
}

export interface ITableContentOption {
  currentBranchId?: number;
  currentPage?: number;
  currentSearchText?: string;
  currentTeamId?: number;
  currentLimit?: number;
}

export interface ITableContentStyles {
  rowHeight: number;
}

export interface ITableContentData {
  originData?: Array<any>;
  click?: Array<any>;
  data: Array<any>;
  option?: ITableContentOption;
  styles?: ITableContentStyles;
  type: string;
}

interface ITableContentProps {
  contents: ITableContentData;
}

TableContent.defaultProps = {};

export default TableContent;
