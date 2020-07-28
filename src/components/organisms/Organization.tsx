import React from 'react';
import styled from 'styled-components';

import { Title } from 'components/organisms';

const StyledWrapper = styled.div`
  /* Display */
  width: 100%;
  height: 100%;
`;

function Organization() {
  return (
    <StyledWrapper>
      <Title>조직 관리</Title>
    </StyledWrapper>
  );
}

interface OrganizationProps {}

Organization.defaultProps = {};

export default Organization;
