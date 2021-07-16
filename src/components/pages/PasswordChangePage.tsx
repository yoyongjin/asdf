import React from 'react';

import changedPasswordTitle from 'images/zilink-pwc-title.png';
import { Image } from 'components/atoms';
import styled from 'styled-components';
import { ChangedPasswordForm } from 'components/molecules';

const StyledWrapper = styled.div`
  width: 100vw;
  height: 100vh;
`;

const StyeldTopArea = styled.div`
  height: 40%;
  padding-top: 62px;
  padding-left: 12px;
`;

const StyledDownArea = styled.div`
  height: calc(100% - 40%);
`;

function PasswordChangePage() {
  return (
    <StyledWrapper>
      <StyeldTopArea>
        <Image src={changedPasswordTitle} width={817} height={219} />
      </StyeldTopArea>
      <StyledDownArea>
        <ChangedPasswordForm />
      </StyledDownArea>
    </StyledWrapper>
  );
}

export default PasswordChangePage;
