import React from 'react';
import styled from 'styled-components';

import MainRouter from 'MainRouter';
import { COLORS } from 'utils/color';

const StyledWrapper = styled.div`
  /* Display */
  max-width: 140rem;
  min-width: 70rem;
  width: 100vw;
  height: 100vh;
`;

const StyledTitle = styled.div`
  /* Display */
  height: 11.69rem;
`;

const StyledContent = styled.div`
  /* Display */
  width: 100%;
  height: 19.81rem;
  display: flex;

  /* Color */
  background-color: ${COLORS.green};
`;

const StyledMainLogoSpace = styled.div`
  /* Position */
  position: relative;
  margin-left: 9.25rem;

  /* Display */
  width: 28.25rem;
  height: 100%;

  /* Color */
  background-color: ${COLORS.white};
`;

const StyledMainLogo = styled.span`
  /* Position */
  position: absolute;
  top: 30%;
  left: 20%;
`;

const StyledLoginForm = styled.div`
  width: calc(100% - 9.25rem - 28.25rem);
`;

const StyledFooter = styled.div`
  /* Position */
  position: relative;
  margin-left: 18.88rem;

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
