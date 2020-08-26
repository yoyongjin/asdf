import React from 'react';
import styled from 'styled-components';
import { History, Location } from 'history';


import { Image, Link } from 'components/atoms';
import { LinkSelector, UserLog } from 'components/molecules';
import { COLORS } from 'utils/color';
import { loginInfoType } from 'modules/types/auth';

const StyledWrapper = styled.div`
  /* Display */
  width: 100%;
  height: 100%;
  display: flex;

  /* Color */
  background-color: ${COLORS.green};
`;

const StyledLogo = styled.div`
  /* Display */
  width: 8.6rem;
  height: 3rem;
  border-radius: 0 0 1rem 1rem;
  text-align: center;
  margin-left: 1.6rem;
  padding-top: 0.2rem;

  /* Color */
  background-color: ${COLORS.white};
`;

const StyledLink = styled.div`
  /* Display */
  flex-grow: 1;
  align-self: stretch;
  padding-top: 22px;
  padding-left: 47px;
`;

const StyledUserLog = styled.div`
  /* Display */
  flex-grow: 2;
  float: right;
  padding-right: 2rem;
`;

function GNB({ logo, loginTimeImage, loginInfo, onClickLogout, history, location }: GNBProps) {
  console.log('Lendering GNB');
  return (
    <StyledWrapper>
      <StyledLogo>
        <Link path="/main">
          <Image src={logo} alt={logo} width={6} height={2.5} />
        </Link>
      </StyledLogo>
      <StyledLink>
        <LinkSelector history={history} location={location}/>
      </StyledLink>
      <StyledUserLog>
        <UserLog
          userName={loginInfo.name}
          loginTime={loginInfo.login_at}
          loginTimeImage={loginTimeImage}
          onClickLogout={onClickLogout}
        />
      </StyledUserLog>
    </StyledWrapper>
  );
}

interface GNBProps {
  logo: string;
  loginTimeImage: string;
  loginInfo: loginInfoType;
  onClickLogout: () => void;
  history: History;
  location: Location;
}

export default GNB;
