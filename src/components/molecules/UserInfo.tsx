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
  height: 40px;
`;

const StyledContent = styled.div`
  width: 100%;
  height: 382px;
  /* height: 80%; */
  /* max-height: 30rem; */
  display: flex;
  flex-wrap: wrap;
  align-items: stretch;
  justify-content: space-between;
  align-content: flex-start;
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

const ValueList = ['이름' , '아이디' , '비밀번호', '전화번호' , 'Zibox IP 직접 입력하기'];

function UserInfo({ onClickVisible }: UserInfoProps) {
  return (
    <StyledWrapper>
      <StyledTitle>
        <Title fontSize={18}>사용자 정보</Title>
      </StyledTitle>
      <StyledContent>
        <TextSelect textValue={'지점명'}></TextSelect>
        <TextSelect textValue={'팀명'}></TextSelect>
        <TextSelect textValue={'권한'}></TextSelect>
        {
          ValueList.map((data , index) => {
              return (
                <TextInput customStyle={`float:right;`} padRight={index == 3 ? 2 : 0} height={22.5} textValue={data}></TextInput>
              )
          })
        }
      </StyledContent>
      <StyledFooter>
        <Button width={6} height={1.8} bgColor={COLORS.green} customStyle={`
            float:right;
          `}>
          저장
        </Button>
        <Button
          width={6}
          height={1.8}
          bgColor={COLORS.dark_gray1}
          onClick={onClickVisible}
          customStyle={`
            float:right;
            margin-right: 10px;
          `}
        >
          취소
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
