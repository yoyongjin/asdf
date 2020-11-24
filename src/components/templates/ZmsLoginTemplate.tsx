import React from 'react'
import styled from 'styled-components';

import MainRouter from 'MainRouter';
import { COLORS } from 'utils/color';
import { Text } from 'components/atoms';

const StyledWrapper = styled.div`
  /* Display */
  display: flex;
  justify-content: center;
  height: 100vh;
  max-width: 140rem;
  min-width: 70rem;
  width: 100vw;
  
  /* Color */
  background-color: ${COLORS.dark_blue};
`;

const StyledContent = styled.div`
  /* Display */
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 100%;
  width: 50.06rem;
`;

const StyledMainLogo = styled.div`
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


function ZmsLoginTemplate({ mainLogo } : ZmsLoginTemplateProps) {
    return (
        <StyledWrapper>
            <StyledContent>
                <StyledMainLogo>{mainLogo}</StyledMainLogo>
                <StyledLoginForm>
                    <MainRouter />
                </StyledLoginForm>
                <StyledIRLinkCorp>
                   <Text 
                    fontColor={COLORS.gray}
                    fontFamily={'FranklinGothic-Cond'}
                    fontSize={0.75}
                    fontWeight={500}
                   >
                    ⓒ IR-Link Corp.
                   </Text>
                </StyledIRLinkCorp>
            </StyledContent>
        </StyledWrapper>
    )
}

interface ZmsLoginTemplateProps {
    mainLogo: React.ReactChild;
    
}

export default ZmsLoginTemplate
