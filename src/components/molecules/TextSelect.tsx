import React from 'react';
import styled from 'styled-components';

import { Text, Select } from 'components/atoms';
import { Colors } from 'utils/color';

const StyledWrapper = styled.div`
  padding-bottom: 20px;
  min-width: 170px;
`;
const StyledBlank = styled.span`
  padding-left: 0.5rem;
  padding-right: 0.5rem;
`;

function TextSelect({
  selectBorderWidth,
  selectDisabled,
  selectDefaultValue,
  selectHeight,
  selectName,
  selectOnChange,
  selectOptions,
  selectBorderRadius,
  selectWidth,
  textColor,
  textSize,
  textValue,
  textWeight,
}: TextSelectProps) {
  return (
    <StyledWrapper>
      <Text fontColor={textColor} fontSize={textSize} fontWeight={textWeight}>
        {textValue}
      </Text>
      <StyledBlank />
      <Select
        borderRadius={selectBorderRadius}
        borderWidth={selectBorderWidth}
        disabled={selectDisabled}
        defaultValue={selectDefaultValue}
        fontColor={textColor}
        height={selectHeight}
        name={selectName}
        onChange={selectOnChange}
        options={selectOptions}
        width={selectWidth}
      />
    </StyledWrapper>
  );
}

interface TextSelectProps {
  selectBorderRadius: number;
  selectBorderWidth: number;
  selectDisabled: boolean;
  selectDefaultValue?: number;
  selectHeight: number;
  selectName: string;
  selectOnChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  selectOptions: Array<SelectDataType>;
  selectWidth: number;
  textColor: string;
  textSize: number;
  textValue: string;
  textWeight: number | string;
}

interface SelectDataType {
  id: number;
  data: string;
}

TextSelect.defaultProps = {
  selectBorderRadius: 0,
  selectBorderWidth: 0,
  selectDisabled: false,
  selectDefaultValue: '기본값',
  selectHeight: 30,
  selectWidth: 100,
  textColor: Colors.gray9,
  textWeight: 700,
};

export default TextSelect;
