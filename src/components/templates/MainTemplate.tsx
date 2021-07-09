import React from 'react';
import styled from 'styled-components';

import MainRouter from 'MainRouter';
import { COLORS } from 'utils/color';

const StyledWrapper = styled.div`
  /* Display */
  height: 100vh;
  max-height: 1200rem;
  min-height: 100vh;
  max-width: 200rem;
  min-width: 80rem;
  width: 100vw;
`;

const StyledGnb = styled.div`
  /* Display */
  height: 6.2rem;
`;

const StyledContent = styled.div<StyledProps>`
  /* Position */
  padding-left: 27px;
  padding-right: 27px;

  /* Display */
  height: calc(100% - 3.88rem);

  /* Color */
  background-color: ${(props) => props.backgroundColor};
`;

function MainTemplate({ gnb, backgroundColor }: MainTemplateProps) {
  return (
    <StyledWrapper>
      <StyledGnb>{gnb}</StyledGnb>
      <StyledContent backgroundColor={backgroundColor}>
        <MainRouter />
      </StyledContent>
    </StyledWrapper>
  );
}

interface StyledProps {
  backgroundColor: string;
}

interface MainTemplateProps extends StyledProps {
  gnb: React.ReactChild;
}

MainTemplate.defaultProps = {
  backgroundColor: COLORS.white,
};

export default MainTemplate;
