import React from 'react';
import styled from 'styled-components';

import { Button, Image, Text } from 'components/atoms';
import { COLORS } from 'utils/color';
import { getYYYYMMDD, getHourMinSecV2 } from 'utils/utils';

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
  padding-right: 14px;
`;

const StyledLoginTime = styled.span`
  /* Position */
  position: relative;
`;

const StyledLogout = styled.span`
  /* Display */
  padding-left: 16px;
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
  loginTime,
  loginTimeImage,
  userName,
  onClickLogout,
}: UserLogProps) {
  return (
    <StyledWrapper>
      <StyledUser>
        <Text
          fontColor={COLORS.white}
          fontWeight={700}
          fontSize={0.81}
        >{`${userName} 님`}</Text>
      </StyledUser>
      <StyledLoginTime>
        <Image
          src={loginTimeImage}
          alt={'Login time background image'}
          width={11.88}
          height={1.43}
        />
        <StyledText>
          <Text
            fontColor={COLORS.green}
            fontSize={0.75}
            fontWeight={700}
          >{`${getYYYYMMDD(loginTime)} ${getHourMinSecV2(loginTime)}`}</Text>
        </StyledText>
      </StyledLoginTime>
      <StyledLogout>
        <Button bgColor={'inherit'} width={5} onClick={onClickLogout}>
          <Text fontSize={0.81} fontColor={COLORS.white} fontWeight={700}>
            로그아웃
          </Text>
        </Button>
      </StyledLogout>
    </StyledWrapper>
  );
}

interface UserLogProps {
  loginTime: number;
  loginTimeImage: string;
  userName: string;
  onClickLogout: () => void;
}

export default React.memo(UserLog);
