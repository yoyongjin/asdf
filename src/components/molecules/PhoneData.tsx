import React, { useCallback, useEffect, useState } from 'react';
import styled from 'styled-components';

import { Text } from 'components/atoms';
import { Colors } from 'utils/color';
import { PHONE_TYPE } from 'utils/constants';
import { PhoneStatus } from 'types/user';

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

function PhoneData({ data }: PhoneDataProps) {
  const getPhoneStatus = useCallback(() => {
    switch (data?.connection) {
      case -99:
        // 초기 로딩
        return PHONE_TYPE.PHONE_LOAD;
      case -4:
        // 법인폰과 서버가 끊어졌을 때
        return PHONE_TYPE.PHONE_DISCONNECTION_03;
      case -3:
        // 비정상 접속 종료
        return PHONE_TYPE.PHONE_DISCONNECTION_02;
      case -2:
        // 정상 접속 종료
        return PHONE_TYPE.PHONE_DISCONNECTION_01;
      case -1:
        // 서버를 찾을 수 없다
        return PHONE_TYPE.PHONE_CONNECTION_ERROR_02;
      case 0:
        // ocx만 연결
        return PHONE_TYPE.OCX_CONNECTION;
      case 1:
        // 법인폰만 연결
        return PHONE_TYPE.PHONE_CONNECTION;
      case 2:
        // 둘 다 연결
        return PHONE_TYPE.BOTH_CONNECTION;
      case 3:
        // 서버 에러(접속 실패)
        return PHONE_TYPE.PHONE_SERVER_ERROR;
      case 4:
        // 필요한 데이터가 존재하지 않음(접속 실패)
        return PHONE_TYPE.PHONE_CONNECTION_ERROR_01;
      case 6:
        return PHONE_TYPE.PHONE_RECONNECTION;
      default:
        return '';
    }
  }, [data]);

  return (
    <StyledWrapper>
      <StyledTitle>
        <Text fontWeight={600}>PHONE</Text>
      </StyledTitle>
      <StyledPhone>
        <Text fontWeight={600} fontSize={0.9} fontColor={Colors.gray9}>
          {`PHONE : ${getPhoneStatus()} (${
            data && data.connection ? data.connection : ''
          })`}
        </Text>
      </StyledPhone>
    </StyledWrapper>
  );
}

interface PhoneDataProps {
  data: PhoneStatus;
}

PhoneData.defaultProps = {};

export default React.memo(PhoneData);
