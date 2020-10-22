import React, { useEffect } from 'react';
import styled from 'styled-components';

import { Button, Image, Text } from 'components/atoms';
import { getHourMinSecV1 } from 'utils/utils';
import { COLORS } from 'utils/color';
import { ConsultantInfoType } from 'modules/types/user';
import { CALL_TYPE } from 'utils/constants';

import callingIcon from 'images/icon-mnt-red@2x.png';
import workingIcon from 'images/icon-mnt-blue@2x.png';
import waitingIcon from 'images/icon-mnt-grey@2x.png';
import tappingStartIcon from 'images/bt-mnt-listen-nor.png';
import tappingStartOverIcon from 'images/bt-mnt-listen-over.png';
import OthertappingIcon from 'images/bt-mnt-listen-ing.png';
import tappingStopIcon from 'images/bt-mnt-listen-fin-nor.png';

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
  padding-top: 20px;
`;

const StyledTapping = styled.div``;

function Consultant({
  consultInfo,
  monit,
  monitPcIp,
  loginId,
  getConsultantInfo,
  startMonitoringOcx,
  stopMonitoringOcx,
}: ConsultantProps) {
  useEffect(() => {
    if (
      monit &&
      loginId === consultInfo.monit_user &&
      consultInfo.call_status === CALL_TYPE.CALL_IDLE
    ) {
      // 감청 중 상담원이 통화 종료 했을 때 감청 종료 명령 날려주는 부분
      stopMonitoringOcx();
    }
  }, [
    monit,
    loginId,
    consultInfo.call_status,
    consultInfo.monit_user,
    stopMonitoringOcx,
  ]);

  return (
    <StyledWrapper>
      <StyledCallStatusArea>
        <Text
          fontColor={
            consultInfo.consultant_status === 1
              ? COLORS.red
              : consultInfo.consultant_status === 2
              ? COLORS.blue
              : COLORS.dark_gray1
          }
          fontWeight={700}
          fontSize={0.87}
        >
          {consultInfo.consultant_status === 1
            ? consultInfo.call_status === CALL_TYPE.CALL_OFFHOOK
              ? '발신중'
              : consultInfo.call_status === CALL_TYPE.CALL_CONNECT
              ? '통화중'
              : '상태만 변경'
            : consultInfo.consultant_status === 2
            ? '후처리중'
            : consultInfo.consultant_status === 3
            ? '휴식'
            : consultInfo.consultant_status === 4
            ? '이석'
            : '대기중'}
        </Text>
        {consultInfo.consultant_status === 1 &&
        consultInfo.call_status !== CALL_TYPE.CALL_IDLE ? (
          <Text fontColor={COLORS.red} fontWeight={700} fontSize={0.87}>
            {consultInfo.diff ? getHourMinSecV1(consultInfo.diff) : '00:00:00'}
          </Text>
        ) : null}
      </StyledCallStatusArea>
      <StyledCallImage>
        <Image
          src={
            consultInfo.consultant_status === 1
              ? callingIcon
              : consultInfo.consultant_status === 2
              ? workingIcon
              : waitingIcon
          }
          alt={'status consultant'}
          width={4}
          height={4}
        />
      </StyledCallImage>
      <StyledUserInfo>
        <Text
          fontSize={1.1}
          fontColor={COLORS.dark_gray2}
          fontWeight={700}
          onClick={() => {
            getConsultantInfo(consultInfo);
          }}
        >{`${consultInfo.name} 님`}</Text>
        <Text
          fontSize={0.75}
          fontColor={COLORS.dark_gray1}
          fontWeight={700}
          lineHeight={2.75}
        >{`${consultInfo.branch_name} ${consultInfo.team_name}`}</Text>
      </StyledUserInfo>
      <StyledTapping>
        {consultInfo.consultant_status === 1 &&
        consultInfo.call_status !== CALL_TYPE.CALL_IDLE &&
        consultInfo.zibox_status === 1 ? (
          monit && consultInfo.monit_status !== 1 ? null : (
            // 통화중일 경우 + 지박스가 연결 되었을 경우
            <Button
              width={4.6}
              height={1.6}
              bgColor={'inherit'}
              image={
                consultInfo.monit_status === 1
                  ? // 감청 중
                    loginId === consultInfo.monit_user
                    ? // 내가 감청 중
                      tappingStopIcon
                    : // 다른 관리자가 감청 중
                      OthertappingIcon
                  : // 감청 대기
                    tappingStartIcon
              }
              borderRadius={0.81}
              onClick={async (e) => {
                if (!consultInfo.pc_ip) return;
                if (monit && loginId !== consultInfo.monit_user) return;

                console.log('현재 나의 감청 상태');
                console.log(monit);

                if (monit) {
                  stopMonitoringOcx();
                } else {
                  startMonitoringOcx(
                    consultInfo.pc_ip!,
                    consultInfo.number,
                    loginId,
                  );
                }
              }}
            >
              <Text
                fontColor={
                  consultInfo.monit_status === 1
                    ? loginId === consultInfo.monit_user
                      ? COLORS.white
                      : COLORS.green
                    : COLORS.white
                }
                fontSize={0.81}
                fontWeight={800}
              >
                {consultInfo.monit_status === 1
                  ? loginId === consultInfo.monit_user
                    ? '감청 종료'
                    : '감청중'
                  : '감청'}
              </Text>
            </Button>
          )
        ) : null}
      </StyledTapping>
    </StyledWrapper>
  );
}

interface ConsultantProps {
  consultInfo: ConsultantInfoType;
  loginId: number;
  monit: boolean;
  monitPcIp: string;
  getConsultantInfo: (data: ConsultantInfoType) => void;
  startMonitoringOcx: (
    ip: string,
    number: string,
    userId: number,
    port?: number,
    mode?: number,
  ) => void;
  stopMonitoringOcx: () => void;
}

Consultant.defaultProps = {};

export default React.memo(Consultant);
