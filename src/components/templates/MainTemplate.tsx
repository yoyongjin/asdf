import React from 'react';
import styled from 'styled-components';

import MainRouter from 'MainRouter';
import { COLORS } from 'utils/color';

const StyledWrapper = styled.div`
  /* Display */
  width: 100vw;
  max-width: 140rem;
  height: 100vh;
`;

const StyledGnb = styled.div`
  /* Display */
  height: 10%;
`;

const StyledContent = styled.div<StyledProps>`
  /* Display */
  height: 90%;
  padding-left: 3rem;
  padding-right: 3rem;

  /* Color */
  background-color: ${(props) => props.bgColor};
`;

function MainTemplate({ gnb, bgColor }: MainTemplateProps) {
  return (
    <StyledWrapper>
      <StyledGnb>{gnb}</StyledGnb>
      <StyledContent  bgColor={bgColor}>
        <MainRouter />
      </StyledContent>
    </StyledWrapper>
  );
}

interface StyledProps {
  bgColor: string;
}

interface MainTemplateProps extends StyledProps {
  gnb: React.ReactChild;
}

MainTemplate.defaultProps = {
  bgColor: COLORS.white,
};

export default MainTemplate;
