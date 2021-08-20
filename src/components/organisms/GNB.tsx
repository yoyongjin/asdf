import React from 'react';
import styled from 'styled-components';
import { Location } from 'history';

import { Image, Link } from 'components/atoms';
import { LinkSelector, UserLog } from 'components/molecules';
import { Colors } from 'utils/color';
import { LoginData } from 'types/auth';

import constants, { COMPANY_TYPE } from 'utils/constants';

const StyledWrapper = styled.div`
  /* Display */
  display: flex;
  height: 100%;
  width: 100%;

  /* Color */
  background-color: ${(props) => props.theme.color.gnb};
`;

const StyledLogo = styled.div`
  /* Position */
  margin-left: ${constants.COMPANY === COMPANY_TYPE.LINA ||
  constants.COMPANY === COMPANY_TYPE.DBLIFE
    ? 26
    : 0}px;
  margin-top: ${constants.COMPANY === COMPANY_TYPE.LINA ? 10 : 0}px;
  margin-right: 33px;
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

function GNB({ loginInfo, location, logoImage, onClickLogout }: GNBProps) {
  return (
    <StyledWrapper>
      <StyledLogo>
        <Link path="/main">
          <Image
            alt={'logo'}
            src={logoImage}
            width={
              constants.COMPANY === COMPANY_TYPE.DBLIFE
                ? 139
                : constants.COMPANY === COMPANY_TYPE.LINA
                ? 134
                : 132
            }
            height={
              constants.COMPANY === COMPANY_TYPE.DBLIFE
                ? 52
                : constants.COMPANY === COMPANY_TYPE.LINA
                ? 34
                : 62
            }
          />
        </Link>
      </StyledLogo>
      <StyledLink>
        <LinkSelector permission={loginInfo.admin_id} location={location} />
      </StyledLink>
      <StyledUserLog>
        <UserLog
          loginTime={loginInfo.login_at}
          userName={loginInfo.name}
          onClickLogout={onClickLogout}
        />
      </StyledUserLog>
    </StyledWrapper>
  );
}

interface GNBProps {
  loginInfo: LoginData;
  logoImage: string;
  location: Location;
  onClickLogout: () => void;
}

GNB.defaultProps = {
  bgColor: Colors.navy2,
};

export default React.memo(GNB);
