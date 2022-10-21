import React, { useCallback } from 'react';
import styled from 'styled-components';

import { Button, Image, Text } from 'components/atoms';
import { LoginData, TappingTarget } from 'types/auth';
import { UserData } from 'types/user';
import { Colors } from 'utils/color';
import { CALL_STATUS_V2, USER_TYPE } from 'utils/constants';
import Utils from 'utils/new_utils';

import loadingIcon from 'images/loading.gif';
import { SetSeletedConsultantData } from 'components/organisms/MonitoringView';
import MonitoringFormat from 'utils/format/monitoring';
import _ from 'lodash';

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
  // startTapping,
  // stopTapping,
  // changeTappingData,
  tappingStatus,
  consultInfo,
  loginData,
  setSeletedConsultantData,
  // requestTapping,
  tappingTarget,
  handleTapping,
}: ConsultantProps) {
  /**
   * @description 상담원 상태에 따른 버튼
   */
  const handleButtonView = useCallback(() => {
    if (loginData.admin_id === USER_TYPE.CONSULTANT) return null;

    const {
      image,
      text,
      type,
    }: {
      image: string;
      text: string;
      type: string;
    } = MonitoringFormat.getMonitStatus(
      consultInfo.zibox?.monitoring,
      consultInfo.zibox?.monit_user,
      tappingStatus,
      consultInfo.call?.status,
      loginData.id,
      tappingTarget.id === consultInfo.id,
    );

    if (type === 'button') {
      return (
        <Button
          width={7.5}
          height={2.6}
          bgColor="inherit"
          image={image}
          borderRadius={0.81}
          onClick={
            text
              ? _.debounce((e) => handleTapping(consultInfo), 100)
              : undefined
          }
        >
          <Text fontColor={Colors.white} fontSize={13} fontWeight={800}>
            {text}
          </Text>
        </Button>
      );
    }

    if (type === 'image') {
      return <Image src={image} alt={text} width={27.5} height={25} />;
    }
  }, [
    consultInfo,
    handleTapping,
    loginData.admin_id,
    loginData.id,
    tappingStatus,
    tappingTarget.id,
  ]);

  /**
   * @description 상담원 상태 뷰(텍스트)
   */
  const handleConsultantTextStatusView = useCallback(() => {
    const { color, text } = MonitoringFormat.getConsultantStatus(
      consultInfo.call?.status!,
      consultInfo.consultant?.status!,
      consultInfo.phone?.connection!,
    );

    return (
      <Text fontColor={color} fontWeight={700}>
        {text}
      </Text>
    );
  }, [consultInfo.call, consultInfo.consultant, consultInfo.phone]);

  /**
   * @description 상담원 상태 뷰(이미지)
   */
  const handleConsultantImageStatusView = useCallback(() => {
    const { text, image } = MonitoringFormat.getConsultantImageStatus(
      consultInfo.call?.status,
      consultInfo.zibox?.monitoring,
    );

    return <Image src={image} alt={text} width={64} height={64} />;
  }, [consultInfo.call, consultInfo.zibox]);

  return (
    <StyledWrapper>
      <StyledCallStatusArea>
        {handleConsultantTextStatusView()}
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
      <div>{handleConsultantImageStatusView()}</div>
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
          {`${consultInfo.branch_name} ${consultInfo.team_name}`}
        </Text>
      </StyledUserInfo>
      <StyledWhiteSpace pixel={6} />
      {handleButtonView()}
    </StyledWrapper>
  );
}

interface ConsultantProps {
  tappingStatus: number;
  consultInfo: UserData;
  loginData: LoginData;
  tappingTarget: TappingTarget;
  setSeletedConsultantData: SetSeletedConsultantData;
  handleTapping: (info: UserData) => void;
}

interface StyledWhiteSpaceProps {
  pixel: number;
}

Consultant.defaultProps = {};

export default React.memo(Consultant);
