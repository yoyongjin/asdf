import React from 'react';
import styled from 'styled-components';

import { StatisticsProperty, UserProperty } from 'components/molecules';
import { TableContentData } from 'components/organisms/UserView';
import { Colors } from 'utils/color';

const StyledWrapper = styled.tr<StyledTableContent>`
  width: 100%;
  height: ${(props) => props.height}px;
  border-bottom: 1px solid ${Colors.gray7};
`;

function TableContent({ contents }: TableContentProps) {
  return (
    <>
      {contents.data.map((data, i) => {
        if (contents.type === 'user') {
          return (
            <StyledWrapper
              key={`styled-user-property-${i}`}
              height={contents.styles?.tableHeight!}
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
              height={contents.styles?.tableHeight!}
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

interface TableContentProps {
  contents: TableContentData;
}

TableContent.defaultProps = {};

export default TableContent;
