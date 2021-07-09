import React, { useEffect, useMemo } from 'react';
import { RouteComponentProps } from 'react-router-dom';

import { GNB } from 'components/organisms';
import { MainTemplate } from 'components/templates';
import useAuth from 'hooks/useAuth';
import useCommunicator from 'hooks/useCommunicator';
import { Colors } from 'utils/color';
import constants, { COMPANY_TYPE } from 'utils/constants';

import dblifeLogo from 'images/db-logo-cont@3x.png';
import linaLogo from 'images/ln-logo-moni.png';
import defaultLogo from 'images/zms/sub-gnb-logo.png';

function MainPage({ location }: MainPageProps) {
  const { loginInfo, onCheckLogin, onClickLogout } = useAuth();
  const { registerEventHandler } = useCommunicator();

  const backgroundColor = useMemo(() => {
    if (location.pathname === '/main') {
      return Colors.white1;
    }

    return '';
  }, [location.pathname]);

  useEffect(() => {
    if (!loginInfo.id) {
      onCheckLogin();
    }
  }, [loginInfo.id, onCheckLogin]);

  useEffect(() => {
    if (loginInfo.id) {
      registerEventHandler(loginInfo.branch_id, loginInfo.admin_id);
    }
  }, [
    loginInfo.id,
    loginInfo.branch_id,
    loginInfo.admin_id,
    registerEventHandler,
  ]);

  return (
    <MainTemplate
      backgroundColor={backgroundColor}
      gnb={
        <GNB
          location={location}
          loginInfo={loginInfo}
          logoImage={
            constants.COMPANY === COMPANY_TYPE.DBLIFE
              ? dblifeLogo
              : constants.COMPANY === COMPANY_TYPE.LINA
              ? linaLogo
              : defaultLogo
          }
          onClickLogout={onClickLogout}
        />
      }
    />
  );
}

interface MainPageProps extends RouteComponentProps {}

MainPage.defaultProps = {};

export default MainPage;
