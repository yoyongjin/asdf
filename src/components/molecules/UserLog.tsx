import React from 'react';
import styled from 'styled-components';

import { Button, Image, Text } from 'components/atoms';
import { Colors } from 'utils/color';
import { getYYYYMMDD, getHourMinSecV2 } from 'utils/utils';

import informationImage from 'images/bg-login-time@3x.png';

import constants, { COMPANY_TYPE } from 'utils/constants';

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

function UserLog({ loginTime, userName, onClickLogout }: UserLogProps) {
  return (
    <StyledWrapper>
      <StyledUser>
        <Text fontColor={Colors.white} fontSize={0.81} fontWeight={700}>
          {`${userName} 님`}
        </Text>
      </StyledUser>
      <StyledLoginTime>
        <Image
          alt={'login_time'}
          src={informationImage}
          width={11.88}
          height={1.43}
        />
        <StyledText>
          <Text fontSize={0.75} fontWeight={700}>
            {`${getYYYYMMDD(loginTime)} ${getHourMinSecV2(loginTime)}`}
          </Text>
        </StyledText>
      </StyledLoginTime>
      <StyledLogout>
        <Button bgColor="inherit" width={5} onClick={onClickLogout}>
          <Text fontColor={Colors.white} fontSize={0.81} fontWeight={700}>
            로그아웃
          </Text>
        </Button>
      </StyledLogout>
    </StyledWrapper>
  );
}

interface UserLogProps {
  loginTime: number;
  userName: string;
  onClickLogout: () => void;
}

export default React.memo(UserLog);
