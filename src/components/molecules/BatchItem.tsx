import React from 'react';
import styled from 'styled-components';

import { Button, Text } from 'components/atoms';
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
    value: '조직 인사 수동 배치',
    width: 20,
  },
  {
    backgroundColor: Colors.orange,
    borderRadius: 6,
    fontColor: Colors.white,
    fontFamily: 'Malgun Gothic',
    fontSize: 14,
    fontWeight: 800,
    id: 1,
    height: 5,
    value: 'KSVC 수동 배치',
    width: 20,
  },
  {
    backgroundColor: Colors.yellow4,
    borderRadius: 6,
    fontColor: Colors.white,
    fontFamily: 'Malgun Gothic',
    fontSize: 14,
    fontWeight: 800,
    id: 1,
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
    id: 1,
    height: 5,
    value: '법인폰 수동 배치',
    width: 20,
  },
];

const StyledButtonWrapper = styled.div`
  display: inline-block;
  padding: 20px;
`;

function BatchItem() {
  return (
    <div>
      {buttonData.map((values) => {
        return (
          <StyledButtonWrapper>
            <Button
              bgColor={values.backgroundColor}
              borderRadius={values.borderRadius}
              height={values.height}
              width={values.width}
              // onClick={onClickVisible}
            >
              <Text
                fontColor={values.fontColor}
                fontFamily={values.fontFamily}
                fontSize={values.fontSize}
                fontWeight={values.fontWeight}
              >
                {values.value}
              </Text>
            </Button>
          </StyledButtonWrapper>
        );
      })}
    </div>
  );
}

export default BatchItem;
