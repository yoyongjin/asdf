import React from 'react';
import styled from 'styled-components';

import MainRouter from 'MainRouter';

const StyledWrapper = styled.div`
  /* Display */
  height: 100vh;
  max-width: 200rem;
  min-width: 80rem;
  width: 100vw;
  text-align: center;

  /* Color */
  background-color: ${(props) => props.theme.color.login};
`;

const StyledContent = styled.div`
  /* Display */
  align-items: center;
  display: flex;
  flex-direction: column;
`;

const StyledMainImage = styled.div`
  /* Display */
  width: 100%;
`;

const StyledLoginForm = styled.div`
  /* Position */
  position: absolute;
  top: 380px;
  left: 50%;
  transform: translate(-50%, -50%);
`;

const StyledSubLogo = styled.div`
  /* Position */
  position: absolute;
  top: 634px;
  left: 50%;
  transform: translate(-50%, -50%);
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
