import React from 'react';
import styled from 'styled-components';
import { Location } from 'history';

import { Image, Link } from 'components/atoms';
import { LinkSelector, UserLog } from 'components/molecules';
import { COLORS } from 'utils/color';
import { SuccessLogin } from 'types/auth';

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
  margin-left: 26px;
  margin-top: ${constants.COMPANY === COMPANY_TYPE.LINA ? 10 : 0}px;
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
            width={8.38}
            height={
              constants.COMPANY === COMPANY_TYPE.DBLIFE
                ? 3.25
                : constants.COMPANY === COMPANY_TYPE.LINA
                ? 2.1
                : 3.875
            }
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
          onClickLogout={onClickLogout}
        />
      </StyledUserLog>
    </StyledWrapper>
  );
}

interface GNBProps {
  loginInfo: SuccessLogin;
  logoImage: string;
  location: Location;
  onClickLogout: () => void;
}

GNB.defaultProps = {
  bgColor: COLORS.dark_blue2,
};

export default React.memo(GNB);
