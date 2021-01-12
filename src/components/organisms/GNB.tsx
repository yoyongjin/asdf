import React from 'react';
import styled from 'styled-components';
import { Location } from 'history';

import { Image, Link } from 'components/atoms';
import { LinkSelector, UserLog } from 'components/molecules';
import { COLORS } from 'utils/color';
import { LoginInfoType } from 'types/auth';

import { company, COMPANY_MAP } from 'utils/constants'

const StyledWrapper = styled.div<StyledProps>`
  /* Display */
  display: flex;
  height: 100%;
  width: 100%;

  /* Color */
  background-color:  ${(props) => props.bgColor};
`;

const StyledLogo = styled.div<StyledLogoProps>`
  /* Position */
  margin-left: ${(props) => props.marginLeft}px;
`;

const StyledLink = styled.div`
  /* Position */
  padding-top: 22px;
  padding-left: 47px;

  /* Display */
  align-self: stretch;
  flex-grow: 1;
`;

const StyledUserLog = styled.div`
  /* Position */
  margin-right: 25px;
  /* Display */
  flex-grow: 2;
  float: right;
`;

function GNB({
  bgColor,
  marginLeft,
  loginInfo,
  location,
  loginTimeImg,
  logoImg,
  onClickLogout,
}: GNBProps) {
  return (
    <StyledWrapper bgColor={bgColor}>
      <StyledLogo marginLeft={marginLeft}>
        <Link path="/main">
          <Image
            alt={'DB life logo'}
            src={logoImg}
            width={company === COMPANY_MAP.DBLIFE ? 8.69 : 8.25}
            height={company === COMPANY_MAP.DBLIFE ? 3.25 : 3.875}
          />
        </Link>
      </StyledLogo>
      <StyledLink>
        <LinkSelector location={location} />
      </StyledLink>
      <StyledUserLog>
        <UserLog
          loginTime={loginInfo.login_at}
          userName={loginInfo.name}
          loginTimeImage={loginTimeImg}
          onClickLogout={onClickLogout}
        />
      </StyledUserLog>
    </StyledWrapper>
  );
}

interface StyledProps {
  bgColor: string;
}
interface StyledLogoProps {
  marginLeft: number;
}

interface GNBProps extends StyledProps, StyledLogoProps
{
  loginInfo: LoginInfoType;
  loginTimeImg: string;
  logoImg: string;
  location: Location;
  onClickLogout: () => void;
}

GNB.defaultProps = {
  bgColor: COLORS.dark_blue2,
  marginLeft: 0
};

export default React.memo(GNB);
