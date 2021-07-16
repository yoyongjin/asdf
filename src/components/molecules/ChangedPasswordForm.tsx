import React, { useCallback } from 'react';
import styled from 'styled-components';

import { Button, Input, Text } from 'components/atoms';
import { Colors } from 'utils/color';
import Title from './Title';
import useInputForm from 'hooks/useInputForm';
import useAuth from 'hooks/useAuth';
import { REG_EXR } from 'utils/constants';

const StyledWrapper = styled.div`
  height: 100%;
  width: 100%;
`;

const StyledTitle = styled.div`
  /* Display */
  height: 3rem;
`;

const StyledContent = styled.div`
  height: calc(100% - 3rem);
`;

const StyledInputArea = styled.div`
  height: 61px;
  padding-left: 12px;
  display: flex;
  align-items: center;

  border-bottom: 1px solid ${Colors.gray12};
`;

const StyledTest = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 30px;
`;

const StyledBlankArea = styled.span<StyledBlankAreaProps>`
  width: ${(props) => props.width}px;
`;

const passwordList = [
  {
    id: 0,
    name: 'current_password',
    text: '현재 비밀번호',
    width: 75,
  },
  {
    id: 1,
    name: 'new_password',
    text: '새 비밀번호',
    width: 88,
  },
  {
    id: 2,
    name: 'new_confirm_password',
    text: '새 비밀번호 확인',
    width: 60,
  },
];

function ChangedPasswordForm() {
  const { onClickChangePassword } = useAuth();
  const { form, onChangeInput } = useInputForm({
    current_password: '',
    new_password: '',
    new_confirm_password: '',
  });

  const validateForm = useCallback(() => {
    const newPW = form.new_password;
    const confirmPW = form.new_confirm_password;

    if (newPW !== confirmPW) {
      alert('변경하는 비밀번호가 일치하지 않습니다.');

      return false;
    }

    if (!REG_EXR.password.test(newPW) || !REG_EXR.password.test(confirmPW)) {
      alert('8자리 이상 32자리 이하, 영어/숫자/특수문자가 포함되어야 합니다.');

      return false;
    }

    return true;
  }, [form.new_confirm_password, form.new_password]);

  return (
    <StyledWrapper>
      <StyledTitle>
        <Title
          bottomLineColor={Colors.gray11}
          bottomLinePixel={2}
          titleFontColor={Colors.gray11}
          titleFontFamily="NanumGothic"
          titleFontSize={24}
          titleFontWeight={400}
        >
          ZMS 비밀번호 변경
        </Title>
      </StyledTitle>
      <StyledContent>
        {passwordList.map((values) => {
          return (
            <StyledInputArea>
              <Text
                fontColor={Colors.gray11}
                fontFamily="NanumBarunGothic"
                fontSize={14}
              >
                {values.text}
              </Text>
              <StyledBlankArea width={values.width} />
              <Input
                borderRadius={0}
                fontFamily="NanumBarunGothic"
                fontSize={13}
                height={3.2}
                name={values.name}
                onChange={onChangeInput}
                value={
                  values.name === 'current_password'
                    ? form.current_password
                    : values.name === 'new_password'
                    ? form.new_password
                    : values.name === 'new_confirm_password'
                    ? form.new_confirm_password
                    : ''
                }
                width={20}
              />
            </StyledInputArea>
          );
        })}
        <StyledTest>
          <Button
            bgColor={Colors.blue7}
            borderRadius={18}
            height={3.6}
            onClick={(e) => {
              const isSuccess = validateForm();

              if (isSuccess) {
                onClickChangePassword(
                  form.current_password,
                  form.new_password,
                  form.new_confirm_password,
                );
              }
            }}
            width={15.7}
          >
            <Text fontColor={Colors.white} fontSize={14} fontWeight={800}>
              변경하기
            </Text>
          </Button>
        </StyledTest>
      </StyledContent>
    </StyledWrapper>
  );
}

interface StyledBlankAreaProps {
  width: number;
}

export default ChangedPasswordForm;
