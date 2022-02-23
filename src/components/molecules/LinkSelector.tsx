import React, { useState, useEffect } from 'react';
import styled, { css } from 'styled-components';
import { Location } from 'history';

import { Link, Text } from 'components/atoms';
import { StyledCommonBothWhiteSpace } from 'styles/common';
import { Colors } from 'utils/color';
import { USER_TYPE } from 'utils/constants';

const StyledWrapper = styled.div`
  /* Display   */
  height: 100%;
  width: 100%;
`;

const StyledLink = styled.span<StyledLinkProps>`
  /* Text */
  text-align: center;

  /* Display   */
  display: inline-block;
  height: calc(100% - 6px);
  ${(props) => {
    if (props.type === props.visible) {
      return css`
        width: 90px;
        border-bottom: 6px solid ${Colors.white1};
        transition-duration: 0.5s;
        transition-property: all;
        transition-timing-function: ease-out;
      `;
    }
  }}
`;

const LINK_DATA = [
  {
    name: '모니터링',
    path: '/main',
    pixel: 0,
  },
  {
    name: '조직 관리',
    path: '/main/manage/organization',
    pixel: 23.5,
  },
  {
    name: '사용자 관리',
    path: '/main/manage/user',
    pixel: 18,
  },
  {
    name: '통 계',
    path: '/main/manage/stat',
    pixel: 23.5,
  },
  {
    name: '알림 문자',
    path: '/main/manage/noti',
    pixel: 23.5,
  },
];

function LinkSelector({ location, permission }: LinkSelectorProps) {
  const [visible, setVisible] = useState<number>(0);

  useEffect(() => {
    const [monitoring, organization, user, statistics, notification] =
      LINK_DATA;
    const { pathname } = location;

    if (pathname === notification.path) {
      setVisible(4);
    } else if (pathname === statistics.path) {
      setVisible(3);
    } else if (pathname === user.path) {
      setVisible(2);
    } else if (pathname === organization.path) {
      setVisible(1);
    } else if (pathname === monitoring.path) {
      setVisible(0);
    }
  }, [location]);

  return (
    <StyledWrapper>
      {LINK_DATA.map((data, i) => {
        return (
          <>
            {permission === USER_TYPE.CONSULTANT ? null : (
              <>
                <StyledCommonBothWhiteSpace pixel={data.pixel} />
                <StyledLink visible={visible} type={i}>
                  <Link path={data.path}>
                    <Text
                      fontColor={Colors.white}
                      fontSize={16}
                      fontWeight={700}
                    >
                      {data.name}
                    </Text>
                  </Link>
                </StyledLink>
              </>
            )}
          </>
        );
      })}
    </StyledWrapper>
  );
}

interface StyledLinkProps {
  visible: number;
  type: number;
}

interface LinkSelectorProps {
  location: Location;
  permission: number;
}

export default LinkSelector;
