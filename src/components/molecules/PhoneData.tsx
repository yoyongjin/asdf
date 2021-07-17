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
      case 0:
        // 전부 끊어진 상태
        return PHONE_TYPE.DISCONNECTION;
      case 1:
        // WEB만 연결
        return PHONE_TYPE.WEB_CONNECTION;
      case 2:
        // PHONE만 연결
        return PHONE_TYPE.PHONE_CONNECTION;
      case 3:
        // 둘 다 연결
        return PHONE_TYPE.BOTH_CONNECTION;
      default:
        return '';
    }
  }, [data]);

  return (
    <StyledWrapper>
      <StyledTitle>
        <Text fontFamily="NanumBarunGothic" fontSize={18} fontWeight={800}>
          PHONE
        </Text>
      </StyledTitle>
      <StyledPhone>
        <Text
          fontColor={Colors.gray9}
          fontFamily="NanumBarunGothic"
          fontSize={15}
          fontWeight={600}
        >
          {`PHONE : ${getPhoneStatus()}`}
        </Text>
      </StyledPhone>
    </StyledWrapper>
  );
}

interface PhoneDataProps {
  data: PhoneStatus;
}

PhoneData.defaultProps = {};

export default PhoneData;
