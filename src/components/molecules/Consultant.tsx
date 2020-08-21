import React, { useState, useEffect, useCallback } from 'react';
import styled from 'styled-components';

import { Button, Image, Text } from 'components/atoms';
import { getHourMinSecV1 } from 'utils/utils';
import { COLORS } from 'utils/color';
import callingIcon from 'images/icon-mnt-red@2x.png';
import waitingIcon from 'images/icon-mnt-grey.png';
import tappingStartIcon from 'images/bt-mnt-listen-nor.png';
import tappingStartOverIcon from 'images/bt-mnt-listen-over.png';
import OthertappingIcon from 'images/bt-mnt-listen-ing.png';
import tappingStopIcon from 'images/bt-mnt-listen-fin-nor.png';
import { ConsultantInfoType } from 'modules/types/user';
import UserInfo from './UserInfo';
import Socket from 'lib/socket';
import { ExecSyncOptionsWithStringEncoding } from 'child_process';

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

function Consultant({
  consultInfo,
  onClickVisible,
  initZibox,
  startMonitoring,
  stopMonitoring,
  tappingState,
  setTappingState,
  emitMonitoring,
  loginId,
}: ConsultantProps) {
  useEffect(() => {
    if (!tappingState && loginId === consultInfo.user_id) {
      emitMonitoring(consultInfo.number, loginId);
    }
  }, [consultInfo.user_id, loginId, emitMonitoring]);
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
              {consultInfo.diff ? getHourMinSecV1(consultInfo.diff) : '00:00:00'}
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
          onClick={() => { onClickVisible(consultInfo) }}
        >{`${consultInfo.user_name} 님`}</Text>
        <Text
          fontSize={0.87}
          fontColor={COLORS.dark_gray2}
        >{`${consultInfo.branch_name} ${consultInfo.team_name}`}</Text>
      </StyledUserInfo>
      <StyledInterception>
        {consultInfo.call_type === 'call_offhook' ? (
          tappingState &&
          consultInfo.user_id !== loginId &&
          !consultInfo.monitoring ? null : (
            <Button
              width={4.6}
              height={1.6}
              bgColor={'inherit'}
              bgImage={
                consultInfo.monitoring
                  ? consultInfo.user_id === loginId
                    ? tappingStopIcon
                    : OthertappingIcon
                  : tappingStartIcon
              }
              borderRadius={0.81}
              fontSize={0.81}
              fontColor={
                consultInfo.monitoring && consultInfo.user_id !== loginId
                  ? COLORS.green
                  : COLORS.white
              }
              onClick={(e) => {
                if (consultInfo.monitoring) {
                  // 감청을 한번이라도 했을 경우
                  if (consultInfo.user_id === loginId) {
                    // 내가 감청 중
                    stopMonitoring(consultInfo.number, loginId);
                    setTappingState(false);
                  }
                  return;
                }

                initZibox();
                setTimeout(() => {
                  startMonitoring(consultInfo.number, loginId);
                }, 1000);
                setTappingState(true);
              }}
            >
              <Text
                fontColor={
                  consultInfo.monitoring && consultInfo.user_id !== loginId
                    ? COLORS.green
                    : COLORS.white
                }
                fontSize={0.81}
                fontWeight={600}
              >
                {consultInfo.monitoring
                  ? consultInfo.user_id === loginId
                    ? '감청 종료'
                    : '감청중'
                  : '감청'}
              </Text>
            </Button>
          )
        ) : null}
      </StyledInterception>
    </StyledWrapper>
  );
}

interface ConsultantProps {
  consultInfo: ConsultantInfoType;
  onClickVisible: any;
  initZibox: () => void;
  startMonitoring: (number: string, id: number) => void;
  stopMonitoring: (number: string, id: number) => void;
  tappingState: boolean;
  setTappingState: React.Dispatch<React.SetStateAction<boolean>>;
  loginId: number;
  emitMonitoring: (number: string, id: number) => void;
}

Consultant.defaultProps = {};

export default React.memo(Consultant);
