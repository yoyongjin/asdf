import React from 'react';
import styled from 'styled-components';

import { Button } from 'components/atoms';
import { Title, TextInput, TextSelect } from 'components/molecules';
import { COLORS } from 'utils/color';

const StyledWrapper = styled.div`
  width: 100%;
  height: 100%;
`;

const StyledTitle = styled.div`
  width: 100%;
  height: 10%;
`;

const StyledContent = styled.div`
  width: 100%;
  min-height: 10rem;
  /* height: 80%; */
  /* max-height: 30rem; */
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  /* align-content: space-around; */
  border-bottom: 0.05rem solid ${COLORS.green};

  padding-top: 1rem;
  padding-bottom: 1rem;
`;

const StyledFooter = styled.div`
  width: 100%;
  height: 10%;
  padding-top: 1rem;
`;

function UserInfo({ onClickVisible }: UserInfoProps) {
  return (
    <StyledWrapper>
      <StyledTitle>
        <Title>사용자 정보</Title>
      </StyledTitle>
      <StyledContent>
        <TextSelect textValue={'지점명'}></TextSelect>
        <TextSelect textValue={'팀명'}></TextSelect>
        <TextSelect textValue={'권한'}></TextSelect>
        <TextInput textValue={'이름'}></TextInput>
        <TextInput textValue={'아이디'}></TextInput>
        <TextInput textValue={'비밀번호'}></TextInput>
        <TextInput textValue={'전화번호'}></TextInput>
        <TextInput textValue={'ZiBox IP 직접 입력하기'}></TextInput>
      </StyledContent>
      <StyledFooter>
        <Button
          width={6}
          height={1.8}
          bgColor={COLORS.dark_gray1}
          onClick={onClickVisible}
        >
          취소
        </Button>
        <Button width={6} height={1.8} bgColor={COLORS.green}>
          저장
        </Button>
      </StyledFooter>
    </StyledWrapper>
  );
}

interface UserInfoProps {
  onClickVisible: () => void;
}

UserInfo.defaultProps = {};

export default UserInfo;
