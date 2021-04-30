import React, { useCallback, useEffect } from 'react';
import styled from 'styled-components';

import { Button, Image, Text } from 'components/atoms';
import { getHourMinSecV1 } from 'utils/utils';
import { Colors, COLORS } from 'utils/color';
import { ConsultantInfo, CallStatus, ConsultantStatus } from 'types/user';
import {
  CALL_STATUS_V2,
  CONSULTANT_STATUS,
  ZIBOX_TRANSPORT,
} from 'utils/constants';

import monitoringIcon from 'images/icon-mnt-red@2x.png';
// import workingIcon from 'images/icon-mnt-blue@2x.png';
import waitingIcon from 'images/icon-mnt-grey@2x.png';
import callingIcon from 'images/icon-mnt-blue@2x.png';
// import tappingStartIcon from 'images/bt-mnt-listen-nor.png';
// import tappingStartOverIcon from 'images/bt-mnt-listen-over.png';
// import OthertappingIcon from 'images/bt-mnt-listen-ing.png';
// import tappingStopIcon from 'images/bt-mnt-listen-fin-nor.png';
import startTappingIcon from 'images/zms/bt-mnt-listen-nor.png';
import tappingIcon from 'images/zms/bt-mnt-listen-ing.png';
import stopTappingIcon from 'images/zms/bt-mnt-listen-fin-nor.png';
import loadingIcon from 'images/loading.svg';

import { CONSULTANT_BOX_WIDTH, ZIBOX_MONIT_STATUS } from 'utils/constants';

import {
  connectZibox,
  requestTapping,
  startTapping,
  stopTapping,
} from 'hooks/useZibox';
import { changeTappingData } from 'hooks/useMonitoring';
import Communicator from 'lib/communicator';

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
  connectZibox,
  startTapping,
  stopTapping,
  changeTappingData,
  tappingStatus,
  consultInfo,
  loginId,
  getConsultantInfo,
  requestTapping,
}: ConsultantProps) {
  useEffect(() => {
    if (
      consultInfo.call?.status === CALL_STATUS_V2.IDLE &&
      tappingStatus === 2 &&
      consultInfo.zibox?.monitoring === ZIBOX_MONIT_STATUS.ENABLE &&
      consultInfo.zibox?.monit_user === loginId
    ) {
      // 감청하고 있는 상담원이 통화 종료 했을 때 감청 종료 명령 날려주는 부분
      console.log(
        '@@@@@@@@@@@@@@@@@@2엥',
        consultInfo.call,
        tappingStatus,
        consultInfo.zibox,
      );
      stopTapping(consultInfo.number);
      // changeTapping(1);
    }
  }, [
    changeTappingData,
    consultInfo.call,
    consultInfo.number,
    consultInfo.zibox,
    loginId,
    stopTapping,
    tappingStatus,
  ]);

  const handleTapping = useCallback(
    async (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
      changeTappingData(
        1,
        consultInfo.zibox?.zibox_ip!,
        consultInfo.id,
        consultInfo.number,
      );
      requestTapping(consultInfo.number, loginId);

      if (consultInfo.zibox?.monitoring === ZIBOX_MONIT_STATUS.ENABLE) {
        if (consultInfo.zibox.monit_user !== loginId) {
          // 내가 감청을 하는 대상이 아닌 경우
          return;
        }

        // 감청 대상인 경우
        // 연결 끊기
        stopTapping(consultInfo.number);
        return;
      }

      const mode = Communicator.getInstance().getMode();

      if (mode === ZIBOX_TRANSPORT.MQTT) {
        try {
          const isSuccess = await connectZibox(
            consultInfo.ziboxip,
            consultInfo.ziboxmic,
            consultInfo.ziboxspk,
            consultInfo.id,
            consultInfo.number,
          );

          if (!isSuccess) {
            alert('ZiBox 연결에 실패하였습니다.');
          }
        } catch (error) {
          console.log(error);
        }
      } else if (mode === ZIBOX_TRANSPORT.OCX) {
        startTapping(consultInfo.number, loginId, {
          mode: 1,
          ip: consultInfo.zibox?.pc_ip!,
        });
      } else if (mode === ZIBOX_TRANSPORT.PACKET) {
        startTapping(consultInfo.number, loginId, {
          key: consultInfo.number,
          ip: consultInfo.zibox?.zibox_ip!,
        });
      }
    },
    [
      changeTappingData,
      connectZibox,
      consultInfo.id,
      consultInfo.number,
      consultInfo.zibox,
      consultInfo.ziboxip,
      consultInfo.ziboxmic,
      consultInfo.ziboxspk,
      loginId,
      requestTapping,
      startTapping,
      stopTapping,
    ],
  );

  const handleButtonView = useCallback(
    (consultInfo) => {
      if (
        consultInfo.call?.status === CALL_STATUS_V2.OFFHOOK ||
        consultInfo.call?.status === CALL_STATUS_V2.INCOMMING ||
        consultInfo.call?.status === CALL_STATUS_V2.CONNECT
      ) {
        // 통화 중인 상태
        if (tappingStatus === 0) {
          // 내가 감청 중이 아닐 경우
          return (
            <Button
              width={4.6}
              height={1.6}
              bgColor={'inherit'}
              image={
                consultInfo.zibox?.monitoring === ZIBOX_MONIT_STATUS.ENABLE
                  ? tappingIcon
                  : startTappingIcon
              }
              borderRadius={0.81}
              onClick={
                consultInfo.zibox?.monitoring === ZIBOX_MONIT_STATUS.ENABLE
                  ? undefined
                  : handleTapping
              }
            >
              <Text fontColor={Colors.white} fontSize={0.81} fontWeight={800}>
                {consultInfo.zibox?.monitoring === ZIBOX_MONIT_STATUS.ENABLE
                  ? ''
                  : '감청'}
              </Text>
            </Button>
          );
        } else if (tappingStatus === 1) {
          // 내가 감청 요청을 한 경우
          if (consultInfo.zibox?.monitoring === ZIBOX_MONIT_STATUS.REQUEST) {
            return (
              <Image
                src={loadingIcon}
                alt={'loading'}
                width={4.6}
                height={1.6}
              />
            );
          }
        } else if (tappingStatus === 2) {
          // 내가 감청을 하고 있는 경우
          if (
            consultInfo.zibox?.monitoring === ZIBOX_MONIT_STATUS.ENABLE &&
            consultInfo.zibox?.monit_user === loginId
          ) {
            return (
              <Button
                width={4.6}
                height={1.6}
                bgColor={'inherit'}
                image={
                  consultInfo.zibox?.monitoring === ZIBOX_MONIT_STATUS.ENABLE &&
                  consultInfo.zibox?.monit_user === loginId
                    ? stopTappingIcon
                    : tappingIcon
                }
                borderRadius={0.81}
                onClick={
                  consultInfo.zibox?.monitoring === ZIBOX_MONIT_STATUS.ENABLE &&
                  consultInfo.zibox?.monit_user === loginId
                    ? handleTapping
                    : undefined
                }
              >
                <Text fontColor={Colors.white} fontSize={0.81} fontWeight={800}>
                  {consultInfo.zibox?.monitoring ===
                    ZIBOX_MONIT_STATUS.ENABLE &&
                  consultInfo.zibox?.monit_user === loginId
                    ? '감청 종료'
                    : ''}
                </Text>
              </Button>
            );
          }
        }
      }
    },
    [handleTapping, loginId, tappingStatus],
  );

  const handleConsultantStatus = useCallback(
    (callStatus: number, consultantStatus: number) => {
      switch (callStatus) {
        case CALL_STATUS_V2.IDLE:
          return (
            <Text fontColor={Colors.gray4} fontWeight={700} fontSize={0.87}>
              {consultantStatus === CONSULTANT_STATUS.LOGOUT
                ? '로그아웃'
                : consultantStatus === CONSULTANT_STATUS.AFTER
                ? '후처리'
                : consultantStatus === CONSULTANT_STATUS.AWAY
                ? '이석'
                : consultantStatus === CONSULTANT_STATUS.REST
                ? '휴식'
                : '대기중'}
            </Text>
          );

        case CALL_STATUS_V2.OFFHOOK:
          return (
            <Text fontColor={Colors.blue1} fontWeight={700} fontSize={0.87}>
              발신중
            </Text>
          );
        case CALL_STATUS_V2.CONNECT:
          return (
            <Text fontColor={Colors.red} fontWeight={700} fontSize={0.87}>
              통화중
            </Text>
          );
        case CALL_STATUS_V2.INCOMMING:
          return (
            <Text fontColor={Colors.blue1} fontWeight={700} fontSize={0.87}>
              수신중
            </Text>
          );
        default:
          return (
            <Text fontColor={Colors.red} fontWeight={700} fontSize={0.87}>
              {''}
            </Text>
          );
      }
    },
    [],
  );

  return (
    <StyledWrapper>
      <StyledCallStatusArea>
        {handleConsultantStatus(
          consultInfo.call?.status!,
          consultInfo.consultant?.status!,
        )}
        <Text
          fontColor={
            consultInfo.call?.status === CALL_STATUS_V2.OFFHOOK ||
            consultInfo.call?.status === CALL_STATUS_V2.INCOMMING
              ? Colors.blue1
              : consultInfo.call?.status === CALL_STATUS_V2.CONNECT
              ? Colors.red
              : Colors.gray4
          }
          fontWeight={700}
          fontSize={0.87}
        >
          {consultInfo.calling_time
            ? getHourMinSecV1(consultInfo.calling_time)
            : '00:00:00'}
        </Text>
      </StyledCallStatusArea>
      <StyledCallImage>
        {consultInfo.call?.status === CALL_STATUS_V2.OFFHOOK ||
        consultInfo.call?.status === CALL_STATUS_V2.INCOMMING ||
        consultInfo.call?.status === CALL_STATUS_V2.CONNECT ? (
          consultInfo.zibox?.monitoring === ZIBOX_MONIT_STATUS.ENABLE ? (
            // 감청 중
            <Image
              src={monitoringIcon}
              alt={'Monitoring Status'}
              width={4}
              height={4}
            />
          ) : (
            <Image
              src={callingIcon}
              alt={'Calling Status'}
              width={4}
              height={4}
            />
          )
        ) : (
          <Image
            src={waitingIcon}
            alt={'Waiting Status'}
            width={4}
            height={4}
          />
        )}
      </StyledCallImage>
      <StyledUserInfo>
        <Text
          fontSize={1.1}
          fontColor={COLORS.dark_gray2}
          fontWeight={700}
          onClick={() => {
            getConsultantInfo(consultInfo);
          }}
        >
          {`${consultInfo.name} 님`}
        </Text>
        <Text
          fontSize={0.75}
          fontColor={COLORS.dark_gray1}
          fontWeight={700}
          lineHeight={2.75}
        >
          {`${consultInfo.branch_name} ${consultInfo.team_name}`}
        </Text>
      </StyledUserInfo>
      <StyledTapping>
        {/* {consultInfo.call?.status === CALL_STATUS_V2.OFFHOOK ||
        consultInfo.call?.status === CALL_STATUS_V2.INCOMMING ||
        consultInfo.call?.status === CALL_STATUS_V2.CONNECT ? (
          consultInfo.zibox?.monitoring === ZIBOX_MONIT_STATUS.REQUEST ? (
            // 요청 대기 중
            <Image src={loadingIcon} alt={'loading'} width={4.6} height={1.6} />
          ) : tappingStatus > 0 &&
            consultInfo.zibox?.monitoring ===
              ZIBOX_MONIT_STATUS.DISABLE ? null : ( // 통화 중이지만 감청 중이 아닌 상담원은 버튼 제거
            <Button
              width={4.6}
              height={1.6}
              bgColor={'inherit'}
              image={
                consultInfo.zibox?.monitoring === ZIBOX_MONIT_STATUS.ENABLE &&
                consultInfo.zibox?.monit_user === loginId
                  ? stopTappingIcon
                  : consultInfo.zibox?.monitoring
                  ? tappingIcon
                  : startTappingIcon
              }
              borderRadius={0.81}
              onClick={handleTapping}
            >
              <Text fontColor={Colors.white} fontSize={0.81} fontWeight={800}>
                {consultInfo.zibox?.monitoring === ZIBOX_MONIT_STATUS.ENABLE
                  ? consultInfo.zibox?.monit_user === loginId
                    ? '감청 종료'
                    : ''
                  : '감청'}
              </Text>
            </Button>
          )
        ) : null} */}
        {handleButtonView(consultInfo)}
      </StyledTapping>
    </StyledWrapper>
  );
}

interface ConsultantProps {
  connectZibox: connectZibox;
  changeTappingData: changeTappingData;
  startTapping: startTapping;
  stopTapping: stopTapping;
  requestTapping: requestTapping;
  tappingStatus: number;
  consultInfo: ConsultantInfo;
  loginId: number;
  getConsultantInfo: (data: ConsultantInfo) => void;
}

Consultant.defaultProps = {};

export default React.memo(Consultant);
