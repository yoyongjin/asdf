import React from 'react';
import styled from 'styled-components';

import { Text, Input } from 'components/atoms';
import { COLORS } from 'utils/color';

const StyledWrapper = styled.div`
  padding-bottom : 20px;
  min-width : 170px;
`;
const StyledBlank = styled.span<BlankProps>`
  padding-left: 0.5rem;
  padding-right: ${(props) => props.padRight ? `${props.padRight}px` : "0.5rem"};
`;

function TextInput({
  textValue,
  textWeight,
  inputWidth,
  inputRadius,
  inputPh,
  padRight,
  height
}: TextInputProps) {
  return (
    <StyledWrapper>
      <Text fontSize={13} fontWeight={textWeight}>{textValue}</Text>
      <StyledBlank padRight={padRight}/>
      <Input height={height} width={6.5} borderRadius={inputRadius} placeholder={inputPh}></Input>
    </StyledWrapper>
  );
}

interface BlankProps {
  padRight ?: number;
}

interface TextInputProps {
  textValue: string;
  textWeight: string;
  inputWidth: number;
  inputRadius: number;
  inputPh: string;
  textColor: string;
  padRight ?: number;
  height ?: number;
}

TextInput.defaultProps = {
  inputWidth: 7,
  inputRadius: 0,
  inputPh: '',
  textColor: COLORS.dark_gray6,
  textWeight: 600,
};

export default TextInput;
