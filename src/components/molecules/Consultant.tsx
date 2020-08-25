import React, { useEffect } from 'react';
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

const StyledInterception = styled.div``;

function Consultant({
  consultInfo,
  tappingState,
  loginId,
  onClickVisible,
  initZibox,
  startMonitoring,
  stopMonitoring,
  setTappingState,
  emitMonitoring,
}: ConsultantProps) {
  useEffect(() => {
    if (!tappingState && loginId === consultInfo.user_id) {
      emitMonitoring(consultInfo.number, loginId);
    }
  }, [
    consultInfo.user_id,
    loginId,
    emitMonitoring,
    consultInfo.number,
    tappingState,
  ]);

  return (
    <StyledWrapper>
      <StyledCallStatusArea>
        {consultInfo.call_type !== 'call_offhook' ? (
          <Text
            fontColor={COLORS.dark_gray1}
            fontWeight={700}
            fontSize={0.87}
            fontFamily={'NanumGothic'}
          >
            대기중
          </Text>
        ) : (
          <>
            <Text
              fontColor={COLORS.red}
              fontWeight={700}
              fontSize={0.87}
              fontFamily={'NanumGothic'}
            >
              통화중
            </Text>
            <Text
              fontColor={COLORS.red}
              fontWeight={700}
              fontSize={0.87}
              fontFamily={'NanumGothic'}
            >
              {consultInfo.diff
                ? getHourMinSecV1(consultInfo.diff)
                : '00:00:00'}
            </Text>
          </>
        )}
      </StyledCallStatusArea>
      <StyledCallImage>
        {consultInfo.call_type !== 'call_offhook' ? (
          <Image src={waitingIcon} width={4} height={4} />
        ) : (
          <Image src={callingIcon} width={4} height={4} />
        )}
      </StyledCallImage>
      <StyledUserInfo>
        <Text
          fontSize={1.1}
          fontColor={COLORS.dark_gray2}
          fontWeight={700}
          fontFamily={'NanumGothic'}
          onClick={() => {
            onClickVisible(consultInfo);
          }}
        >{`${consultInfo.name} 님`}</Text>
        <Text
          fontSize={0.75}
          fontColor={COLORS.dark_gray1}
          fontWeight={700}
          fontFamily={'NanumGothic'}
          lineHeight={2.75}
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
              bgHoverImage={consultInfo.monitoring ? '' : tappingStartOverIcon}
              borderRadius={0.81}
              fontColor={
                consultInfo.monitoring && consultInfo.user_id !== loginId
                  ? COLORS.green
                  : COLORS.white
              }
              onClick={async (e) => {
                if (consultInfo.monitoring) {
                  // 감청을 한번이라도 했을 경우
                  if (consultInfo.user_id === loginId) {
                    // 내가 감청 중
                    stopMonitoring(consultInfo.number, loginId);
                    setTappingState(false);
                  }
                  return;
                }

                try {
                  const isSuccess = await initZibox(consultInfo.ziboxip);
                  if (isSuccess) {
                    setTimeout(() => {
                      startMonitoring(consultInfo.number, loginId);
                    }, 1000);
                    setTappingState(true);
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
                fontFamily={'NanumGothic'}
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
  tappingState: boolean;
  loginId: number;
  onClickVisible: (data: ConsultantInfoType) => void;
  initZibox: (ziboxIp: string) => Promise<boolean>;
  startMonitoring: (number: string, id: number) => void;
  stopMonitoring: (number: string, id: number) => void;
  setTappingState: React.Dispatch<React.SetStateAction<boolean>>;
  emitMonitoring: (number: string, id: number) => void;
}

Consultant.defaultProps = {};

export default React.memo(Consultant);
