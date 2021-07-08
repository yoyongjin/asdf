import React from 'react';
import styled from 'styled-components';

import MainRouter from 'MainRouter';

const StyledWrapper = styled.div`
  /* Display */
  display: flex;
  height: 100vh;
  justify-content: center;
  max-width: 200rem;
  min-width: 80rem;
  width: 100vw;

  /* Color */
  background-color: ${(props) => props.theme.color.login};
`;

const StyledContent = styled.div`
  /* Display */
  align-items: center;
  display: flex;
  flex-direction: column;
  height: 100%;
  width: 80rem;
`;

const StyledMainImage = styled.div`
  /* Display */
  width: 100%;
`;

const StyledLoginForm = styled.div`
  /* Position */
  position: absolute;
  top: 380px;
`;

const StyledSubLogo = styled.div`
  /* Position */
  position: absolute;
  top: 634px;
`;

function LoginTemplate({ mainLogo, subLogo }: LoginTemplateProps) {
  return (
    <StyledWrapper>
      <StyledContent>
        <StyledMainImage>{mainLogo}</StyledMainImage>
        <StyledLoginForm>
          <MainRouter />
        </StyledLoginForm>
        <StyledSubLogo>{subLogo}</StyledSubLogo>
      </StyledContent>
    </StyledWrapper>
  );
}

interface LoginTemplateProps {
  mainLogo: React.ReactChild;
  subLogo: React.ReactChild;
}

export default LoginTemplate;
