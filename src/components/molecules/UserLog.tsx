import React from 'react';
import styled from 'styled-components';

import { Button, Image, Text } from 'components/atoms';
import { COLORS } from 'utils/color';
import { getYYYYMMDD, getHourMinSec } from 'utils/utils';

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
  padding-left: 0.5rem;
  padding-right: 1rem;
`;

const StyledLogout = styled.span`
  /* Display */
  padding-left: 1rem;
`;

const StyledTest = styled.span`
  /* Position */
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;

function UserLog({ userInfo, loginTime, onClickLogout }: UserLogProps) {
  return (
    <StyledWrapper>
      <StyledUser>
        <Text
          fontSize={1.3}
          fontColor={COLORS.white}
        >{`${userInfo.user_name} 님`}</Text>
      </StyledUser>
      <StyledLoginTime>
        <Image src={loginTime} alt={loginTime} width={16} height={1.8} />
        <StyledTest>
          <Text fontColor={COLORS.green}>{`${getYYYYMMDD(
            userInfo.login_at,
          )} ${getHourMinSec(userInfo.login_at)}`}</Text>
        </StyledTest>
      </StyledLoginTime>
      <StyledLogout>
        <Button
          bgColor={'inherit'}
          width={5}
          fontSize={1.3}
          onClick={onClickLogout}
        >
          로그아웃
        </Button>
      </StyledLogout>
    </StyledWrapper>
  );
}

interface userInfo {
  user_name: string;
  login_at: number;
}

interface UserLogProps {
  userInfo: userInfo;
  loginTime: string;
  onClickLogout: () => void;
}

export default UserLog;
