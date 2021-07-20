import React from 'react';
import styled from 'styled-components';

import { UserProperty } from 'components/molecules';
import { Colors } from 'utils/color';
import { TableContentData } from 'components/organisms/UserView';
import StatisticsProperty from './StatisticsProperty';

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
