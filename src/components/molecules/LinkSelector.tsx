import React from 'react';
import styled from 'styled-components';

import { Link, Text } from 'components/atoms';
import { COLORS } from 'utils/color';

const StyledWrapper = styled.div`
  width: 100%;
  height: 100%;
`;

const StyledMonitoring = styled.span``;

const StyledGroup = styled.span`
  padding-left: 3rem;
  padding-right: 1.5rem;
`;

const StyledUser = styled.span`
  padding-left: 1.5rem;
`;

function LinkSelector() {
  return (
    <StyledWrapper>
      <StyledMonitoring>
        <Link path="/main">
          <Text fontColor={COLORS.white} fontWeight={600}>
            모니터링
          </Text>
        </Link>
      </StyledMonitoring>
      <StyledGroup>
        <Link path="/main/manage/organization">
          <Text fontColor={COLORS.white} fontWeight={600}>
            조직 관리
          </Text>
        </Link>
      </StyledGroup>
      <StyledUser>
        <Link path="/main/manage/user">
          <Text fontColor={COLORS.white} fontWeight={600}>
            사용자 관리
          </Text>
        </Link>
      </StyledUser>
    </StyledWrapper>
  );
}

interface LinkSelectorProps {}

export default LinkSelector;
