import React from 'react';
import styled from 'styled-components';

import { Text, Select } from 'components/atoms';
import { COLORS } from 'utils/color';

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
  selectRadius,
  defaultValue,
  // defaultOption,
  list,
  name,
  // selected,
  onChange,
}: TextSelectProps) {
  return (
    <StyledWrapper>
      <Text fontSize={13} fontWeight={textWeight}>
        {textValue}
      </Text>
      <StyledBlank />
      <Select
        width={selectWidth}
        borderWidth={0}
        borderRadius={selectRadius}
        options={list}
        name={name}
        defaultValue={defaultValue}
        // defaultOption={defaultOption}
        onChange={onChange}
        // selected={selected}
      ></Select>
    </StyledWrapper>
  );
}

interface TextSelectProps {
  textValue: string;
  selectWidth: number;
  selectRadius: number;
  textColor: string;
  textWeight: number | string;
  defaultValue?: number;
  // defaultOption?: string;
  list: Array<SelectDataType>;
  name: string;
  // selected: string;
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
}

interface SelectDataType {
  id: number;
  data: string;
}

TextSelect.defaultProps = {
  selectWidth: 7,
  selectRadius: 0,
  textColor: COLORS.dark_gray6,
  textWeight: 600,
  defaultValue: '기본값',
};

export default TextSelect;
