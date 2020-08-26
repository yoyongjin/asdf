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

const StyledBlankSpace = styled.div`
  /* Display */
  height: 11.6rem;

  /* Color */
  background-color: ${COLORS.white};
`;

const StyledContent = styled.div`
  /* Display */
  width: 100%;
  height: 19.8rem;
  display: flex;

  /* Color */
  background-color: ${COLORS.green};
`;

const StyledBlankLeftSpace = styled.div`
  /* Display */
  width: 9.2rem;

  /* Color */
  background-color: ${COLORS.green};
`;

const StyledMainLogoSpace = styled.div`
  /* Position */
  position: relative;

  /* Display */
  width: 28.2rem;
  height: 100%;

  /* Color */
  background-color: ${COLORS.white};
`;

const StyledLoginForm = styled.div`
  width: calc(100% - 9.2rem - 28.2rem);

  text-align: left;
`;

const StyledMainLogo = styled.span`
  /* Position */
  position: absolute;
  top: 30%;
  left: 20%;
`;

const StyledFooter = styled.div`
  /* Position */
  position: relative;

  /* Display */
  height: calc(100% - 11.6rem - 19.8rem);

  /* Color */
  background-color: ${COLORS.white};
`;

const StyledSubLogo = styled.div`
  /* Position */
  position: absolute;
  top: 50%;
  left: 20%;
`;

function LoginTemplate({ mainLogo, subLogo }: LoginTemplateProps) {
  return (
    <StyledWrapper>
      <StyledBlankSpace />
      <StyledContent>
        <StyledBlankLeftSpace />
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
