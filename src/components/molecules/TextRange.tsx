import React from 'react';
import styled from 'styled-components';

import { Text, Range } from 'components/atoms';
import { Colors } from 'utils/color';

const StyledWrapper = styled.div<StyledWrapperProps>`
  line-height: 1.5;
  padding-bottom: ${(props) => (props.isPaddingBottom ? 20 : 0)}px;
`;

const StyledWhiteSpace = styled.span<StyledWhiteSpaceProps>`
  padding-left: ${(props) => props.pixel}px;
  padding-right: ${(props) => props.pixel}px; ;
`;

function TextRange({
  isPaddingBottom,
  rangeDisable,
  rangeMax,
  rangeMin,
  rangeName,
  rangeStep,
  rangeValue,
  onChangeRange,
  textColor,
  textFamily,
  textSize,
  textValue,
  textWeight,
}: TextInputProps) {
  return (
    <StyledWrapper isPaddingBottom={isPaddingBottom}>
      <Text
        fontColor={textColor}
        fontFamily={textFamily}
        fontSize={textSize}
        fontWeight={textWeight}
      >
        {`${textValue}(${rangeValue})`}
      </Text>
      <StyledWhiteSpace pixel={5} />
      <Range
        disabled={rangeDisable}
        max={rangeMax}
        min={rangeMin}
        name={rangeName}
        onChange={onChangeRange}
        step={rangeStep}
        value={rangeValue}
      />
      <StyledWhiteSpace pixel={5} />
    </StyledWrapper>
  );
}

interface StyledWrapperProps {
  isPaddingBottom: boolean;
}

interface StyledWhiteSpaceProps {
  pixel: number;
}

interface TextInputProps extends StyledWrapperProps {
  rangeDisable: boolean;
  rangeMax: number;
  rangeMin: number;
  rangeName: string;
  rangeStep: number;
  rangeValue: string;
  textColor: string;
  textFamily: string;
  textSize: number;
  textValue: string;
  textWeight: number;
  onChangeRange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

TextRange.defaultProps = {
  isPaddingBottom: false,
  textColor: Colors.gray9,
  textSize: 14,
  textFamily: 'inherit',
  textValue: '',
  textWeight: 700,
  rangeDisable: false,
  rangeMax: 60,
  rangeMin: 0,
  rangeStep: 1,
};

export default TextRange;
