import React, { useEffect, useState } from 'react';
import styled from 'styled-components';

import { Text } from 'components/atoms';
import { ConsultantInfoType } from 'modules/types/user';
import { COLORS } from 'utils/color';
import { PHONE_TYPE } from 'utils/constants';

const StyledWrapper = styled.div`
  width: 100%;
  height: 100%;
`;

const StyledTitle = styled.div`
  width: 100%;
  height: 20px;
`;

const StyledPhone = styled.div`
  display: flex;
  flex-direction: column;
  height: calc(100% - 30px);
  margin-top: 10px;
`;

function PhoneStatus({ data }: PhoneStatusProps) {
  const [status, setStatus] = useState<{
    phone: string;
  }>({
    phone: '알 수 없음',
  });

  useEffect(() => {
    if (data) {
      let phone_status = '';
      if (data.phone_status === 0 || data.phone_status) {
        switch (data.phone_status) {
          case -99:
            // 초기 로딩
            phone_status = PHONE_TYPE.PHONE_LOAD;
            break;
          case -3:
            // 비정상 접속 종료
            phone_status = PHONE_TYPE.PHONE_DISCONNECTION_02;
            break;
          case -2:
            // 정상 접속 종료
            phone_status = PHONE_TYPE.PHONE_DISCONNECTION_01;
            break;
          case -1:
            // 서버를 찾을 수 없다
            phone_status = PHONE_TYPE.PHONE_CONNECTION_ERROR_02;
            break;
          case 0:
            // ocx만 연결
            phone_status = PHONE_TYPE.OCX_CONNECTION;
            break;
          case 1:
            // 법인폰만 연결
            phone_status = PHONE_TYPE.PHONE_CONNECTION;
            break;
          case 2:
            // 둘 다 연결
            phone_status = PHONE_TYPE.BOTH_CONNECTION;
            break;
          case 3:
            // 서버 에러(접속 실패)
            phone_status = PHONE_TYPE.PHONE_SERVER_ERROR;
            break;
          case 4:
            // 필요한 데이터가 존재하지 않음(접속 실패)
            phone_status = PHONE_TYPE.PHONE_CONNECTION_ERROR_01;
            break;
          default:
            break;
        }
      }

      setStatus({
        phone: phone_status || '알 수 없음',
      });
    }
  }, [data]);

  return (
    <StyledWrapper>
      <StyledTitle>
        <Text fontWeight={600} fontColor={COLORS.blue}>
          PHONE
        </Text>
      </StyledTitle>
      <StyledPhone>
        <Text fontWeight={600} fontSize={0.9} fontColor={COLORS.dark_blue}>
          {`PHONE : ${status.phone} (${data.phone_status})`}
        </Text>
      </StyledPhone>
    </StyledWrapper>
  );
}

interface PhoneStatusProps {
  data: ConsultantInfoType;
}

PhoneStatus.defaultProps = {};

export default React.memo(PhoneStatus);
