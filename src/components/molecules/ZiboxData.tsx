import React, { useCallback } from 'react';
import styled from 'styled-components';

import { Text } from 'components/atoms';
import { ZiboxStatus } from 'types/user';
import { Colors } from 'utils/color';
import { ZIBOX_TYPE } from 'utils/constants';

const StyledWrapper = styled.div`
  width: 100%;
  height: 100%;
`;

const StyledTitle = styled.div`
  width: 100%;
  height: 20px;
`;

const StyledZibox = styled.div`
  display: flex;
  flex-direction: column;
  height: calc(100% - 30px);
  margin-top: 10px;
`;

function ZiboxData({ data }: ZiboxDataProps) {
  const getZiBoxConnectionStatus = useCallback(() => {
    switch (data?.connection) {
      case 0:
        return ZIBOX_TYPE.ZIBOX_DISCONNECTION;
      case 1:
        // 지박스 연결 완료
        return ZIBOX_TYPE.ZIBOX_CONNECTION;
      default:
        return '';
    }
  }, [data]);

  const getZiBoxATSStatus = useCallback(() => {
    switch (data?.ats) {
      case -1:
        // ATS 에러
        return ZIBOX_TYPE.ATS_ERROR;
      case 0:
        // ATS 정지
        return ZIBOX_TYPE.ATS_STOP;
      case 1:
        // ATS 중지
        return ZIBOX_TYPE.ATS_PAUSE;
      case 2:
        // ATS 재생
        return ZIBOX_TYPE.ATS_START;
      default:
        break;
    }
  }, [data]);

  const getZiBoxRecordStatus = useCallback(() => {
    switch (data?.record) {
      case -1:
        // 녹취 에러
        return ZIBOX_TYPE.RECORD_ERROR;
      case 0:
        // 녹취 종료
        return ZIBOX_TYPE.RECORD_STOP;
      case 1:
        // 녹취 시작
        return ZIBOX_TYPE.RECORD_START;
      default:
        return '';
    }
  }, [data]);

  const getZiBoxMonitoringStatus = useCallback(() => {
    switch (data?.monitoring) {
      case -1:
        // 감청 에러
        return ZIBOX_TYPE.MONIT_ERROR;
      case 0:
        // 감청 종료
        return ZIBOX_TYPE.MONIT_STOP;
      case 1:
        // 감청 시작
        return ZIBOX_TYPE.MONIT_START;
      default:
        return '';
    }
  }, [data]);

  return (
    <StyledWrapper>
      <StyledTitle>
        <Text fontWeight={600}>ZIBOX</Text>
      </StyledTitle>
      <StyledZibox>
        <Text fontWeight={600} fontSize={0.9} fontColor={Colors.gray9}>
          {`ZIBOX IP : ${data.zibox_ip}`}
        </Text>
        <Text fontWeight={600} fontSize={0.9} fontColor={Colors.gray9}>
          {`ZIBOX MAC : ${data.zibox_mac}`}
        </Text>
        <Text fontWeight={600} fontSize={0.9} fontColor={Colors.gray9}>
          {`상담원 PC IP : ${data.pc_ip}`}
        </Text>
        <Text fontWeight={600} fontSize={0.9} fontColor={Colors.gray9}>
          {`연결 상태 : ${getZiBoxConnectionStatus()} (${
            data && data.connection
          })`}
        </Text>
        <Text fontWeight={600} fontSize={0.9} fontColor={Colors.gray9}>
          {`ATS : ${getZiBoxATSStatus()} (${data && data.ats})`}
        </Text>
        <Text fontWeight={600} fontSize={0.9} fontColor={Colors.gray9}>
          {`녹취(STT) : ${getZiBoxRecordStatus()}  (${data && data.record})`}
        </Text>
        <Text fontWeight={600} fontSize={0.9} fontColor={Colors.gray9}>
          {`감청 : ${getZiBoxMonitoringStatus()} (상태 ${
            data && data.monitoring
          }, 대상 ${data && data.monit_user})`}
        </Text>
      </StyledZibox>
    </StyledWrapper>
  );
}

interface ZiboxDataProps {
  data: ZiboxStatus;
}

ZiboxData.defaultProps = {};

export default ZiboxData;
