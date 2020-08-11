import React from 'react';
import styled from 'styled-components';

import { Button, Image, Text } from 'components/atoms';
import { getHourMinSec } from 'utils/utils';
import { COLORS } from 'utils/color';
import callingIcon from 'images/icon-mnt-red@2x.png';
import waitingIcon from 'images/icon-mnt-grey.png';
import interceptionStartIcon from 'images/bt-mnt-listen-over.png';
import interceptingIcon from 'images/bt-mnt-listen-ing.png';
import interceptionFinishIcon from 'images/bt-mnt-listen-fin-nor.png';

const StyledWrapper = styled.div`
  /* Display */
  width: 12.5rem;
  height: 15rem;
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

function Consultant({ consultInfo }: ConsultantProps) {
  return (
    <StyledWrapper>
      <StyledCallStatusArea>
        {consultInfo.call_type !== 'call_offhook' ? (
          <>
            <Text
              fontColor={COLORS.dark_gray1}
              fontWeight={600}
              fontSize={0.87}
            >
              대기중
            </Text>
          </>
        ) : (
          <>
            <Text fontColor={COLORS.red} fontWeight={600} fontSize={0.87}>
              통화중
            </Text>
            <Text fontColor={COLORS.red} fontWeight={600} fontSize={0.87}>
              {consultInfo.diff ? getHourMinSec(consultInfo.diff) : '00:00:00'}
            </Text>
          </>
        )}
      </StyledCallStatusArea>
      <StyledCallImage>
        {consultInfo.call_type !== 'call_offhook' ? (
          <>
            <Image src={waitingIcon} alt={waitingIcon} width={4} height={4} />
          </>
        ) : (
          <>
            <Image src={callingIcon} alt={callingIcon} width={4} height={4} />
          </>
        )}
      </StyledCallImage>
      <StyledUserInfo>
        <Text
          fontSize={1.12}
          fontColor={COLORS.dark_gray1}
          fontWeight={'bold'}
        >{`${consultInfo.user_name} 님`}</Text>
        <Text
          fontSize={0.87}
          fontColor={COLORS.dark_gray2}
        >{`${consultInfo.branch_name} ${consultInfo.team_name}`}</Text>
      </StyledUserInfo>
      <StyledInterception>
        {consultInfo.call_type !== 'call_offhook' ? (
          <></>
        ) : (
          <>
            <Button
              width={4.6}
              height={1.6}
              bgColor={'inherit'}
              bgImage={interceptionStartIcon}
              borderRadius={0.81}
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
  branch_name: string | null;
  team_name: string | null;
  admin_id: string;
  name: string;
  user_name: string;
  number: string;
  ziboxip: string;
  login_at: number;
  call_time?: number;
  call_type?: string;
  diff?: number;
}

interface ConsultantProps {
  consultInfo: consultInfoType;
}

Consultant.defaultProps = {};

export default React.memo(Consultant);
