import React, { useRef, useEffect } from 'react';
import { RouteComponentProps } from 'react-router-dom';
import styled from 'styled-components';

import { Button, Input, Text } from 'components/atoms';
import { COLORS } from 'utils/color';
import useInputForm from 'hooks/useInputForm';

const StyledWrapper = styled.div`
  /* Display */
  width: 25rem;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const StyledTitle = styled.div`
  /* Display */
  padding-bottom: 1.8rem;
`;

const StyledInputId = styled.div`
  /* Display */
  padding-bottom: 0.5rem;
`;

const StyledInputPassword = styled.div`
  /* Display */
  padding-bottom: 0.7rem;
`;

const StyledLogin = styled.div``;

function LoginForm({ history }: LoginFormProps) {
  const { form, onChange, onClickLogin } = useInputForm({
    id: '',
    password: '',
  });
  const idRef = useRef<HTMLInputElement>(null) as React.MutableRefObject<
    HTMLInputElement
  >;
  const pwRef = useRef<HTMLInputElement>(null) as React.MutableRefObject<
    HTMLInputElement
  >;
  const { id, password }: formType = form;

  useEffect(() => {
    if(idRef){
      idRef.current.focus();
    }
  }, [idRef]);

  return (
    <StyledWrapper>
      <StyledTitle>
        <Text fontSize={1.5} fontColor={COLORS.white}>
          로그인
        </Text>
      </StyledTitle>
      <StyledInputId>
        <Input
          innerRef={idRef}
          value={id}
          name={'id'}
          placeholder={'아이디를 입력하세요.'}
          width={13.3}
          height={2}
          fontSize={0.8}
          borderColor={COLORS.dark_green}
          phColor={COLORS.green}
          onChange={onChange}
        />
      </StyledInputId>
      <StyledInputPassword>
        <Input
          innerRef={pwRef}
          type={'password'}
          value={password}
          name={'password'}
          placeholder={'비밀번호를 입력하세요.'}
          width={13.3}
          height={2}
          fontSize={0.8}
          borderColor={COLORS.dark_green}
          phColor={COLORS.green}
          onChange={onChange}
        />
      </StyledInputPassword>
      <StyledLogin>
        <Button
          bgColor={COLORS.dark_green}
          width={13.3}
          height={2}
          onClick={() => onClickLogin(id, password, history)}
        >
          <Text fontSize={0.8} fontColor={COLORS.white}>
            로그인
          </Text>
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

interface LoginFormProps {}

export default LoginForm;
