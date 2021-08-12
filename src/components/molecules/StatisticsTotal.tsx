import { Text } from 'components/atoms';
import { TableTitleData } from 'components/organisms/UserView';
import React from 'react';
import styled from 'styled-components';

import { Colors } from 'utils/color';
import Utils from 'utils/new_utils';

const StyledWrapper = styled.table`
  /* Display */
  border-collapse: collapse;
  table-layout: fixed;
  width: 100%;
`;

const StyledBody = styled.tbody`
  text-align: center;
`;

const StyledRow = styled.tr`
  width: 100%;
  height: 40px;
  border-top: 1px solid ${Colors.navy2};
  border-bottom: 1px solid ${Colors.navy2};
`;

const StyledData = styled.td<StyledDataProps>`
  width: ${(props) => props.width}%;
  height: 40px;
  vertical-align: middle;
`;

function StatisticsTotal({ titles, contents }: StatisticsTotalProps) {
  return (
    <StyledWrapper>
      <StyledBody>
        <StyledRow>
          {titles.map((titleData, i) => {
            return (
              <StyledData
                key={`styled-total-title-${i}`}
                width={titleData.width}
              >
                <Text
                  fontColor={Colors.gray4}
                  fontFamily="NanumBarunGothic"
                  fontSize={14}
                  fontWeight={700}
                >
                  {i === 0
                    ? '합계'
                    : i === 3
                    ? contents.outboundCount
                    : i === 4
                    ? contents.successCount
                    : i === 5
                    ? `${
                        Math.floor(contents.successRatio / contents.count) || 0
                      }%`
                    : i === 6
                    ? contents.inboundCount
                    : i === 7
                    ? Utils.getHourMinSecBySecond(contents.allCallTime)
                    : ''}
                </Text>
              </StyledData>
            );
          })}
        </StyledRow>
      </StyledBody>
    </StyledWrapper>
  );
}

interface StyledDataProps {
  width: number;
}

interface StatisticsTotalProps {
  titles: Array<TableTitleData>;
  contents: {
    outboundCount: number;
    successCount: number;
    successRatio: number;
    inboundCount: number;
    allCallTime: number;
    count: number;
  };
}

export default StatisticsTotal;
