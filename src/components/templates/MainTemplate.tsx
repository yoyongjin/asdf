import React from 'react';
import styled from 'styled-components';

import MainRouter from 'MainRouter';
import { COLORS } from 'utils/color';
import Logger from 'utils/log';

const StyledWrapper = styled.div`
  /* Display */
  height: 100vh;
  max-height: 1200rem;
  min-height: 100vh;
  max-width: 140rem;
  min-width: 70rem;
  width: 100vw;
`;

const StyledGnb = styled.div`
  /* Display */
  height: 3.88rem;
`;

const StyledContent = styled.div<StyledProps>`
  /* Position */
  padding-left: 27px;
  padding-right: 27px;

  /* Display */
  height: calc(100% - 3.88rem);

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
