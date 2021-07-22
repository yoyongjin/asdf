import React, { useCallback } from 'react';
import styled from 'styled-components';

import { Button, Input, Text } from 'components/atoms';
import { Colors } from 'utils/color';

import searchIcon from 'images/icon-search.png';

const StyledWrapper = styled.div``;

const StyledInput = styled.span`
  padding-right: 5px;
`;

const StyledButton = styled.span`
  padding-left: 5px;
`;

function SearchBar({
  inputWidth,
  inputHeight,
  inputPlaceHolder,
  buttonWidth,
  buttonHeight,
  buttonColor,
  borderColor,
  borderWidth,
  search,
  onChange,
  onClickSearch,
}: SearchBarProps) {
  const onKeyPress = useCallback(
    (e) => {
      if (e.keyCode === 13) {
        onClickSearch!();
      }
    },
    [onClickSearch],
  );

  return (
    <StyledWrapper>
      <StyledInput>
        <Input
          value={search!}
          name="search"
          placeholder={inputPlaceHolder}
          width={inputWidth}
          height={inputHeight}
          borderColor={borderColor}
          borderWidth={borderWidth}
          fontSize={14}
          textAlign={1}
          logoImg={searchIcon}
          onChange={onChange}
          onKeyDown={onKeyPress}
        />
      </StyledInput>
      <StyledButton>
        <Button
          width={buttonWidth}
          height={buttonHeight}
          bgColor={buttonColor}
          onClick={onClickSearch}
        >
          <Text
            fontColor={Colors.white}
            fontSize={14}
            fontFamily="NanumBarunGothic"
            fontWeight={700}
          >
            검색
          </Text>
        </Button>
      </StyledButton>
    </StyledWrapper>
  );
}

interface SearchBarProps {
  inputWidth: number;
  inputHeight: number;
  inputPlaceHolder: string;
  buttonWidth?: number;
  buttonHeight?: number;
  buttonColor?: string;
  borderColor?: string;
  borderWidth?: number;
  search: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onClickSearch?: () => void;
}

SearchBar.defaultProps = {
  inputWidth: 17,
  inputHeight: 2.5,
  inputPlaceHolder: '이름 및 계정',
  buttonWidth: 7,
  buttonHeight: 2.6,
  buttonColor: Colors.gray4,
  borderColor: Colors.gray7,
  borderWidth: 1,
};

export default React.memo(SearchBar);
