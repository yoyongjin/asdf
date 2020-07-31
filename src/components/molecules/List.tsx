import React from 'react';
import styled from 'styled-components';

import { Text } from 'components/atoms';

const StyledWrapper = styled.div``;

const StyledTitle = styled.div`
    display: flex;
`;


function List({titleList, dataList}: ListProps) {
  return <StyledWrapper>
      <StyledTitle>
          {titleList?.map(title => {
              return <Text>123</Text>
          })}
      </StyledTitle>
  </StyledWrapper>;
}

interface dataListType {
    id: number;
    branch: string;
    team: string;
    auth: number;
    name: string;
    userId: string;
    number: string;
    ziboxIp: string;
}

interface ListProps {
    titleList: string[];
    dataList: dataListType[]
}

List.defaultProps = {}

export default List;
