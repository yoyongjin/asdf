import React from 'react';
import styled from 'styled-components';

import { Button, Image, Text } from 'components/atoms';
import { COLORS } from 'utils/color';
import { getYYYYMMDD, getHourMinSecV2 } from 'utils/utils';

import { company, COMPANY } from 'utils/constants';

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
  userName,
  loginTimeImage,
  onClickLogout,
}: UserLogProps) {
  return (
    <StyledWrapper>
      <StyledUser>
        <Text
          fontColor={COLORS.white}
          fontSize={0.81}
          fontWeight={700}
        >{`${userName} 님`}</Text>
      </StyledUser>
      <StyledLoginTime>
        <Image
          alt={'Login time background image'}
          src={loginTimeImage}
          width={11.88}
          height={1.43}
        />
        <StyledText>
          <Text
            fontColor={
              company === COMPANY.DBLIFE ? COLORS.green : COLORS.light_blue2
            }
            fontSize={0.75}
            fontWeight={700}
          >{`${getYYYYMMDD(loginTime)} ${getHourMinSecV2(loginTime)}`}</Text>
        </StyledText>
      </StyledLoginTime>
      <StyledLogout>
        <Button bgColor={'inherit'} width={5} onClick={onClickLogout}>
          <Text fontColor={COLORS.white} fontSize={0.81} fontWeight={700}>
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
  loginTimeImage: string;
  onClickLogout: () => void;
}

export default React.memo(UserLog);
