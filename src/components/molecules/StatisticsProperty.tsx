import React from 'react';
import styled from 'styled-components';

import { Text } from 'components/atoms';
import { TableContentOption } from 'components/organisms/Table';
import { StatisticsData } from 'types/statistics';
import { Colors } from 'utils/color';
import Utils from 'utils/new_utils';

const StyledWrapper = styled.td``;

function StatisticsProperty({
  options,
  orderId,
  statisticsData,
}: TableContentProps) {
  return (
    <>
      {Object.keys(statisticsData).map((values, i) => {
        if (values === 'branch_name' || values === 'name') {
          return '';
        }

        return (
          <StyledWrapper key={`styled-statistics-list-wrapper-${i}`}>
            <Text
              fontColor={Colors.gray4}
              fontFamily="NanumBarunGothic"
              fontSize={12}
              fontWeight={400}
            >
              {values === 'team_name' && statisticsData[values]
                ? `${statisticsData['branch_name']} / ${statisticsData[values]}`
                : values === 'number'
                ? Utils.formatPhoneNumber(statisticsData[values])
                : values === 'all_call_time'
                ? Utils.getHourMinSecBySecond(statisticsData[values], ':')
                : values === 'success_ratio'
                ? statisticsData[values]
                  ? `${statisticsData[values]}%`
                  : '0%'
                : values === 'id'
                ? orderId
                : (statisticsData as any)[values]}
            </Text>
          </StyledWrapper>
        );
      })}
    </>
  );
}

interface TableContentProps {
  options: TableContentOption;
  orderId: number;
  statisticsData: StatisticsData;
}

StatisticsProperty.defaultProps = {};

export default StatisticsProperty;
