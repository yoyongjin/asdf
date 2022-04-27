import React, { useRef, useEffect, useCallback } from 'react';
import styled from 'styled-components';

import { Button, Input, Text } from 'components/atoms';
import useAuth from 'hooks/useAuth';
import useInputForm from 'hooks/useInputForm';
import { Colors } from 'utils/color';
import constants, { COMPANY_TYPE } from 'utils/constants';
import Toast from 'utils/toast';

const StyledWrapper = styled.div`
  /* Display */
  align-items: center;
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 25rem;

  /* Position */
  margin: 0 auto;
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

function LoginForm() {
  const idInput =
    useRef<HTMLInputElement>() as React.MutableRefObject<HTMLInputElement>;
  const passwordInput =
    useRef<HTMLInputElement>() as React.MutableRefObject<HTMLInputElement>;

  const { onClickLogin } = useAuth();
  const { form, onChangeInput } = useInputForm({
    id: '',
    password: '',
  });

  const onKeyBoardEvent = useCallback(
    (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (e.keyCode === 13) {
        // enter
        const { name, value } = e.currentTarget;

        if (!value || (value && value.trim().length < 1)) {
          return;
        }

        const id = idInput.current.value;
        const password = passwordInput.current.value;

        switch (name) {
          case 'id':
            if (id) {
              if (password) {
                // 아이디 / 비밀번호 전부 다 있을 경우
                onClickLogin(id, password);

                return;
              }
              // 아이디만 적혀져 있는 경우
              passwordInput.current!.focus();
            }

            break;
          case 'password':
            if (!id || !password) {
              Toast.warning('아이디와 패스워드를 정확히 입력해주세요.🙄');
              return;
            }

            onClickLogin(id, password);
        }
      }
    },
    [onClickLogin, idInput, passwordInput],
  );

  useEffect(() => {
    idInput.current!.focus();
  }, [idInput]);

  return (
    <StyledWrapper>
      {constants.COMPANY === COMPANY_TYPE.DBLIFE ? (
        <StyledTitle>
          <Text
            fontColor={Colors.white}
            fontFamily="NanumBarunGothic"
            fontSize={24}
            fontWeight={600}
            lineHeight={0.23}
          >
            로그인
          </Text>
        </StyledTitle>
      ) : null}
      <StyledInput>
        <Input
          height={3.2}
          innerRef={idInput}
          borderColor={Colors.blue6}
          name="id"
          placeholder="아이디를 입력하세요."
          value={form.id}
          width={24}
          fontFamily="NanumBarunGothic"
          fontSize={14}
          phColor={
            constants.COMPANY === COMPANY_TYPE.DBLIFE
              ? Colors.green1
              : Colors.blue6
          }
          onChange={onChangeInput}
          onKeyDown={onKeyBoardEvent}
        />
      </StyledInput>
      <StyledInput>
        <Input
          height={3.2}
          innerRef={passwordInput}
          borderColor={Colors.blue6}
          name="password"
          placeholder="비밀번호를 입력하세요."
          type="password"
          value={form.password}
          width={24}
          fontFamily="NanumBarunGothic"
          fontSize={14}
          phColor={
            constants.COMPANY === COMPANY_TYPE.DBLIFE
              ? Colors.green1
              : Colors.blue6
          }
          onChange={onChangeInput}
          onKeyDown={onKeyBoardEvent}
        />
      </StyledInput>
      <StyledLogin>
        <Button
          height={3.2}
          width={24}
          onClick={() => onClickLogin(form.id, form.password)}
        >
          <Text
            fontColor={Colors.white}
            fontSize={14}
            fontFamily="NanumBarunGothic"
          >
            로그인
          </Text>
        </Button>
      </StyledLogin>
    </StyledWrapper>
  );
}

export default LoginForm;
