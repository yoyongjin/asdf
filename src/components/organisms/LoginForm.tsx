import React, { useState } from 'react';
import styled from 'styled-components';

import { Button, Input, Text } from 'components/atoms';
import { COLORS } from 'utils/color';

const StyledWrapper = styled.div`
  /* Display */
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const StyledTitle = styled.div`
  /* Display */
  padding-bottom: 2rem;
`;

const StyledInputId = styled.div`
  /* Display */
  padding-bottom: 0.5rem;
`;

const StyledInputPassword = styled.div`
  /* Display */
  padding-bottom: 1.5rem;
`;

const StyledLogin = styled.div``;

function LoginForm() {
  const [id, setId] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  const onClickLogin = () => {
    alert('로그인 구현 예정');
  };

  const onChangeId = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setId(e.target.value);
  };

  const onChangePassword = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setPassword(e.target.value);
  };

  return (
    <StyledWrapper>
      <StyledTitle>
        <Text fontSize={1.8} fontColor={COLORS.white}>
          로그인
        </Text>
      </StyledTitle>
      <StyledInputId>
        <Input
          value={id}
          phColor={COLORS.green}
          placeholder={'아이디를 입력하세요.'}
          onChange={onChangeId}
        ></Input>
      </StyledInputId>
      <StyledInputPassword>
        <Input
          type={'password'}
          value={password}
          phColor={COLORS.green}
          placeholder={'비밀번호를 입력하세요.'}
          onChange={onChangePassword}
        ></Input>
      </StyledInputPassword>
      <StyledLogin>
        <Button bgColor={COLORS.dark_green} onClick={onClickLogin}>
          로그인
        </Button>
      </StyledLogin>
    </StyledWrapper>
  );
}

// interface LoginFormProps {
//   onClick: () => void;
// }

export default LoginForm;
