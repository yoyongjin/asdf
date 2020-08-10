import React from 'react';
import styled from 'styled-components';

import { Text, Select } from 'components/atoms';
import { COLORS } from 'utils/color';

const StyledWrapper = styled.div`
  padding-bottom : 20px;
  min-width : 170px;
`;
const StyledBlank = styled.span`
  padding-left: 0.5rem;
  padding-right: 0.5rem;
`;

function TextSelect({
  textValue,
  textWeight,
  selectWidth,
  selectRadius,
}: TextSelectProps) {
  return (
    <StyledWrapper>
      <Text fontSize={13} fontWeight={textWeight}>{textValue}</Text>
      <StyledBlank />
      <Select width={selectWidth} borderRadius={selectRadius}></Select>
    </StyledWrapper>
  );
}

interface TextSelectProps {
  textValue: string;
  selectWidth: number;
  selectRadius: number;
  textColor: string;
  textWeight: number | string;
}

TextSelect.defaultProps = {
  selectWidth: 7,
  selectRadius: 0,
  textColor: COLORS.dark_gray6,
  textWeight: 600,
};

export default TextSelect;
