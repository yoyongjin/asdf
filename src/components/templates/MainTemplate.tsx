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

const StyledGnb = styled.div`
  /* Display */
  height: 6rem;
`;

const StyledContent = styled.div<StyledProps>`
  /* Display */
  height: calc(100vh - 6rem);
  padding-left: 3rem;
  padding-right: 3rem;

  /* Color */
  background-color: ${(props) => props.bgColor};
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
