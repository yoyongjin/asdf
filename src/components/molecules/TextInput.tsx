import React from 'react';
import styled from 'styled-components';

import { Text, Input } from 'components/atoms';
import { COLORS } from 'utils/color';

const StyledWrapper = styled.div`
  padding-bottom: 20px;
  min-width: 170px;
`;
const StyledBlank = styled.span<BlankProps>`
  padding-left: 0.5rem;
  padding-right: ${(props) =>
    props.padRight ? `${props.padRight}px` : '0.5rem'};
`;

function TextInput({
  textValue,
  textWeight,
  inputWidth,
  inputRadius,
  inputPh,
  padRight,
  height,
  customStyle,
  onChange,
  name,
  value,
  type,
  image,
}: TextInputProps) {
  return (
    <StyledWrapper>
      <Text fontSize={13} fontWeight={textWeight}>
        {textValue}
      </Text>
      <StyledBlank padRight={padRight} />
      <Input
        name={name}
        type={type}
        customStyle={customStyle}
        height={height}
        width={6.5}
        borderRadius={inputRadius}
        placeholder={inputPh}
        onChange={onChange}
        value={value}
        image={image}
      ></Input>
    </StyledWrapper>
  );
}

interface BlankProps {
  padRight?: number;
}

interface TextInputProps extends BlankProps {
  textValue: string;
  textWeight: string;
  inputWidth: number;
  inputRadius: number;
  inputPh: string;
  textColor: string;
  height?: number;
  customStyle?: string;
  name: string;
  value: string;
  type?: string;
  image?: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

TextInput.defaultProps = {
  inputWidth: 7,
  inputRadius: 0,
  inputPh: '',
  textColor: COLORS.dark_gray6,
  textWeight: 600,
  type: 'input'
};

export default TextInput;
