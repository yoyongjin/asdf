import React from 'react';
import styled, { css } from 'styled-components';

import { Text } from 'components/atoms';
import { Colors } from 'utils/color';

const StyledWrapper = styled.div`
  display: flex;
  justify-content: center;
`;

const StyledCurrent = styled.div<StyledProps>`
  border: 1px solid ${Colors.gray2};
  width: calc(41px - 9px);
  height: calc(24px - 6px);
  ${(props) => {
    if (props.textAlign === 0) {
      return css`
        text-align: left;
        padding-left: 5px;
      `;
    } else if (props.textAlign === 1) {
      return css`
        text-align: center;
      `;
    } else if (props.textAlign === 2) {
      return css`
        text-align: right;
        padding-right: 9px;
        padding-top: 4px;
        padding-bottom: 2px;
      `;
    }
  }};
`;

const StyledDivide = styled.div<StyledProps>`
  align-self: center;
  padding-left: ${(props) => props.padding || 0.2}rem;
  padding-right: ${(props) => props.padding || 0.2}rem;
`;

const StyledMax = styled.div`
  align-self: center;
`;

function PageCount({ curPage, maxPage, padding, textAlign }: PageCountProps) {
  return (
    <StyledWrapper>
      <StyledCurrent textAlign={textAlign}>
        <Text fontColor={Colors.gray6} fontFamily="NanumBarunGothic">
          {curPage}
        </Text>
      </StyledCurrent>
      <StyledDivide padding={padding}>
        <Text fontColor={Colors.gray6} fontFamily="NanumBarunGothic">
          /
        </Text>
      </StyledDivide>
      <StyledMax>
        <Text fontColor={Colors.gray6} fontFamily="NanumBarunGothic">
          {maxPage}
        </Text>
      </StyledMax>
    </StyledWrapper>
  );
}

interface StyledProps {
  padding?: number;
  textAlign?: number;
}

interface PageCountProps extends StyledProps {
  curPage: number;
  maxPage: number;
}

PageCount.defaultProps = {
  textAlign: 1,
};

export default PageCount;
