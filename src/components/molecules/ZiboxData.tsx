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
      case -99:
        // 초기 로딩
        return ZIBOX_TYPE.ZIBOX_LOAD;
      case 0:
      case -1:
        // 0은 연결 실패
        // -1은 연결 실패(에러 코드 확인)
        return ZIBOX_TYPE.ZIBOX_DISCONNECTION;
      case 1:
        // 지박스 연결 완료
        return ZIBOX_TYPE.ZIBOX_CONNECTION;
      default:
        break;
    }
  }, [data]);

  const getZiBoxATSStatus = useCallback(() => {
    switch (data?.ats) {
      case -2:
        return ZIBOX_TYPE.ATS_STOP_ERROR;
      case -1:
        return ZIBOX_TYPE.ATS_START_ERROR;
      case 0:
        // ATS 정지
        return ZIBOX_TYPE.ATS_STOP;
      case 2:
        return ZIBOX_TYPE.ATS_START;
      case 3:
        return ZIBOX_TYPE.ATS_PAUSE;
      case 4:
        return ZIBOX_TYPE.ATS_RESUME;
      default:
        break;
    }
  }, [data]);

  const getZiBoxRecordStatus = useCallback(() => {
    switch (data?.record) {
      case -2:
        // 녹취 종료 에러 | STT 종료 에러
        return ZIBOX_TYPE.RECORD_STOP_ERROR;
      case -1:
        // 녹취 시작 에러 | STT 시작 에러
        return ZIBOX_TYPE.RECORD_START_ERROR;
      case 0:
        // 녹취 종료
        return ZIBOX_TYPE.RECORD_STOP;
      case 1:
      case 2:
        // 녹취 시작
        return ZIBOX_TYPE.RECORD_START;
      default:
        break;
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
      case 2:
        // 버퍼링 시작
        return ZIBOX_TYPE.MONIT_BUFFER_START;
      case 3:
        // 버퍼링 시작
        return ZIBOX_TYPE.MONIT_BUFFER_STOP;
      case 4:
        // 타임아웃
        return ZIBOX_TYPE.MONIT_CONNECTION_TIMEOUT;
      default:
        break;
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
