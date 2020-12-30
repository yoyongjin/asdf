import React from 'react';
import styled from 'styled-components';

import MainRouter from 'MainRouter';
import { COLORS } from 'utils/color';
import LinaLoginImage from 'images/login-bg.png';
import zmsLoginImage from 'images/zms/main-visual.png'

import { company, COMPANY } from 'utils/constants';

const StyledWrapper = styled.div`
  /* Display */
  height: 100vh;
  max-width: 140rem;
  min-width: 70rem;
  width: 100vw;
  background-color: ${company === COMPANY.LINA ? '#008bec' : '#1f2021'};
`;

const StyledMain = styled.div<{ main: string }>`
  width: ${company === COMPANY.LINA ? 1235 : 800}px; 
  height: ${company === COMPANY.LINA ? 800 : 480}px;
  margin: 0 auto;
  background-size: ${company === COMPANY.LINA ? 1235 : 800}px;
  background-image: url(${(props) => props.main});
  background-repeat: no-repeat;
`;

const StyledLoginForm = styled.div`
    padding-top: 20rem;
`;

function LoginTemplate({}: LoginTemplateProps) {
  return (
    <StyledWrapper>
      <StyledMain main={company === COMPANY.LINA ? LinaLoginImage : zmsLoginImage }>
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
