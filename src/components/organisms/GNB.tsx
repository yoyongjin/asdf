import React from 'react';
import styled from 'styled-components';
import { Location } from 'history';

import { Image, Link } from 'components/atoms';
import { LinkSelector, UserLog } from 'components/molecules';
import { COLORS } from 'utils/color';
import { LoginInfoType } from 'types/auth';

import { company, COMPANY_MAP } from 'utils/constants'

const StyledWrapper = styled.div`
  /* Display */
  display: flex;
  height: 100%;
  width: 100%;

  /* Color */
  background-color: ${company === COMPANY_MAP.LINA ? COLORS.blue : COLORS.dark_blue2};
`;

const StyledLogo = styled.div`
  /* Position */
  margin-top: ${company === COMPANY_MAP.LINA ? 10 : 0}px;
  margin-left: ${company === COMPANY_MAP.LINA ? 26 : 0}px;
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
  loginInfo,
  location,
  loginTimeImg,
  logoImg,
  onClickLogout,
}: GNBProps) {
  return (
    <StyledWrapper>
      <StyledLogo >
        <Link path="/main">
          <Image
            alt={'DB life logo'}
            src={logoImg}
            width={company === COMPANY_MAP.LINA ? 8.38 : 8.25}
            height={company === COMPANY_MAP.LINA ? 2.1 : 3.875}
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

interface GNBProps {
  loginInfo: LoginInfoType;
  loginTimeImg: string;
  logoImg: string;
  location: Location;
  onClickLogout: () => void;
}

export default React.memo(GNB);
