import React, { useEffect, useState } from 'react';
import styled from 'styled-components';

import { Text } from 'components/atoms';
import { ConsultantInfoType } from 'modules/types/user';
import { COLORS } from 'utils/color';
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

function ZiboxStatus({ data }: ZiboxStatusProps) {
  const [status, setStatus] = useState<{
    zibox: string;
    ats: string;
    record: string;
    monit: string;
    zibox_ip: string;
    zibox_mac: string;
    pc_ip: string;
  }>({
    zibox: '알 수 없음',
    ats: '알 수 없음',
    record: '알 수 없음',
    monit: '알 수 없음',
    zibox_ip: '알 수 없음',
    zibox_mac: '알 수 없음',
    pc_ip: '알 수 없음',
  });

  useEffect(() => {
    if (data) {
      let zibox_status = '';
      let ats_status = '';
      let record_status = '';
      let monit_status = '';
      if (data.zibox_status === 0 || data.zibox_status) {
        switch (data.zibox_status) {
          case -99:
            // 초기 로딩
            zibox_status = ZIBOX_TYPE.ZIBOX_LOAD;
            break;
          case 0:
          case -1:
            // 0은 연결 실패
            // -1은 연결 실패(에러 코드 확인)
            zibox_status = ZIBOX_TYPE.ZIBOX_DISCONNECTION;
            break;
          case 1:
            // 지박스 연결 완료
            zibox_status = ZIBOX_TYPE.ZIBOX_CONNECTION;
            break;

          default:
            break;
        }
      }
      if (data.ats_status === 0 || data.ats_status) {
        switch (data.ats_status) {
          case -2:
            ats_status = ZIBOX_TYPE.ATS_STOP_ERROR;
            break;
          case -1:
            ats_status = ZIBOX_TYPE.ATS_START_ERROR;
            break;
          case 0:
            // ATS 정지
            ats_status = ZIBOX_TYPE.ATS_STOP;
            break;
          case 2:
            ats_status = ZIBOX_TYPE.ATS_START;
            break;
          case 3:
            ats_status = ZIBOX_TYPE.ATS_PAUSE;
            break;
          case 4:
            ats_status = ZIBOX_TYPE.ATS_RESUME;
            break;
          default:
            break;
        }
      }
      if (data.record_status === 0 || data.record_status) {
        switch (data.record_status) {
          case -2:
            // 녹취 종료 에러 | STT 종료 에러
            record_status = ZIBOX_TYPE.RECORD_STOP_ERROR;
            break;
          case -1:
            // 녹취 시작 에러 | STT 시작 에러
            record_status = ZIBOX_TYPE.RECORD_START_ERROR;
            break;
          case 0:
            // 녹취 종료
            record_status = ZIBOX_TYPE.RECORD_STOP;
            break;
          case 2:
            // 녹취 시작
            record_status = ZIBOX_TYPE.RECORD_START;
            break;
          default:
            break;
        }
      }
      if (data.monit_status === 0 || data.monit_status) {
        switch (data.monit_status) {
          case -1:
            // 감청 에러
            monit_status = ZIBOX_TYPE.MONIT_ERROR;
            break;
          case 0:
            // 감청 종료
            monit_status = ZIBOX_TYPE.MONIT_STOP;
            break;
          case 1:
            // 감청 시작
            monit_status = ZIBOX_TYPE.MONIT_START;
            break;
          default:
            break;
        }
      }

      setStatus((zibox) => {
        let temp = {
          ...zibox,
        };

        if (zibox_status) {
          temp['zibox'] = zibox_status;
        }
        if (ats_status) {
          temp['ats'] = ats_status;
        }
        if (record_status) {
          temp['record'] = record_status;
        }
        if (monit_status) {
          temp['monit'] = monit_status;
        }
        if (
          data.zibox_ip !== '알 수 없음' &&
          zibox.zibox_ip !== data.zibox_ip
        ) {
          temp['zibox_ip'] = data.zibox_ip || '알 수 없음';
        }
        if (
          data.zibox_mac !== '알 수 없음' &&
          zibox.zibox_mac !== data.zibox_mac
        ) {
          temp['zibox_mac'] = data.zibox_mac || '알 수 없음';
        }
        if (data.pc_ip !== '알 수 없음' && zibox.pc_ip !== data.pc_ip) {
          temp['pc_ip'] = data.pc_ip || '알 수 없음';
        }

        return temp;
      });
    }
  }, [data]);

  return (
    <StyledWrapper>
      <StyledTitle>
        <Text fontWeight={600} fontColor={COLORS.blue}>
          ZIBOX
        </Text>
      </StyledTitle>
      <StyledZibox>
        <Text fontWeight={600} fontSize={0.9} fontColor={COLORS.dark_blue}>
          {`ZIBOX IP : ${status.zibox_ip}`}
        </Text>
        <Text fontWeight={600} fontSize={0.9} fontColor={COLORS.dark_blue}>
          {`ZIBOX MAC : ${status.zibox_mac}`}
        </Text>
        <Text fontWeight={600} fontSize={0.9} fontColor={COLORS.dark_blue}>
          {`상담원 PC IP : ${status.pc_ip}`}
        </Text>

        <Text fontWeight={600} fontSize={0.9} fontColor={COLORS.dark_blue}>
          {`연결 상태 : ${status.zibox} (${data.zibox_status})`}
        </Text>
        <Text fontWeight={600} fontSize={0.9} fontColor={COLORS.dark_blue}>
          {`ATS : ${status.ats} (${data.ats_status})`}
        </Text>
        <Text fontWeight={600} fontSize={0.9} fontColor={COLORS.dark_blue}>
          {`녹취(STT) : ${status.record} (${data.record_status})`}
        </Text>
        <Text fontWeight={600} fontSize={0.9} fontColor={COLORS.dark_blue}>
          {`감청 : ${status.monit} (${data.monit_status})`}
        </Text>
      </StyledZibox>
    </StyledWrapper>
  );
}

interface ZiboxStatusProps {
  data: ConsultantInfoType;
}

ZiboxStatus.defaultProps = {};

export default React.memo(ZiboxStatus);
