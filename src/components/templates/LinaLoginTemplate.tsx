import React from 'react';
import styled from 'styled-components';

import MainRouter from 'MainRouter';
import { COLORS } from 'utils/color';
import LinaLoginImage from 'images/login-bg.png';

const StyledWrapper = styled.div`
  /* Display */
  height: 100vh;
  max-width: 140rem;
  min-width: 70rem;
  width: 100vw;
  background-color: #008bec;
`;

const StyledMain = styled.div<{ main: string }>`
  width: 1235px;
  height: 100%;
  margin: 0 auto;
  background-size: 1235px;
  background-image: url(${(props) => props.main});
  background-repeat: no-repeat;
`;

const StyledLoginForm = styled.div`
    padding-top: 20rem;
`;

function LoginTemplate({}: LoginTemplateProps) {
  return (
    <StyledWrapper>
      <StyledMain main={LinaLoginImage}>
        <StyledLoginForm>
          <MainRouter />
        </StyledLoginForm>
      </StyledMain>
    </StyledWrapper>
  );
}

interface LoginTemplateProps {
  // mainImg: React.ReactChild;
}

export default LoginTemplate;
