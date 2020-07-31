import React from 'react';
import { RouteComponentProps } from 'react-router-dom';
import styled from 'styled-components';

import { Button, Input, Text } from 'components/atoms';
import { COLORS } from 'utils/color';
import useInput from 'hooks/useInput';

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

function LoginForm({ history }: LoginFormProps) {
  const { form, onChange, onClickLogin } = useInput({
    id: 'ADMIN_USER',
    password: 'ADMIN_PASS',
  });

  const { id, password }: formType = form;

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
          name={'id'}
          phColor={COLORS.green}
          placeholder={'아이디를 입력하세요.'}
          onChange={onChange}
        />
      </StyledInputId>
      <StyledInputPassword>
        <Input
          type={'password'}
          value={password}
          name={'password'}
          phColor={COLORS.green}
          placeholder={'비밀번호를 입력하세요.'}
          onChange={onChange}
        />
      </StyledInputPassword>
      <StyledLogin>
        <Button
          bgColor={COLORS.dark_green}
          onClick={() => onClickLogin(id, password, history)}
        >
          로그인
        </Button>
      </StyledLogin>
    </StyledWrapper>
  );
}
interface LoginFormProps extends RouteComponentProps {}

interface formType {
  id: string;
  password: string;
}

// interface LoginFormProps {
//   onClick: () => void;
// }

export default LoginForm;
