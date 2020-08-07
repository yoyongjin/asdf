import React from 'react';
import styled from 'styled-components';

import { Button, Select, Text } from 'components/atoms';
import { SearchBar } from 'components/molecules';
import { COLORS } from 'utils/color';

const StyledWrapper = styled.div`
  /* Display */
  height: 100%;
  border-bottom: 0.05rem solid ${COLORS.green};
`;

const StyledLeft = styled.span`
  height: 100%;
  display: flex;
  align-items: center;
  float: left;
`;

const StyledRight = styled.div`
  height: 100%;
  display: flex;
  align-items: center;
  float: right;
`;

const StyleTitle = styled.div`
  padding-right: 0.5rem;
`;

const StyledButton = styled.div`
  padding-left: 0.5rem;
  padding-right: 0.5rem;
`;

const StyledExplanation = styled.div`
  padding-left: 0.5rem;
`;

const StyledSelect = styled.div`
  padding-left: 0.5rem;
`;

const StyledSearch = styled.div`
  padding-left: 0.5rem;
`;

function Title({
  buttonType,
  explanType,
  selectType,
  isSearch,
  children,
}: TitleProps) {
  return (
    <StyledWrapper>
      <StyledLeft>
        <StyleTitle>
          <Text fontSize={1.12} fontWeight={600} fontColor={COLORS.green}>
            {children}
          </Text>
        </StyleTitle>
        {buttonType ? (
          <StyledButton>
            <Button
              width={7.3}
              height={2}
              bgColor={COLORS.green}
              onClick={buttonType.onClick}
            >
              <Text fontSize={0.87} fontWeight={600} fontColor={COLORS.white}>
                {buttonType.title}
              </Text>
            </Button>
          </StyledButton>
        ) : null}
        {explanType ? (
          <StyledExplanation>
            <Text
              fontColor={COLORS.dark_gray3}
              fontSize={0.87}
            >
              {explanType.title}
            </Text>
          </StyledExplanation>
        ) : null}
      </StyledLeft>
      <StyledRight>
        {selectType?.data?.map((select) => {
          return (
            <StyledSelect key={`styled-select-${select.id}`}>
              <Select
                key={`select-${select.id}`}
                options={select.option}
                borderColor={selectType.color}
                borderRadius={selectType.borderRadius}
                fontColor={selectType.color}
              />
            </StyledSelect>
          );
        })}
        {isSearch ? (
          <StyledSearch>
            <SearchBar></SearchBar>
          </StyledSearch>
        ) : null}
      </StyledRight>
    </StyledWrapper>
  );
}

interface buttonType {
  title: string;
  onClick?: () => void;
}

interface explanType {
  title: string;
}

interface optionType {
  id: number;
  option: string[];
}

interface selectType {
  color?: string;
  borderRadius?: number;
  data: optionType[];
}

interface TitleProps {
  buttonType?: buttonType;
  explanType?: explanType;
  selectType?: selectType;
  isSearch?: boolean;
  children: string;
}

Title.defaultProps = {};

export default Title;
