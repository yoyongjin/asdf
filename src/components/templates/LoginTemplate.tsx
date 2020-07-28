import React from 'react';
import styled from 'styled-components';

import MainRouter from 'MainRouter';
import { COLORS } from 'utils/color';

const StyledWrapper = styled.div`
  /* Display */
  width: 100vw;
  height: 100vh;
  max-width: 140rem;
`;

const StyledBlankSpace = styled.div`
  /* Display */
  height: 20%;

  /* Color */
  background-color: ${COLORS.white};
`;

const StyledContent = styled.div`
  /* Position */
  position: relative;

  /* Display */
  height: 40%;

  /* Color */
  background-color: ${COLORS.green};
`;

const StyledMainLogoSpace = styled.div`
  /* Position */
  position: absolute;
  left: 10%;

  /* Display */
  width: 25%;
  height: 100%;

  /* Color */
  background-color: ${COLORS.white};
`;

const StyledMainLogo = styled.span`
  /* Position */
  position: inherit;
  top: 30%;
  left: 15%;
`;

const StyledFooter = styled.div`
  /* Position */
  position: relative;

  /* Display */
  height: 40%;

  /* Color */
  background-color: ${COLORS.white};
`;

const StyledSubLogo = styled.div`
  /* Position */
  position: absolute;
  top: 50%;
  left: 18%;
`;

function LoginTemplate({ mainLogo, subLogo }: LoginTemplateProps) {
  return (
    <StyledWrapper>
      <StyledBlankSpace />
      <StyledContent>
        <StyledMainLogoSpace>
          <StyledMainLogo>{mainLogo}</StyledMainLogo>
        </StyledMainLogoSpace>
        <MainRouter />
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
