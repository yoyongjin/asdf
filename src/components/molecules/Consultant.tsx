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
import monitoringIcon from 'images/icon-mnt-grey@2x.png';
import tappingStartIcon from 'images/bt-mnt-listen-nor.png';
import tappingStartOverIcon from 'images/bt-mnt-listen-over.png';
import OthertappingIcon from 'images/bt-mnt-listen-ing.png';
import tappingStopIcon from 'images/bt-mnt-listen-fin-nor.png';
import zmsTappingStartIcon from 'images/zms/bt-mnt-listen-nor.png';
import zmsOthertappingIcon from 'images/zms/bt-mnt-listen-ing.png';
import zmsTappingStopIcon from 'images/zms/bt-mnt-listen-fin-nor.png';

import { company, COMPANY_MAP, CONSULTANT_BOX_WIDTH } from 'utils/constants';

const StyledWrapper = styled.div`
  /* Display */
  width: ${CONSULTANT_BOX_WIDTH}px;
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
  loginId,
  getConsultantInfo,
  initZibox,
  setMonit,
  startMonitoring,
  stopMonitoring,
  startMonitoringOcx,
  stopMonitoringOcx,
}: ConsultantProps) {
  useEffect(() => {
    if (
      consultInfo.call_type !== 'call_offhook' &&
      monit &&
      loginId === consultInfo.user_id
    ) {
      // 감청 중 해당 상담원이 통화 종료 했을 때 감청 종료 명령 날려주는 부분
      stopMonitoring(consultInfo.number);
      setMonit(false);
    }

    // if (
    //   monit &&
    //   loginId === consultInfo.monit_user &&
    //   consultInfo.call_status === CALL_TYPE.CALL_IDLE
    // ) {
    //   // 감청 중 상담원이 통화 종료 했을 때 감청 종료 명령 날려주는 부분
    //   stopMonitoringOcx();
    // }
  }, [
    consultInfo.call_type,
    consultInfo.number,
    consultInfo.user_id,
    loginId,
    monit,
    setMonit,
    stopMonitoring,
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
          <>
            {consultInfo.consultant_status === 1
              ? consultInfo.call_status === CALL_TYPE.CALL_OFFHOOK
                ? '연결중'
                : consultInfo.call_status === CALL_TYPE.CALL_INCOMMING
                ? '연결중'
                : consultInfo.call_status === CALL_TYPE.CALL_CONNECT
                ? '통화중'
                : ''
              : consultInfo.consultant_status === 2
              ? '후처리중'
              : consultInfo.consultant_status === 3
              ? '휴식'
              : consultInfo.consultant_status === 4
              ? '이석'
              : consultInfo.consultant_status === -1
              ? '로그아웃'
              : '대기중'}
            {`(${consultInfo.consultant_status}/${
              consultInfo.call_status === CALL_TYPE.CALL_OFFHOOK
                ? 1
                : consultInfo.call_status === CALL_TYPE.CALL_CONNECT
                ? 2
                : consultInfo.call_status === CALL_TYPE.CALL_INCOMMING
                ? 4
                : consultInfo.call_status === CALL_TYPE.CALL_IDLE
                ? 0
                : consultInfo.call_status
            })`}
          </>
        </Text>
        {consultInfo.consultant_status === 1 &&
        consultInfo.call_status !== CALL_TYPE.CALL_IDLE ? (
          <Text fontColor={COLORS.red} fontWeight={700} fontSize={0.87}>
            {consultInfo.diff ? getHourMinSecV1(consultInfo.diff) : '00:00:00'}
          </Text>
        ) : null}
      </StyledCallStatusArea>
      <StyledCallImage>
        {consultInfo.call_type !== 'call_offhook' ? (
          <Image
            src={waitingIcon}
            alt={'Waiting consultant'}
            width={4}
            height={4}
          />
        ) : consultInfo.monitoring ? (
          <Image
            src={monitoringIcon}
            alt={'Waiting consultant'}
            width={4}
            height={4}
          />
        ) : (
          <Image
            src={callingIcon}
            alt={'Calling consultant'}
            width={4}
            height={4}
          />
        )}
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
        {consultInfo.call_type === 'call_offhook' ? (
          monit && !consultInfo.monitoring ? null : (
            // {consultInfo.consultant_status === 1 &&
            // consultInfo.call_status !== CALL_TYPE.CALL_IDLE &&
            // consultInfo.zibox_status === 1 ? (
            //  monit && consultInfo.monit_status !== 1 ? null : (
            // 통화중일 경우 + 지박스가 연결 되었을 경우
            <Button
              width={4.6}
              height={1.6}
              bgColor={'inherit'}
              image={
                consultInfo.monitoring
                  ? consultInfo.user_id === loginId
                    ? company === COMPANY_MAP.DBLIFE
                      ? tappingStopIcon
                      : zmsTappingStopIcon
                    : company === COMPANY_MAP.DBLIFE
                    ? OthertappingIcon
                    : zmsOthertappingIcon
                  : company === COMPANY_MAP.DBLIFE
                  ? tappingStartIcon
                  : zmsTappingStartIcon
              }
              hoverImg={
                consultInfo.monitoring
                  ? ''
                  : company === COMPANY_MAP.DBLIFE
                  ? tappingStartOverIcon
                  : ''
                // consultInfo.monit_status === 1
                //   ? // 감청 중
                //     loginId === consultInfo.monit_user
                //     ? company === COMPANY_MAP.LINA ?
                //     // 내가 감청 중
                //       tappingStopIcon : zmsTappingStopIcon
                //     : company === COMPANY_MAP.LINA ?
                //     // 다른 관리자가 감청 중
                //       OthertappingIcon : zmsOthertappingIcon
                //   : company === COMPANY_MAP.LINA ?
                //   // 감청 대기
                //     tappingStartIcon : zmsTappingStartIcon
              }
              borderRadius={0.81}
              onClick={async (e) => {
                if (consultInfo.monitoring) {
                  // 감청 중인 경우
                  if (consultInfo.user_id === loginId) {
                    // 로그인한 유저가 감청하고 있는 대상일 경우
                    stopMonitoring(consultInfo.number);
                    setTimeout(() => {
                      setMonit(false);
                    }, 500);
                  }
                  return;
                }

                try {
                  const isSuccess = await initZibox(
                    consultInfo.id,
                    consultInfo.ziboxip,
                    consultInfo.ziboxmic,
                    consultInfo.ziboxspk,
                  );
                  if (isSuccess) {
                    setTimeout(() => {
                      startMonitoring(consultInfo.number, loginId);
                    }, 500);
                    setMonit(true);
                  } else {
                    alert('ZiBox 연결에 실패하였습니다.');
                  }
                } catch (error) {
                  console.log(error);
                  // if (!consultInfo.pc_ip) return;
                  // if (monit && loginId !== consultInfo.monit_user) return;

                  // console.log('현재 나의 감청 상태');
                  // console.log(monit);

                  // if (monit) {
                  //   stopMonitoringOcx();
                  // } else {
                  //   startMonitoringOcx(
                  //     consultInfo.pc_ip!,
                  //     consultInfo.number,
                  //     loginId,
                  //   );
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
  getConsultantInfo: (data: ConsultantInfoType) => void;
  initZibox: (
    id: number,
    ziboxIp: string,
    ziboxMic: number,
    ziboxSpk: number,
  ) => Promise<boolean>;
  setMonit: React.Dispatch<React.SetStateAction<boolean>>;
  startMonitoring: (number: string, id: number) => void;
  stopMonitoring: (number: string) => void;
  startMonitoringOcx?: (
    ip: string,
    number: string,
    userId: number,
    port?: number,
    mode?: number,
  ) => void;
  stopMonitoringOcx?: () => void;
}

Consultant.defaultProps = {};

export default React.memo(Consultant);
