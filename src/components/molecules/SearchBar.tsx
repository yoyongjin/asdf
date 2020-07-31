import React, { useState } from 'react';
import styled from 'styled-components';

import { Button, Input } from 'components/atoms';

const StyledWrapper = styled.div`
`;

const StyledInput = styled.span`
    padding-right: 0.5rem;
`;

const StyledButton = styled.span`
    
    padding-left: 0.5rem;
`;

function SearchBar({
  inputWidth,
  inputHeight,
  buttonWidth,
  buttonHeight,
}: SearchBarProps) {
  const [input, setInput] = useState('');
  const onChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setInput(e.target.value);
  };

  return (
    <StyledWrapper>
      <StyledInput>
        <Input
          value={input}
          placeholder={'이름 및 계정'}
          height={inputHeight}
          onChange={onChange}
        ></Input>
      </StyledInput>
      <StyledButton>
        <Button width={buttonWidth} height={buttonHeight}>
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
}

SearchBar.defaultProps = {
  inputHeight: 1.6,
  buttonWidth: 5,
  buttonHeight: 1.7,
};

export default SearchBar;
