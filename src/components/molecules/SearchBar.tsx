import React from 'react';
import styled from 'styled-components';

import { Button, Input } from 'components/atoms';
import useInputForm from 'hooks/useInputForm';
import { COLORS } from 'utils/color';

import searchIcon from 'images/icon-search.png';

const StyledWrapper = styled.div`
`;

const StyledInput = styled.span`
    padding-right: 0.3rem;
`;

const StyledButton = styled.span`
    padding-left: 0.3rem;
`;

function SearchBar({
  inputWidth,
  inputHeight,
  buttonWidth,
  buttonHeight,
  buttonColor,
  borderColor,
  borderWidth,
  search,
  onChange,
  onClickSearch,
}: SearchBarProps) {

  return (
    <StyledWrapper>
      <StyledInput>
        <Input
          value={search!}
          name={'search'}
          placeholder={'이름 및 계정'}
          width={inputWidth}
          height={inputHeight}
          borderColor={borderColor}
          borderWidth={borderWidth}
          textAlign={1}
          fontSize={0.87}
          image={searchIcon}
          onChange={onChange}
        ></Input>
      </StyledInput>
      <StyledButton>
        <Button width={buttonWidth} height={buttonHeight} bgColor={buttonColor} onClick={onClickSearch}>
          검색
        </Button>
      </StyledButton>
    </StyledWrapper>
  );
}

interface SearchBarProps {
  inputWidth?: number;
  inputHeight?: number;
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
  inputWidth: 10.6,
  inputHeight: 1.4,
  buttonWidth: 4.3,
  buttonHeight: 1.6,
  buttonColor: COLORS.dark_gray1,
  borderColor: COLORS.dark_gray4,
  borderWidth: 0.06,
};

export default SearchBar;
