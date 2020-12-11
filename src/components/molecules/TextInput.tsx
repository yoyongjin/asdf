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
  fontSize,
  fontWeight,
  disabled,
  step,
  min,
  max,
}: TextInputProps) {
  return (
    <StyledWrapper>
      <Text fontSize={fontSize} fontWeight={textWeight}>
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
        logoImg={image}
        fontSize={fontSize}
        fontWeight={fontWeight}
        disabled={disabled}
        step={step}
        min={min}
        max={max}
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
  fontSize: number;
  fontWeight: number | string;
  disabled: boolean;
  step?: number;
  min?: number;
  max?: number;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

TextInput.defaultProps = {
  inputWidth: 7,
  inputRadius: 0,
  inputPh: '',
  textColor: COLORS.dark_gray6,
  textWeight: 600,
  type: 'input',
  fontSize: 1,
  fontWeight: 700,
  disabled: false,
};

export default TextInput;
