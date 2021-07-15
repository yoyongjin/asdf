import React from 'react';
import styled from 'styled-components';

import { Text, Input } from 'components/atoms';
import { Colors } from 'utils/color';

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
  textColor,
  inputMaxLength,
  disabled,
}: TextInputProps) {
  return (
    <StyledWrapper>
      <Text fontSize={fontSize} fontWeight={textWeight} fontColor={textColor}>
        {textValue}
      </Text>
      <StyledBlank padRight={padRight} />
      <Input
        name={name}
        type={type}
        customStyle={customStyle}
        height={height}
        width={inputWidth}
        borderRadius={inputRadius}
        placeholder={inputPh}
        onChange={onChange}
        value={value}
        logoImg={image}
        fontSize={fontSize}
        fontWeight={fontWeight}
        disabled={disabled}
        maxLength={inputMaxLength}
      />
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
  inputMaxLength?: number;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

TextInput.defaultProps = {
  inputWidth: 7,
  inputRadius: 0,
  inputPh: '',
  textColor: Colors.gray9,
  textWeight: 600,
  type: 'input',
  fontSize: 1,
  fontWeight: 700,
  disabled: false,
};

export default TextInput;
