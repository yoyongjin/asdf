import React from 'react';
import styled from 'styled-components';

import MainRouter from 'MainRouter';
import { COLORS } from 'utils/color';

const StyledWrapper = styled.div`
  /* Display */
  min-width: 80rem;
  width: 100vw;
  max-width: 140rem;
  min-height: 100vh;
  height: 100vh;
  max-height: 1200rem;

  /* Other */
  /* overflow: hidden; */
`;

const StyledGnb = styled.div`
  /* Display */
  height: 3.8rem;
`;

const StyledContent = styled.div<StyledProps>`
  /* Display */
  height: calc(100% - 3.8rem);
  padding-left: 3rem;
  padding-right: 3rem;

  /* Color */
  background-color: ${(props) => props.bgColor};

  overflow: hidden;
`;

function MainTemplate({ gnb, bgColor }: MainTemplateProps) {
  return (
    <StyledWrapper>
      <StyledGnb>{gnb}</StyledGnb>
      <StyledContent bgColor={bgColor}>
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
