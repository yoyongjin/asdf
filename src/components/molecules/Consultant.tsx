import React, { useEffect } from 'react';
import styled from 'styled-components';

import { Button, Image, Text } from 'components/atoms';
import { getHourMinSecV1 } from 'utils/utils';
import { COLORS } from 'utils/color';
import { ConsultantInfoType } from 'modules/types/user';

import callingIcon from 'images/icon-mnt-red@2x.png';
import waitingIcon from 'images/icon-mnt-grey.png';
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
  loginId,
  tapping,
  getConsultantInfo,
  initZibox,
  setTapping,
  startMonitoring,
  stopMonitoring,
}: ConsultantProps) {
  useEffect(() => {
    if (
      tapping &&
      loginId === consultInfo.user_id &&
      consultInfo.call_type !== 'call_offhook'
    ) {
      // 감청 중 상담원이 통화 종료 했을 때 감청 종료 명령 날려주는 부분
      stopMonitoring(consultInfo.number, loginId);
      setTapping();
    }
  }, [
    consultInfo.user_id,
    loginId,
    stopMonitoring,
    setTapping,
    consultInfo.number,
    consultInfo.call_type,
    tapping,
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
          tapping &&
          consultInfo.user_id !== loginId &&
          !consultInfo.monitoring ? null : (
            <Button
              width={4.6}
              height={1.6}
              bgColor={'inherit'}
              image={
                consultInfo.monitoring
                  ? consultInfo.user_id === loginId
                    ? tappingStopIcon
                    : OthertappingIcon
                  : tappingStartIcon
              }
              hoverImg={consultInfo.monitoring ? '' : tappingStartOverIcon}
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
                    // 내가 해당 상담원을 감청하고 있는 경우
                    stopMonitoring(consultInfo.number, loginId);
                    setTimeout(() => {
                      setTapping(false);
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
                    setTapping(true);
                  } else {
                    alert('ZiBox IP를 확인해주세요.');
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
  tapping: boolean;
  getConsultantInfo: (data: ConsultantInfoType) => void;
  initZibox: (ziboxIp: string) => Promise<boolean>;
  setTapping: React.Dispatch<React.SetStateAction<boolean>>;
  startMonitoring: (number: string, id: number) => void;
  stopMonitoring: (number: string, id: number) => void;
}

Consultant.defaultProps = {};

export default React.memo(Consultant);
