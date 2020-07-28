import React from 'react';
import styled from 'styled-components';

import { Title } from 'components/organisms';

const StyledWrapper = styled.div`
  /* Display */
  width: 100%;
  height: 100%;
`;

function User() {
  return (
    <StyledWrapper>
      <Title>사용자 관리</Title>
    </StyledWrapper>
  );
}

interface UserProps {}

User.defaultProps = {};

export default User;
