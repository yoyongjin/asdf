import React, { useRef, useEffect, useCallback } from 'react';
import { RouteComponentProps } from 'react-router-dom';
import styled from 'styled-components';

import { Button, Input, Text } from 'components/atoms';
import { COLORS } from 'utils/color';
import useAuth from 'hooks/useAuth';
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

const formList: Array<FormListType> = [
  {
    id: 0,
    name: 'id',
    type: 'text',
  },
  {
    id: 1,
    name: 'password',
    type: 'password',
  },
];

function LoginForm({ history }: LoginFormProps) {
  const refId = useRef<HTMLInputElement>(null) as React.MutableRefObject<
    HTMLInputElement
  >;
  const refPassword = useRef<HTMLInputElement>(null) as React.MutableRefObject<
    HTMLInputElement
  >;
  const { onClickLogin } = useAuth();
  const { form, onChangeInput } = useInputForm({
    id: '',
    password: '',
  });

  const onKeyEvent = useCallback(
    (e: React.KeyboardEvent<HTMLInputElement>, name: string, value: string) => {
      if (e.keyCode === 13) {
        if (!value || value.trim() === '') return;

        if (name.indexOf('id') > -1) {
          refPassword!.current.focus();
        } else if (name.indexOf('password') > -1) {
          const id = form.id.trim();
          const password = form.password.trim();
          if (!id || !password) {
            alert('아이디와 패스워드를 정확히 입력해주세요.');
            return;
          }
          onClickLogin(id, password, history);
        }
      }
    },
    [refPassword, form.id, form.password, history, onClickLogin],
  );

  useEffect(() => {
    if (refId) {
      refId.current.focus();
    }
  }, [refId]);

  return (
    <StyledWrapper>
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
      {formList.map((values, i) => {
        return (
          <StyledInput key={`styled-loginform-${i}`}>
            <Input
              key={`loginform-${i}`}
              innerRef={
                values.id === 0 ? refId : values.id === 1 ? refPassword : null
              }
              name={values.name}
              placeholder={
                values.id === 0
                  ? '아이디를 입력하세요.'
                  : values.id === 1
                  ? '비밀번호를 입력하세요.'
                  : ''
              }
              type={values.type}
              value={
                values.id === 0 ? form.id : values.id === 1 ? form.password : ''
              }
              borderColor={COLORS.dark_green}
              fontFamily={'NanumBarunGothic'}
              fontSize={0.88}
              height={2}
              phColor={COLORS.green}
              width={13.31}
              onChange={onChangeInput}
              onKeyDown={(e) => {
                let value = '';
                if (values.id === 0) {
                  value = form.id.trim();
                } else if (values.id === 1) {
                  value = form.password.trim();
                }
                if (!value) return;
                onKeyEvent(e, values.name, value);
              }}
            />
          </StyledInput>
        );
      })}
      <StyledLogin>
        <Button
          bgColor={COLORS.dark_green}
          height={2}
          width={13.3}
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

interface FormListType {
  id: number;
  name: string;
  type: string;
}

interface LoginFormProps extends RouteComponentProps {}

export default LoginForm;
