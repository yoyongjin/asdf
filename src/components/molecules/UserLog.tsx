import React from 'react';
import styled, { css } from 'styled-components';

import { Image, Text } from 'components/atoms';
import { Colors } from 'utils/color';
import Utils from 'utils/new_utils';

import timestampImage from 'images/bg-login-time@3x.png';

const StyledWrapper = styled.div`
  /* Display */
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: flex-end;
`;

const StyledLoginTime = styled.span`
  /* Position */
  position: relative;
`;

const StyledText = styled.span`
  /* Display */
  width: 100%;
  height: 100%;

  /* Position */
  position: absolute;
  top: 6px;
  left: 34px;
`;

const StyledCommonWhiteSpace = styled.span<StyledCommonWhiteSpaceProps>`
  ${(props) => {
    if (props.type === 'left') {
      return css<StyledCommonWhiteSpaceProps>`
        padding-left: ${(props) => props.pixel}px;
      `;
    }

    if (props.type === 'right') {
      return css<StyledCommonWhiteSpaceProps>`
        padding-right: ${(props) => props.pixel}px;
      `;
    }
  }}
`;

function UserLog({ loginTime, userName, onClickLogout }: UserLogProps) {
  return (
    <StyledWrapper>
      <StyledCommonWhiteSpace pixel={14} type="right">
        <Text fontColor={Colors.white} fontWeight={700}>
          {`${userName} 님`}
        </Text>
      </StyledCommonWhiteSpace>
      <StyledLoginTime>
        <Image
          alt={'login_time'}
          src={timestampImage}
          width={190}
          height={23}
        />
        <StyledText>
          <Text fontColor={Colors.green1} fontSize={12} fontWeight={700}>
            {`${Utils.getYYYYMMDD(loginTime)} 
            ${Utils.getHourMinSecByTimestamp(loginTime)}`}
          </Text>
        </StyledText>
      </StyledLoginTime>
      <StyledCommonWhiteSpace pixel={21} type="left">
        <Text fontColor={Colors.white} fontWeight={700} onClick={onClickLogout}>
          로그아웃
        </Text>
      </StyledCommonWhiteSpace>
    </StyledWrapper>
  );
}

interface StyledCommonWhiteSpaceProps {
  pixel: number;
  type: string;
}

interface UserLogProps {
  loginTime: number;
  userName: string;
  onClickLogout: () => void;
}

export default React.memo(UserLog);
