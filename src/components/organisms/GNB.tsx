import React from 'react';
import styled from 'styled-components';
import { Location } from 'history';

import { Image, Link } from 'components/atoms';
import { LinkSelector, UserLog } from 'components/molecules';
import { COLORS } from 'utils/color';
import { LoginInfoType } from 'modules/types/auth';

const StyledWrapper = styled.div`
  /* Display */
  display: flex;
  height: 100%;
  width: 100%;

  /* Color */
  background-color: ${COLORS.green};
`;

const StyledLogo = styled.div`
  /* Position */
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
  loginTimeImage,
  logo,
  location,
  onClickLogout,
}: GNBProps) {
  console.log('Lendering GNB');
  return (
    <StyledWrapper>
      <StyledLogo>
        <Link path="/main">
          <Image src={logo} alt={'DB life logo'} width={8.69} height={3.25} />
        </Link>
      </StyledLogo>
      <StyledLink>
        <LinkSelector location={location} />
      </StyledLink>
      <StyledUserLog>
        <UserLog
          loginTime={loginInfo.login_at}
          loginTimeImage={loginTimeImage}
          userName={loginInfo.name}
          onClickLogout={onClickLogout}
        />
      </StyledUserLog>
    </StyledWrapper>
  );
}

interface GNBProps {
  loginInfo: LoginInfoType;
  loginTimeImage: string;
  logo: string;
  location: Location;
  onClickLogout: () => void;
}

export default React.memo(GNB);
