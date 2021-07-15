import React from 'react';
import styled from 'styled-components';

import { Text, Input } from 'components/atoms';
import { Colors } from 'utils/color';

const StyledWrapper = styled.div`
  padding-bottom: 20px;
  min-width: 170px;
`;
const StyledBlank = styled.span<StyledBlankProps>`
  padding-left: 0.5rem;
  padding-right: ${(props) =>
    props.padRight ? `${props.padRight}px` : '0.5rem'};
`;

function TextInput({
  inputBorderRadius,
  inputCustomStyle,
  inputDisabled,
  inputHeight,
  inputImage,
  inputMaxLength,
  inputName,
  inputOnChange,
  inputPlaceHolder,
  inputSize,
  inputType,
  inputValue,
  inputWeight,
  inputWidth,
  padRight,
  textColor,
  textSize,
  textValue,
  textWeight,
}: TextInputProps) {
  return (
    <StyledWrapper>
      <Text fontColor={textColor} fontSize={textSize} fontWeight={textWeight}>
        {textValue}
      </Text>
      <StyledBlank padRight={padRight} />
      <Input
        borderRadius={inputBorderRadius}
        customStyle={inputCustomStyle}
        disabled={inputDisabled}
        fontSize={inputSize}
        fontWeight={inputWeight}
        height={inputHeight}
        logoImg={inputImage}
        maxLength={inputMaxLength}
        name={inputName}
        onChange={inputOnChange}
        placeholder={inputPlaceHolder}
        type={inputType}
        value={inputValue}
        width={inputWidth}
      />
    </StyledWrapper>
  );
}

interface StyledBlankProps {
  padRight?: number;
}

interface TextInputProps extends StyledBlankProps {
  inputBorderRadius: number;
  inputCustomStyle?: string;
  inputDisabled: boolean;
  inputHeight?: number;
  inputImage?: string;
  inputMaxLength?: number;
  inputName: string;
  inputOnChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  inputPlaceHolder: string;
  inputSize: number;
  inputType?: string;
  inputValue: string;
  inputWeight: number | string;
  inputWidth: number;
  textColor: string;
  textSize: number;
  textValue: string;
  textWeight: string;
}

TextInput.defaultProps = {
  inputBorderRadius: 0,
  inputDisabled: false,
  inputPlaceHolder: '',
  inputSize: 1,
  inputType: 'input',
  inputWeight: 700,
  inputWidth: 7,
  textColor: Colors.gray9,
  textSize: 1,
  textWeight: 600,
};

export default TextInput;
