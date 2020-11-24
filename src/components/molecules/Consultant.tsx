import React, { useEffect } from 'react';
import styled from 'styled-components';

import { Button, Image, Text } from 'components/atoms';
import { getHourMinSecV1 } from 'utils/utils';
import { COLORS } from 'utils/color';
import { ConsultantInfoType } from 'modules/types/user';

import monitoringIcon from 'images/icon-mnt-red@2x.png';
import callingIcon from 'images/zms/icon-mnt-blue@2x.png';
import waitingIcon from 'images/icon-mnt-grey.png';
import tappingStartIcon from 'images/bt-mnt-listen-nor.png';
import tappingStartOverIcon from 'images/bt-mnt-listen-over.png';
import OthertappingIcon from 'images/bt-mnt-listen-ing.png';
import tappingStopIcon from 'images/bt-mnt-listen-fin-nor.png';
import zmsTappingStartIcon from 'images/zms/bt-mnt-listen-nor.png';
import zmsOthertappingIcon from 'images/zms/bt-mnt-listen-ing.png';
import zmsTappingStopIcon from 'images/zms/bt-mnt-listen-fin-nor.png';

import { company, COMPANY } from 'utils/constants';

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
  loginId,
  monit,
  getConsultantInfo,
  initZibox,
  setMonit,
  startMonitoring,
  stopMonitoring,
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
  }, [
    consultInfo.call_type,
    consultInfo.number,
    consultInfo.user_id,
    loginId,
    monit,
    setMonit,
    stopMonitoring,
  ]);

  return (
    <StyledWrapper>
      <StyledCallStatusArea>
        {consultInfo.call_type !== 'call_offhook' ? (
          <Text fontColor={COLORS.dark_gray1} fontWeight={700} fontSize={0.87}>
            대기중
          </Text>
        ) : (
          <>
            <Text fontColor={COLORS.red} fontWeight={700} fontSize={0.87}>
              통화중
            </Text>
            <Text fontColor={COLORS.red} fontWeight={700} fontSize={0.87}>
              {consultInfo.diff
                ? getHourMinSecV1(consultInfo.diff)
                : '00:00:00'}
            </Text>
          </>
        )}
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
            <Button
              width={4.6}
              height={1.6}
              bgColor={'inherit'}
              image={
                consultInfo.monitoring
                  ? consultInfo.user_id === loginId
                    ? company === COMPANY.DBLIFE
                      ? tappingStopIcon
                      : zmsTappingStopIcon
                    : company === COMPANY.DBLIFE
                    ? OthertappingIcon
                    : zmsOthertappingIcon
                  : company === COMPANY.DBLIFE
                  ? tappingStartIcon
                  : zmsTappingStartIcon
              }
              hoverImg={
                consultInfo.monitoring
                  ? ''
                  : company === COMPANY.DBLIFE
                  ? tappingStartOverIcon
                  : zmsTappingStartIcon
              }
              borderRadius={0.81}
              fontColor={
                consultInfo.monitoring && consultInfo.user_id === loginId
                  ? COLORS.white
                  : COLORS.green
              }
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
                  const isSuccess = await initZibox(consultInfo.ziboxip);
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
                }
              }}
            >
              <Text
                fontColor={
                  consultInfo.monitoring && consultInfo.user_id !== loginId
                    ? COLORS.green
                    : COLORS.white
                }
                fontSize={0.81}
                fontWeight={800}
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
      </StyledTapping>
    </StyledWrapper>
  );
}

interface ConsultantProps {
  consultInfo: ConsultantInfoType;
  loginId: number;
  monit: boolean;
  getConsultantInfo: (data: ConsultantInfoType) => void;
  initZibox: (ziboxIp: string) => Promise<boolean>;
  setMonit: React.Dispatch<React.SetStateAction<boolean>>;
  startMonitoring: (number: string, id: number) => void;
  stopMonitoring: (number: string) => void;
}

Consultant.defaultProps = {};

export default React.memo(
  Consultant,
  (prevProps, nextProps) => prevProps.consultInfo === nextProps.consultInfo,
);
