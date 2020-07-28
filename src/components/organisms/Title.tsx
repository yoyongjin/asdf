import React from 'react';
import styled from 'styled-components';

import { Text } from 'components/atoms';
import { COLORS } from 'utils/color';

const StyledWrapper = styled.div`
  /* Display */
  display: flex;
  border-bottom: 0.05rem solid ${COLORS.green};
  padding-top: 2rem;
  padding-bottom: 1rem;

  /* background-color: red; */
`;

const StyleTitle = styled.span`
  /* background-color: rebeccapurple; */
`;

function Title({ children }: TitleProps) {
  return (
    <StyledWrapper>
      <StyleTitle>
        <Text fontSize={1.3} fontWeight={600} fontColor={COLORS.green}>
          {children}
        </Text>
      </StyleTitle>
    </StyledWrapper>
  );
}

interface TitleProps {
  children: string;
}

Title.defaultProps = {};

export default Title;
