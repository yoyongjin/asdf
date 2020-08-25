import React from 'react';
import styled from 'styled-components';

import { Button, Image, Text } from 'components/atoms';
import { COLORS } from 'utils/color';
import {
  getYYYYMMDD,
  getHourMinSecV2,
  getDiffTime,
  getTime,
} from 'utils/utils';

const StyledWrapper = styled.div`
  /* Display */
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: flex-end;
`;

const StyledUser = styled.span`
  /* Display */
  padding-right: 0.5rem;
`;

const StyledLoginTime = styled.span`
  /* Position */
  position: relative;

  /* Display */
  /* padding-left: 0.5rem; */
  /* padding-right: 1rem; */
`;

const StyledLogout = styled.span`
  /* Display */
  padding-left: 1rem;
`;

const StyledText = styled.span`
  /* Display */
  width: 100%;
  height: 100%;

  /* Position */
  position: absolute;
  top: 55%;
  left: 70%;
  transform: translate(-50%, -50%);
`;

function UserLog({
  userName,
  loginTime,
  loginTimeImage,
  onClickLogout,
}: UserLogProps) {
  return (
    <StyledWrapper>
      <StyledUser>
        <Text
          fontColor={COLORS.white}
          fontWeight={700}
          fontSize={0.81}
          fontFamily={'NanumGothic'}
        >{`${userName} 님`}</Text>
      </StyledUser>
      <StyledLoginTime>
        <Image
          src={loginTimeImage}
          alt={loginTimeImage}
          width={11.8}
          height={1.43}
        />
        <StyledText>
          <Text
            fontColor={COLORS.green}
            fontSize={0.75}
            fontWeight={700}
            fontFamily={'NanumGothic'}
          >{`${getYYYYMMDD(loginTime)} ${getHourMinSecV2(loginTime)}`}</Text>
        </StyledText>
      </StyledLoginTime>
      <StyledLogout>
        <Button
          bgColor={'inherit'}
          width={5}
          fontSize={0.81}
          onClick={onClickLogout}
        >
          로그아웃
        </Button>
      </StyledLogout>
    </StyledWrapper>
  );
}

interface UserLogProps {
  userName: string;
  loginTime: number;
  loginTimeImage: string;
  onClickLogout: () => void;
}

export default UserLog;
