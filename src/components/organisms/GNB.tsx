import React from 'react';
import styled from 'styled-components';
import { Location } from 'history';

import { Image, Link } from 'components/atoms';
import { LinkSelector, UserLog } from 'components/molecules';
import { COLORS } from 'utils/color';
import { LoginInfoType } from 'types/auth';

const StyledWrapper = styled.div`
  /* Display */
  display: flex;
  height: 100%;
  width: 100%;

  /* Color */
  background-color: ${COLORS.blue};
`;

const StyledLogo = styled.div`
  /* Position */
  margin-top: 10px;
  margin-left: 26px;
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
      <StyledLogo>
        <Link path="/main">
          <Image
            alt={'DB life logo'}
            src={logoImg}
            width={8.38}
            height={2.1}
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
