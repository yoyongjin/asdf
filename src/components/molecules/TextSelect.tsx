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
  textValue,
  textWeight,
  selectWidth,
  selectHeight,
  selectRadius,
  defaultValue,
  list,
  name,
  textColor,
  onChange,
}: TextSelectProps) {
  return (
    <StyledWrapper>
      <Text fontSize={13} fontWeight={textWeight} fontColor={textColor}>
        {textValue}
      </Text>
      <StyledBlank />
      <Select
        width={selectWidth}
        height={selectHeight}
        borderWidth={0}
        borderRadius={selectRadius}
        options={list}
        name={name}
        defaultValue={defaultValue}
        fontColor={textColor}
        onChange={(e) => onChange(e)}
      />
    </StyledWrapper>
  );
}

interface TextSelectProps {
  textValue: string;
  selectWidth: number;
  selectRadius: number;
  textColor: string;
  textWeight: number | string;
  selectHeight: number;
  defaultValue?: number;
  list: Array<SelectDataType>;
  name: string;
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
}

interface SelectDataType {
  id: number;
  data: string;
}

TextSelect.defaultProps = {
  selectWidth: 100,
  selectHeight: 30,
  selectRadius: 0,
  textColor: Colors.gray9,
  textWeight: 700,
  defaultValue: '기본값',
};

export default TextSelect;
