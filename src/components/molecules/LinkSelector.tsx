import React, { useState, useEffect } from 'react';
import styled, { css } from 'styled-components';
import { Location } from 'history';

import { Link, Text } from 'components/atoms';
import { COLORS } from 'utils/color';

const StyledWrapper = styled.div`
  /* Display   */
  height: 100%;
  width: 100%;
`;

const StyledMonitoring = styled.span<StyledProps>`
  /* Position */
  padding-left: 7px;
  padding-right: 7px;

  /* Display   */
  display: inline-block;
  height: calc(100% - 6px);
  ${(props) => {
    if (props.check === 1) {
      return css`
        border-bottom: 6px solid ${COLORS.light_gray};
      `;
    }
  }}
`;

const StyledGroup = styled.span<StyledProps>`
  /* Position */
  margin-left: 48px;
  margin-right: 24px;
  padding-left: 7px;
  padding-right: 7px;

  /* Display   */
  display: inline-block;
  height: calc(100% - 6px);
  ${(props) => {
    if (props.check === 2) {
      return css`
        border-bottom: 6px solid ${COLORS.light_gray};
      `;
    }
  }}
`;

const StyledUser = styled.span<StyledProps>`
  /* Position */
  margin-left: 24px;
  padding-left: 7px;
  padding-right: 7px;

  /* Display */
  height: calc(100% - 6px);
  display: inline-block;
  ${(props) => {
    if (props.check === 3) {
      return css`
        border-bottom: 6px solid ${COLORS.light_gray};
      `;
    }
  }}
`;

function LinkSelector({ location }: LinkSelectorProps) {
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
          <Text fontColor={COLORS.white} fontWeight={700}>
            모니터링
          </Text>
        </Link>
      </StyledMonitoring>
      <StyledGroup check={visible}>
        <Link path="/main/manage/organization" onClick={() => setVisible(2)}>
          <Text fontColor={COLORS.white} fontWeight={700}>
            조직 관리
          </Text>
        </Link>
      </StyledGroup>
      <StyledUser check={visible}>
        <Link path="/main/manage/user" onClick={() => setVisible(3)}>
          <Text fontColor={COLORS.white} fontWeight={700}>
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
  location: Location;
}

export default LinkSelector;
