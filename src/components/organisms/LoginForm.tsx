import React, { useRef, useEffect, useCallback } from 'react';
import { RouteComponentProps } from 'react-router-dom';
import styled from 'styled-components';

import { Button, Input, Text } from 'components/atoms';
import { COLORS, Colors } from 'utils/color';
import useAuth from 'hooks/useAuth';
import useInputForm from 'hooks/useInputForm';

import constants, { COMPANY_TYPE } from 'utils/constants';

const StyledWrapper = styled.div`
  /* Display */
  width: 25rem;
  margin: 0 auto;
  /* height: 100%; */
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const StyledTitle = styled.div`
  /* Position */
  padding-bottom: 21px;
`;

const StyledInput = styled.div`
  /* Position */
  margin-top: 8px;
`;

const StyledLogin = styled.div`
  /* Position */
  padding-top: 12px;
`;

function LoginForm({ history }: LoginFormProps) {
  const idInput = useRef<HTMLInputElement>() as React.MutableRefObject<HTMLInputElement>;
  const passwordInput = useRef<HTMLInputElement>() as React.MutableRefObject<HTMLInputElement>;
  const { onClickLogin } = useAuth();
  const { form, onChangeInput } = useInputForm({
    id: '',
    password: '',
  });

  const onKeyEvent = useCallback(
    (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (e.keyCode === 13) {
        // enter
        const { name, value } = e.currentTarget;

        if (!value || value.trim() === '') return;

        switch (name) {
          case 'id':
            passwordInput.current!.focus();
            break;
          case 'password':
            const id = form.id;
            const password = form.password;

            if (!id || !password) {
              alert('아이디와 패스워드를 정확히 입력해주세요.');
              return;
            }

            onClickLogin(id, password, history);
        }
      }
    },
    [form.id, form.password, history, passwordInput, onClickLogin],
  );

  useEffect(() => {
    idInput.current!.focus();
  }, [idInput]);

  return (
    <StyledWrapper>
      {constants.COMPANY === COMPANY_TYPE.DBLIFE ? (
        <StyledTitle>
          <Text
            fontColor={COLORS.white}
            fontFamily={'NanumBarunGothic'}
            fontSize={1.5}
            fontWeight={600}
            lineHeight={0.23}
          >
            로그인
          </Text>
        </StyledTitle>
      ) : null}
      <StyledInput>
        <Input
          innerRef={idInput}
          name="id"
          placeholder="아이디를 입력하세요."
          value={form.id}
          fontFamily="NanumBarunGothic"
          fontSize={0.88}
          phColor={
            constants.COMPANY === COMPANY_TYPE.DBLIFE
              ? Colors.green1
              : Colors.blue6
          }
          width={15}
          onChange={onChangeInput}
          onKeyDown={onKeyEvent}
        />
      </StyledInput>
      <StyledInput>
        <Input
          innerRef={passwordInput}
          name="password"
          placeholder="비밀번호를 입력하세요."
          value={form.password}
          type="password"
          fontFamily="NanumBarunGothic"
          fontSize={0.88}
          phColor={
            constants.COMPANY === COMPANY_TYPE.DBLIFE
              ? Colors.green1
              : Colors.blue6
          }
          width={15}
          onChange={onChangeInput}
          onKeyDown={onKeyEvent}
        />
      </StyledInput>
      <StyledLogin>
        <Button
          height={2}
          width={15}
          onClick={() => onClickLogin(form.id, form.password, history)}
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

export default LoginForm;
