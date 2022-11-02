import _ from 'lodash';
import React from 'react';
import styled from 'styled-components';

import { Button, Text } from 'components/atoms';
import useBatch from 'hooks/useBatch';
import useFetch from 'hooks/useFetch';
import { Colors } from 'utils/color';

const buttonData = [
  {
    backgroundColor: Colors.red3,
    borderRadius: 6,
    fontColor: Colors.white,
    fontFamily: 'Malgun Gothic',
    fontSize: 14,
    fontWeight: 800,
    id: 1,
    height: 5,
    value: '법인폰 일괄 등록 배치',
    width: 20,
  },
  {
    backgroundColor: Colors.orange,
    borderRadius: 6,
    fontColor: Colors.white,
    fontFamily: 'Malgun Gothic',
    fontSize: 14,
    fontWeight: 800,
    id: 2,
    height: 5,
    value: '조직 인사 수동 배치',
    width: 20,
  },
  {
    backgroundColor: Colors.yellow4,
    borderRadius: 6,
    fontColor: Colors.white,
    fontFamily: 'Malgun Gothic',
    fontSize: 14,
    fontWeight: 800,
    id: 3,
    height: 5,
    value: 'VDI IP 수동 배치',
    width: 20,
  },
  {
    backgroundColor: Colors.green4,
    borderRadius: 6,
    fontColor: Colors.white,
    fontFamily: 'Malgun Gothic',
    fontSize: 14,
    fontWeight: 800,
    id: 4,
    height: 5,
    value: 'KSVC 수동 배치',
    width: 20,
  },
];

const StyledButtonWrapper = styled.div`
  display: inline-block;
  padding: 20px;
`;

function BatchItem() {
  const {
    handleSyncBranchAndUser,
    handleSyncIP,
    handleSyncKSVC,
    handleSyncPhoneInfo,
  } = useBatch();
  const {
    syncBatchUserStatus,
    syncIPStatus,
    syncKSVCStatus,
    syncPhoneInfoStatus,
  } = useFetch();

  return (
    <div>
      {buttonData.map((values) => {
        let onClick: any;
        let text = '';

        if (values.id === 1) {
          // 법인폰 일괄 등록 배치
          onClick = syncPhoneInfoStatus
            ? () => null
            : _.debounce(() => handleSyncPhoneInfo(), 1000);
          text = syncPhoneInfoStatus ? '처리중...' : values.value;
        } else if (values.id === 2) {
          // 조직, 인사 수동 배치
          onClick = syncBatchUserStatus
            ? () => null
            : _.debounce(() => handleSyncBranchAndUser(), 1000);
          text = syncBatchUserStatus ? '처리중...' : values.value;
        } else if (values.id === 3) {
          // IP 수동 배치
          onClick = syncIPStatus
            ? () => null
            : _.debounce(() => handleSyncIP(), 1000);
          text = syncIPStatus ? '처리중...' : values.value;
        } else if (values.id === 4) {
          // KSVC 수동 배치
          onClick = syncKSVCStatus
            ? () => null
            : _.debounce(() => handleSyncKSVC(), 1000);
          text = syncKSVCStatus ? '처리중...' : values.value;
        }

        return (
          <StyledButtonWrapper>
            <Button
              bgColor={values.backgroundColor}
              borderRadius={values.borderRadius}
              height={values.height}
              width={values.width}
              onClick={onClick}
            >
              <Text
                fontColor={values.fontColor}
                fontFamily={values.fontFamily}
                fontSize={values.fontSize}
                fontWeight={values.fontWeight}
              >
                {text}
              </Text>
            </Button>
          </StyledButtonWrapper>
        );
      })}
    </div>
  );
}

export default BatchItem;
