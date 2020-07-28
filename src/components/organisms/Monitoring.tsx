import React from 'react';
import styled from 'styled-components';

import { Title } from 'components/organisms';

const StyledWrapper = styled.div`
  /* Display */
  width: 100%;
  height: 100%;
`;

function Monitoring() {
  return (
    <StyledWrapper>
      <Title>상담원 모니터링</Title>
    </StyledWrapper>
  );
}

export default Monitoring;
