import React from 'react';
import styled from 'styled-components';

import MainRouter from 'MainRouter';

const StyledWrapper = styled.div`
  /* Display */
  display: flex;
  height: 100vh;
  justify-content: center;
  max-width: 140rem;
  min-width: 70rem;
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
  width: 50.06rem;
`;

const StyledMainImage = styled.div`
  /* Display */
  width: 100%;
`;

const StyledLoginForm = styled.div`
  position: absolute;
  top: 380px;
  /* top: 45%; */
  /* margin-top: 384px; */
`;

const StyledIRLinkCorp = styled.div`
  height: 0.75rem;
  margin-top: 15.88rem;
`;

function LoginTemplate({ mainLogo }: LoginTemplateProps) {
  return (
    <StyledWrapper>
      <StyledContent>
        <StyledMainImage>{mainLogo}</StyledMainImage>
        <StyledLoginForm>
          <MainRouter />
        </StyledLoginForm>
        {/* <StyledIRLinkCorp>
          <Text
            fontColor={Colors.white1}
            fontFamily={'FranklinGothic-Cond'}
            fontSize={0.75}
            fontWeight={500}
          >
            ⓒ IR-Link Corp.
          </Text>
        </StyledIRLinkCorp> */}
      </StyledContent>
    </StyledWrapper>
  );
}

interface LoginTemplateProps {
  mainLogo: React.ReactChild;
}

export default LoginTemplate;
