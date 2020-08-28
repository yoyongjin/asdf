import React from 'react';
import styled from 'styled-components';

import MainRouter from 'MainRouter';
import { COLORS } from 'utils/color';

const StyledWrapper = styled.div`
  /* Display */
  height: 100vh;
  max-width: 140rem;
  min-width: 70rem;
  width: 100vw;
`;

const StyledTitle = styled.div`
  /* Display */
  height: 11.69rem;
`;

const StyledContent = styled.div`
  /* Display */
  display: flex;
  height: 19.81rem;
  width: 100%;

  /* Color */
  background-color: ${COLORS.green};
`;

const StyledMainLogoSpace = styled.div`
  /* Position */
  margin-left: 9.25rem;
  position: relative;

  /* Display */
  height: 100%;
  width: 28.25rem;

  /* Color */
  background-color: ${COLORS.white};
`;

const StyledMainLogo = styled.span`
  /* Position */
  left: 20%;
  position: absolute;
  top: 30%;
`;

const StyledLoginForm = styled.div`
  width: calc(100% - 9.25rem - 28.25rem);
`;

const StyledFooter = styled.div`
  /* Position */
  margin-left: 18.88rem;
  position: relative;

  /* Display */
  height: calc(100% - 11.69rem - 19.81rem);
`;

const StyledSubLogo = styled.div`
  /* Position */
  position: absolute;
  top: 50%;
`;

function LoginTemplate({ mainLogo, subLogo }: LoginTemplateProps) {
  return (
    <StyledWrapper>
      <StyledTitle />
      <StyledContent>
        <StyledMainLogoSpace>
          <StyledMainLogo>{mainLogo}</StyledMainLogo>
        </StyledMainLogoSpace>
        <StyledLoginForm>
          <MainRouter />
        </StyledLoginForm>
      </StyledContent>
      <StyledFooter>
        <StyledSubLogo>{subLogo}</StyledSubLogo>
      </StyledFooter>
    </StyledWrapper>
  );
}

interface LoginTemplateProps {
  mainLogo: React.ReactChild;
  subLogo: React.ReactChild;
}

export default LoginTemplate;
