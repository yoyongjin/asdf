import React, { useState, useEffect, Fragment } from 'react';
import styled, { css } from 'styled-components';
import { Location } from 'history';

import { Link, Text } from 'components/atoms';
import { StyledCommonBothWhiteSpace } from 'styles/common';
import { Colors } from 'utils/color';
import constants, { AUTO_MESSAGE_VERSION, USER_TYPE } from 'utils/constants';

const StyledWrapper = styled.div`
  height: 100%;
  width: 100%;
`;

const StyledLink = styled.span<IStyledLink>`
  display: inline-block;
  height: calc(100% - 6px);
  text-align: center;

  ${(props) => {
    if (props.type === props.visible) {
      return css`
        border-bottom: 6px solid ${Colors.white1};
        transition-duration: 0.5s;
        transition-property: all;
        transition-timing-function: ease-out;
        width: 90px;
      `;
    }
  }}
`;

const LINK_DATA = [
  {
    isVisible: true,
    name: '모니터링',
    path: '/main',
    pixel: 0,
  },
  {
    isVisible: !constants.IS_AUTO_ORGANISMS,
    name: '조직 관리',
    path: '/main/manage/organization',
    pixel: 23.5,
  },
  {
    isVisible: true,
    name: '사용자 관리',
    path: '/main/manage/user',
    pixel: 18,
  },
  {
    isVisible: true,
    name: '통 계',
    path: '/main/manage/stat',
    pixel: 23.5,
  },
  {
    isVisible: constants.AUTO_MESSAGE_VERSION !== AUTO_MESSAGE_VERSION.ONE,
    name: '문자 설정',
    path: '/main/manage/sms',
    pixel: 23.5,
  },
];

function LinkSelector({ location, permission }: ILinkSelector) {
  const [visible, setVisible] = useState<number>(0);

  useEffect(() => {
    const [monitoring, organization, user, statistics, sms] = LINK_DATA;
    const { pathname } = location;

    if (pathname === sms.path) {
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
      {permission !== USER_TYPE.CONSULTANT &&
        LINK_DATA.map((data, index) => {
          if (!data.isVisible) {
            // 화면에서 보이지 않도록 하기
            return null;
          }

          return (
            <Fragment key={`LinkSelector-${data.path}`}>
              <StyledCommonBothWhiteSpace pixel={data.pixel} />
              <StyledLink type={index} visible={visible}>
                <Link path={data.path}>
                  <Text fontColor={Colors.white} fontSize={16} fontWeight={700}>
                    {data.name}
                  </Text>
                </Link>
              </StyledLink>
            </Fragment>
          );
        })}
    </StyledWrapper>
  );
}

interface IStyledLink {
  type: number;
  visible: number;
}

interface ILinkSelector {
  location: Location;
  permission: number;
}

export default LinkSelector;
