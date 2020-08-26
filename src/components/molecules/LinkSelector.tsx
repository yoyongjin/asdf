import React, { useState, useEffect } from 'react';
import styled, { css } from 'styled-components';
import { History, Location } from 'history';

import { Link, Text } from 'components/atoms';
import { COLORS } from 'utils/color';

const StyledWrapper = styled.div`
  width: 100%;
  height: 100%;
`;

const StyledMonitoring = styled.span<StyledProps>`
  height: calc(100% - 6px);
  display: inline-block;
  padding-left: 7px;
  padding-right: 7px;
  ${(props) => {
    if (props.check === 1) {
      return css`
        border-bottom: 6px solid ${COLORS.light_gray};
      `;
    }
  }}
`;

const StyledGroup = styled.span<StyledProps>`
  height: calc(100% - 6px);
  display: inline-block;
  margin-left: 3rem;
  margin-right: 1.5rem;
  padding-left: 7px;
  padding-right: 7px;
  ${(props) => {
    if (props.check === 2) {
      return css`
        border-bottom: 6px solid ${COLORS.light_gray};
      `;
    }
  }}
`;

const StyledUser = styled.span<StyledProps>`
  height: calc(100% - 6px);
  display: inline-block;
  margin-left: 1.5rem;
  padding-left: 7px;
  padding-right: 7px;
  ${(props) => {
    if (props.check === 3) {
      return css`
        border-bottom: 6px solid ${COLORS.light_gray};
      `;
    }
  }}
`;

function LinkSelector({ history, location }: LinkSelectorProps) {
  const [visible, setVisible] = useState<number>(1);

  useEffect(() => {
    const { pathname } = location;
    if (pathname === '/main/manage/user') {
      setVisible(3);
    } else if (pathname === '/main/manage/organization') {
      setVisible(2);
    } else if (pathname === '/main') {
      setVisible(1);
    }
  }, [location]);

  return (
    <StyledWrapper>
      <StyledMonitoring check={visible}>
        <Link path="/main" onClick={() => setVisible(1)}>
          <Text
            fontColor={COLORS.white}
            fontWeight={700}
            fontFamily={'NanumGothic'}
          >
            모니터링
          </Text>
        </Link>
      </StyledMonitoring>
      <StyledGroup check={visible}>
        <Link path="/main/manage/organization" onClick={() => setVisible(2)}>
          <Text
            fontColor={COLORS.white}
            fontWeight={700}
            fontFamily={'NanumGothic'}
          >
            조직 관리
          </Text>
        </Link>
      </StyledGroup>
      <StyledUser check={visible}>
        <Link path="/main/manage/user" onClick={() => setVisible(3)}>
          <Text
            fontColor={COLORS.white}
            fontWeight={700}
            fontFamily={'NanumGothic'}
          >
            사용자 관리
          </Text>
        </Link>
      </StyledUser>
    </StyledWrapper>
  );
}

interface StyledProps {
  check: number;
}

interface LinkSelectorProps {
  history: History;
  location: Location;
}

export default LinkSelector;
