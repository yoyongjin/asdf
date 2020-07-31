import React from 'react';
import styled from 'styled-components';

import { Button, Image, Text } from 'components/atoms';
import { getTimeToSecond } from 'utils/utils';
import { COLORS } from 'utils/color';
import callingIcon from 'images/icon-mnt-red@2x.png';
import waitingIcon from 'images/icon-mnt-grey.png';
import interceptionStartIcon from 'images/bt-mnt-listen-over.png';
import interceptingIcon from 'images/bt-mnt-listen-ing.png';
import interceptionFinishIcon from 'images/bt-mnt-listen-fin-nor.png';

const StyledWrapper = styled.div`
  /* Display */
  width: 14rem;
  height: 17rem;
  text-align: center;

  /* Color */
  background-color: ${COLORS.white};
`;

const StyledCallStatusArea = styled.div`
  /* Display */
  display: flex;
  justify-content: space-between;
  padding: 1rem;
`;

const StyledCallImage = styled.div``;

const StyledUserInfo = styled.div`
  display: flex;
  flex-direction: column;
  padding-top: 1rem;
  padding-bottom: 1rem;
`;

const StyledInterception = styled.div``;

function Consultant({ consultInfo, callInfo }: ConsultantProps) {
  return (
    <StyledWrapper>
      <StyledCallStatusArea>
        {callInfo.status === 0 ? (
          <>
            <Text fontColor={COLORS.dark_gray1} fontWeight={600}>
              대기중
            </Text>
          </>
        ) : (
          <>
            <Text fontColor={COLORS.red} fontWeight={600}>
              통화중
            </Text>
            <Text fontColor={COLORS.red} fontWeight={600}>
            {getTimeToSecond(callInfo.call_at)}
            </Text>
          </>
        )}
      </StyledCallStatusArea>
      <StyledCallImage>
        {callInfo.status === 0 ? (
          <>
            <Image
              src={waitingIcon}
              alt={waitingIcon}
              width={4.5}
              height={4.5}
            />
          </>
        ) : (
          <>
            <Image
              src={callingIcon}
              alt={callingIcon}
              width={4.5}
              height={4.5}
            />
          </>
        )}
      </StyledCallImage>
      <StyledUserInfo>
        <Text
          fontSize={1.5}
          fontColor={COLORS.dark_gray1}
        >{`${consultInfo.user_name} 님`}</Text>
        <Text
          fontSize={1.2}
          fontColor={COLORS.dark_gray2}
        >{`${consultInfo.branch_name}점 ${consultInfo.team_name}`}</Text>
      </StyledUserInfo>
      <StyledInterception>
        {callInfo.status === 0 ? (
          <></>
        ) : (
          <>
            <Button
              width={6}
              height={2}
              bgColor={'inherit'}
              bgImage={interceptionStartIcon}
            >
              감청
            </Button>
          </>
        )}
      </StyledInterception>
    </StyledWrapper>
  );
}

interface consultInfoType {
  id: number;
  branch_name: string;
  team_name: string;
  admin_id: string;
  name: string;
  user_name: string;
  number: string;
  ziboxip: string;
  login_at: number;
}

interface callInfoType {
  id: number;
  number: string;
  status: number;
  call_at: number;
}

interface ConsultantProps {
  consultInfo: consultInfoType;
  callInfo: callInfoType;
}

Consultant.defaultProps = {};

export default Consultant;
