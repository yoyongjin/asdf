import React, { useState, useEffect } from 'react';
import styled, { css } from 'styled-components';
import { Location } from 'history';

import { Link, Text } from 'components/atoms';
import { Colors } from 'utils/color';

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

export const StyledCommonWhiteSpace = styled.span<StyledCommonWhiteSpaceProps>`
  padding-left: ${(props) => props.pixel}px;
  padding-right: ${(props) => props.pixel}px;
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
      <StyledLink visible={visible} type={1}>
        <Link path="/main">
          <Text fontColor={Colors.white} fontSize={16} fontWeight={700}>
            모니터링
          </Text>
        </Link>
      </StyledLink>
      <StyledCommonWhiteSpace pixel={23.5} />
      <StyledLink visible={visible} type={2}>
        <Link path="/main/manage/organization">
          <Text fontColor={Colors.white} fontSize={16} fontWeight={700}>
            조직 관리
          </Text>
        </Link>
      </StyledLink>
      <StyledCommonWhiteSpace pixel={18} />
      <StyledLink visible={visible} type={3}>
        <Link path="/main/manage/user">
          <Text fontColor={Colors.white} fontSize={16} fontWeight={700}>
            사용자 관리
          </Text>
        </Link>
      </StyledLink>
    </StyledWrapper>
  );
}

interface StyledLinkProps {
  visible: number;
  type: number;
}

interface StyledCommonWhiteSpaceProps {
  pixel: number;
}

interface LinkSelectorProps {
  location: Location;
}

export default LinkSelector;
