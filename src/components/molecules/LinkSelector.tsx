import _ from 'lodash';
import React, { useState, useEffect, Fragment, useMemo } from 'react';
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
    isVisible: constants.VISIBLE_MENU.MONITORING,
    name: '모니터링',
    path: '/main',
    pixel: 0,
  },
  {
    isVisible: constants.VISIBLE_MENU.ORGANISMS,
    name: '조직 관리',
    path: '/main/manage/organization',
    pixel: 23.5,
  },
  {
    isVisible: constants.VISIBLE_MENU.USER,
    name: '사용자 관리',
    path: '/main/manage/user',
    pixel: 18,
  },
  {
    isVisible: constants.VISIBLE_MENU.STATISTICS,
    name: '통 계',
    path: '/main/manage/stat',
    pixel: 23.5,
  },
  {
    isVisible:
      constants.VISIBLE_MENU.MESSAGE &&
      constants.AUTO_MESSAGE_VERSION !== AUTO_MESSAGE_VERSION.ONE,
    name: '문자 설정',
    path: '/main/manage/message',
    pixel: 23.5,
  },
  {
    isVisible: constants.VISIBLE_MENU.PHONE,
    name: '법인폰 관리',
    path: '/main/manage/phone',
    pixel: 23.5,
  },
  {
    isVisible: constants.VISIBLE_MENU.BATCH,
    name: '배치',
    path: '/main/manage/batch',
    pixel: 23.5,
  },
];

function LinkSelector({ location, permission }: ILinkSelector) {
  const [visible, setVisible] = useState<number>(0);

  useEffect(() => {
    const [monitoring, organization, user, statistics, message, phone, batch] =
      LINK_DATA;
    const { pathname } = location;

    if (pathname === batch.path) {
      setVisible(6);
    } else if (pathname === phone.path) {
      setVisible(5);
    } else if (pathname === message.path) {
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

  const links = useMemo(() => {
    const linkData = _.cloneDeep(LINK_DATA);
    const [monitoring, organization, user, statistics, message, phone, batch] =
      linkData;

    if (permission < constants.ADMIN.SHOW_BATCH_ADMIN) {
      // 설정된 권한보다 로그인 권한이 작을 경우
      batch.isVisible = false;
    }

    if (permission < constants.ADMIN.SHOW_PHONE_INFO_ADMIN) {
      // 설정된 권한보다 로그인 권한이 작을 경우
      phone.isVisible = false;
    }

    return [monitoring, organization, user, statistics, message, phone, batch];
  }, [permission]);

  return (
    <StyledWrapper>
      {permission !== USER_TYPE.CONSULTANT &&
        links.map((data, index) => {
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
