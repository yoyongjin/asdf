import React from 'react';
import styled from 'styled-components';

import { Text, Input } from 'components/atoms';
import { COLORS } from 'utils/color';

const StyledWrapper = styled.div``;
const StyledBlank = styled.span`
  padding-left: 0.5rem;
  padding-right: 0.5rem;
`;

function TextInput({
  textValue,
  textWeight,
  inputWidth,
  inputRadius,
  inputPh,
}: TextInputProps) {
  return (
    <StyledWrapper>
      <Text fontWeight={textWeight}>{textValue}</Text>
      <StyledBlank />
      <Input width={7} borderRadius={inputRadius} placeholder={inputPh}></Input>
    </StyledWrapper>
  );
}

interface TextInputProps {
  textValue: string;
  textWeight: string;
  inputWidth: number;
  inputRadius: number;
  inputPh: string;
  textColor: string;
}

TextInput.defaultProps = {
  inputWidth: 7,
  inputRadius: 0,
  inputPh: '',
  textColor: COLORS.dark_gray6,
  textWeight: 600,
};

export default TextInput;
