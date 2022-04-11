import React, { useCallback, useEffect } from 'react';
import styled from 'styled-components';

import { Button, Image, Text } from 'components/atoms';
import { changeTappingData, changeTappingStatus } from 'hooks/useMonitoring';
import { requestTapping, startTapping, stopTapping } from 'hooks/useZibox';
import { LoginData, TappingTarget } from 'types/auth';
import { UserData } from 'types/user';
import { Colors } from 'utils/color';
import constants, {
  CALL_STATUS_V2,
  CONSULTANT_STATUS,
  ZIBOX_TRANSPORT,
  ZIBOX_MONIT_STATUS,
  PHONE_STATUS,
  USER_TYPE,
} from 'utils/constants';
import Utils from 'utils/new_utils';

import monitoringIcon from 'images/icon-mnt-red@2x.png';
import waitingIcon from 'images/icon-mnt-grey@2x.png';
import callingIcon from 'images/icon-mnt-blue@2x.png';
import startTappingIcon from 'images/zms/bt-mnt-listen-nor.png';
import tappingIcon from 'images/zms/bt-mnt-listen-ing.png';
import stopTappingIcon from 'images/zms/bt-mnt-listen-fin-nor.png';
import loadingIcon from 'images/loading.svg';
import { SetSeletedConsultantData } from 'components/organisms/MonitoringView';

const StyledWrapper = styled.div`
  /* Display */
  width: 200px;
  height: 240px;
  text-align: center;

  /* Color */
  background-color: ${Colors.white};
`;

const StyledCallStatusArea = styled.div`
  /* Display */
  display: flex;
  justify-content: space-between;
  padding: 17px 17px 22px 16px;
`;

const StyledUserInfo = styled.div`
  display: flex;
  flex-direction: column;
  padding-top: 15px;
`;

const StyledWhiteSpace = styled.div<StyledWhiteSpaceProps>`
  padding-top: ${(props) => props.pixel}px;
  padding-bottom: ${(props) => props.pixel}px; ;
`;

function Consultant({
  startTapping,
  stopTapping,
  changeTappingData,
  tappingStatus,
  consultInfo,
  loginData,
  setSeletedConsultantData,
  requestTapping,
  changeTappingStatus,
  tappingTarget,
}: ConsultantProps) {
  useEffect(() => {
    if (loginData.admin_id === USER_TYPE.CONSULTANT) {
      if (
        consultInfo.id === loginData.id &&
        consultInfo.call?.status === CALL_STATUS_V2.CONNECT
      ) {
        document.title = consultInfo.calling_time
          ? Utils.getHourMinSecBySecond(consultInfo.calling_time)
          : '00:00:00';
      } else {
        document.title = '00:00:00';
      }
    }
  }, [
    consultInfo.call,
    consultInfo.calling_time,
    consultInfo.id,
    loginData.admin_id,
    loginData.id,
  ]);

  useEffect(() => {
    if (
      consultInfo.call?.status === CALL_STATUS_V2.IDLE &&
      consultInfo.zibox?.monitoring === ZIBOX_MONIT_STATUS.ENABLE &&
      consultInfo.zibox?.monit_user === loginData.id
    ) {
      // 감청하고 있는 상담원이 통화 종료 했을 때 감청 종료 명령 날려주는 부분
      const mode = constants.TRANSPORT;

      if (mode === ZIBOX_TRANSPORT.SERVER) {
        requestTapping(
          consultInfo.number!,
          loginData.id,
          consultInfo.zibox?.monit_user === -1 ? 1 : 0,
          consultInfo.zibox_ip!,
        );
      } else {
        stopTapping();
      }
    }
  }, [
    consultInfo.call,
    consultInfo.number,
    consultInfo.zibox,
    consultInfo.zibox_ip,
    loginData.id,
    requestTapping,
    stopTapping,
  ]);

  useEffect(() => {
    if (
      consultInfo.zibox?.monitoring === ZIBOX_MONIT_STATUS.ENABLE &&
      consultInfo.zibox?.monit_user === loginData.id &&
      tappingStatus !== 2
    ) {
      // 감청 중인 경우
      changeTappingData(
        2,
        consultInfo.zibox_ip!,
        consultInfo.id,
        consultInfo.number!,
      );
    } else if (
      (consultInfo.zibox?.monitoring === ZIBOX_MONIT_STATUS.START_REQUEST ||
        consultInfo.zibox?.monitoring === ZIBOX_MONIT_STATUS.STOP_REQUEST) &&
      consultInfo.zibox?.monit_user === loginData.id &&
      tappingStatus !== 1
    ) {
      // 감청을 요청한 경우
      changeTappingData(
        1,
        consultInfo.zibox_ip!,
        consultInfo.id,
        consultInfo.number!,
      );
    } else if (
      consultInfo.id === tappingTarget.id &&
      consultInfo.zibox?.monitoring === ZIBOX_MONIT_STATUS.DISABLE
    ) {
      // 감청이 끝난 경우
      changeTappingData(0, '', -1, '');
    }
  }, [
    changeTappingData,
    consultInfo.id,
    consultInfo.number,
    consultInfo.zibox,
    consultInfo.zibox_ip,
    loginData.id,
    tappingStatus,
    tappingTarget.id,
  ]);

  const handleTapping = useCallback(
    async (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
      requestTapping(
        consultInfo.number!,
        loginData.id,
        consultInfo.zibox?.monit_user === -1 ? 1 : 0,
        constants.TRANSPORT === ZIBOX_TRANSPORT.OCX
          ? consultInfo.pc_ip!
          : consultInfo.zibox_ip!,
      );

      const mode = constants.TRANSPORT;

      if (consultInfo.zibox?.monitoring === ZIBOX_MONIT_STATUS.ENABLE) {
        if (consultInfo.zibox.monit_user !== loginData.id) {
          // 내가 감청을 하는 대상이 아닌 경우
          return;
        }

        // 감청 대상인 경우
        // 연결 끊기
        if (mode !== ZIBOX_TRANSPORT.SERVER) {
          stopTapping();
        }
        return;
      }

      if (mode === ZIBOX_TRANSPORT.MQTT) {
        const options = {
          ip: consultInfo.zibox_ip!,
          mic_vol: consultInfo.zibox_mic!,
          spk_vol: consultInfo.zibox_spk!,
          target_id: loginData.id!,
          key: consultInfo.number!,
        };

        startTapping(options);
      } else if (mode === ZIBOX_TRANSPORT.OCX) {
        const options = {
          ip: consultInfo.pc_ip!,
          target_id: loginData.id!,
          key: consultInfo.number!,
        };

        startTapping(options);
      } else if (mode === ZIBOX_TRANSPORT.PACKET) {
        const options = {
          key: consultInfo.number!,
          ip: consultInfo.zibox?.zibox_ip!,
        };

        startTapping(options);
      }
    },
    [
      consultInfo.number,
      consultInfo.pc_ip,
      consultInfo.zibox,
      consultInfo.zibox_ip,
      consultInfo.zibox_mic,
      consultInfo.zibox_spk,
      loginData.id,
      requestTapping,
      startTapping,
      stopTapping,
    ],
  );

  const handleButtonView = useCallback(
    (consultInfo: UserData) => {
      if (loginData.admin_id === USER_TYPE.CONSULTANT) return null;

      if (
        // 감청 요청 상태로 변경 시
        consultInfo.zibox?.monitoring === ZIBOX_MONIT_STATUS.START_REQUEST ||
        consultInfo.zibox?.monitoring === ZIBOX_MONIT_STATUS.STOP_REQUEST
      ) {
        return (
          <Image src={loadingIcon} alt={'loading'} width={75} height={26} />
        );
      }

      if (consultInfo.call?.status === CALL_STATUS_V2.CONNECT) {
        // 통화 중인 상태
        if (tappingStatus === 0) {
          // 내가 감청 중이 아닐 경우
          if (consultInfo.zibox?.monitoring === ZIBOX_MONIT_STATUS.ENABLE) {
            // 다른 관리자가 감청 중인 경우
            return (
              <Button
                width={7.5}
                height={2.6}
                bgColor="inherit"
                image={tappingIcon}
                borderRadius={0.81}
              >
                <Text fontColor={Colors.white} fontSize={13} fontWeight={800}>
                  {''}
                </Text>
              </Button>
            );
          }

          // 다른 관리자도 감청 중이 아닌 경우
          return (
            <Button
              width={7.5}
              height={2.6}
              bgColor="inherit"
              image={startTappingIcon}
              onClick={handleTapping}
            >
              <Text fontColor={Colors.white} fontSize={13} fontWeight={800}>
                감청
              </Text>
            </Button>
          );
        } else if (tappingStatus === 2) {
          // 내가 감청을 하고 있는 경우
          if (consultInfo.zibox?.monitoring === ZIBOX_MONIT_STATUS.ENABLE) {
            // 내가 감청 중인 상담원일 경우

            if (consultInfo.zibox?.monit_user === loginData.id) {
              return (
                <Button
                  width={7.5}
                  height={2.6}
                  bgColor="inherit"
                  image={stopTappingIcon}
                  borderRadius={0.81}
                  onClick={handleTapping}
                >
                  <Text fontColor={Colors.white} fontSize={13} fontWeight={800}>
                    감청 종료
                  </Text>
                </Button>
              );
            } else {
              // 다른 관리자가 감청중인 상담원일 경우
              return (
                <Button
                  width={7.5}
                  height={2.6}
                  bgColor="inherit"
                  image={tappingIcon}
                  borderRadius={0.81}
                >
                  <Text fontColor={Colors.white} fontSize={13} fontWeight={800}>
                    감청 종료
                  </Text>
                </Button>
              );
            }
          }
        }
      }
    },
    [handleTapping, loginData.admin_id, loginData.id, tappingStatus],
  );

  const handleConsultantStatus = useCallback(
    (callStatus: number, consultantStatus: number, phoneStatus: number) => {
      // 기준은 phoneStatus
      switch (phoneStatus) {
        case PHONE_STATUS.NOTHING:
          return (
            <Text fontColor={Colors.gray4} fontWeight={700}>
              {consultantStatus === CONSULTANT_STATUS.LOGOUT
                ? '로그아웃'
                : '미연결'}
            </Text>
          );
        case PHONE_STATUS.WEB:
          return (
            <Text fontColor={Colors.gray4} fontWeight={700}>
              {consultantStatus === CONSULTANT_STATUS.LOGOUT
                ? '로그아웃'
                : '미연결'}
            </Text>
          );
        case PHONE_STATUS.PHONE:
          return (
            <Text fontColor={Colors.gray4} fontWeight={700}>
              {consultantStatus === CONSULTANT_STATUS.LOGOUT
                ? '로그아웃'
                : '미연결'}
            </Text>
          );
        default:
          break;
      }

      if (!phoneStatus) {
        return (
          <Text fontColor={Colors.blue1} fontWeight={700}>
            {''}
          </Text>
        );
      }

      // 아래는 폰상태 정상인 경우
      switch (callStatus) {
        case CALL_STATUS_V2.IDLE:
          return (
            <Text fontColor={Colors.gray4} fontWeight={700}>
              {consultantStatus === CONSULTANT_STATUS.LOGOUT
                ? '로그아웃'
                : consultantStatus === CONSULTANT_STATUS.AFTER
                ? '후처리'
                : consultantStatus === CONSULTANT_STATUS.REST
                ? '휴식'
                : consultantStatus === CONSULTANT_STATUS.AWAY
                ? '이석'
                : '대기중'}
            </Text>
          );

        case CALL_STATUS_V2.OFFHOOK:
          return (
            <Text fontColor={Colors.blue1} fontWeight={700}>
              발신중
            </Text>
          );
        case CALL_STATUS_V2.CONNECT:
          return (
            <Text fontColor={Colors.red} fontWeight={700}>
              통화중
            </Text>
          );
        case CALL_STATUS_V2.INCOMMING:
          return (
            <Text fontColor={Colors.blue1} fontWeight={700}>
              수신중
            </Text>
          );
        default:
          return (
            <Text fontColor={Colors.gray4} fontWeight={700}>
              대기중
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
          consultInfo.phone?.connection!,
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
        >
          {consultInfo.calling_time
            ? Utils.getHourMinSecBySecond(consultInfo.calling_time)
            : '00:00:00'}
        </Text>
      </StyledCallStatusArea>
      <div>
        {consultInfo.call?.status === CALL_STATUS_V2.OFFHOOK ||
        consultInfo.call?.status === CALL_STATUS_V2.INCOMMING ||
        consultInfo.call?.status === CALL_STATUS_V2.CONNECT ? (
          consultInfo.zibox?.monitoring === ZIBOX_MONIT_STATUS.ENABLE ? (
            // 감청중
            <Image
              src={monitoringIcon}
              alt={'Monitoring Status'}
              width={64}
              height={64}
            />
          ) : (
            // 통화중
            <Image
              src={callingIcon}
              alt={'Calling Status'}
              width={64}
              height={64}
            />
          )
        ) : (
          // 대기중
          <Image
            src={waitingIcon}
            alt={'Waiting Status'}
            width={64}
            height={64}
          />
        )}
      </div>
      <StyledUserInfo>
        <Text
          fontColor={Colors.gray5}
          fontSize={18}
          fontWeight={700}
          onClick={() => {
            setSeletedConsultantData(consultInfo);
          }}
        >
          {`${consultInfo.name} 님`}
        </Text>
        <StyledWhiteSpace pixel={5} />
        <Text fontColor={Colors.gray4} fontSize={12} fontWeight={700}>
          {`${consultInfo.branch_name}지점 ${consultInfo.team_name}팀`}
        </Text>
      </StyledUserInfo>
      <StyledWhiteSpace pixel={6} />
      {handleButtonView(consultInfo)}
    </StyledWrapper>
  );
}

interface ConsultantProps {
  changeTappingData: changeTappingData;
  startTapping: startTapping;
  stopTapping: stopTapping;
  requestTapping: requestTapping;
  tappingStatus: number;
  consultInfo: UserData;
  loginData: LoginData;
  changeTappingStatus: changeTappingStatus;
  tappingTarget: TappingTarget;
  setSeletedConsultantData: SetSeletedConsultantData;
}

interface StyledWhiteSpaceProps {
  pixel: number;
}

Consultant.defaultProps = {};

export default React.memo(Consultant);
