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
import defaultLogoV2 from 'images/zms/sub-gnb-logo-v2.png';
import SocketEventHandler from 'lib/socketEventHandler';

function MainPage({ location }: MainPageProps) {
  const { loginInfo, onCheckLogin, onClickLogout } = useAuth();
  const {
    beforeUnloadEvent,
    setChangedStatus,
    setServerData,
    ziboxEvnetHandler,
  } = useCommunicator();

  const backgroundColor = useMemo(() => {
    if (location.pathname === '/main') {
      return Colors.white1;
    }

    return '';
  }, [location.pathname]);

  useEffect(() => {
    SocketEventHandler.connectEvent = (
      connection: number,
      timestamp: number,
    ) => {
      setServerData(connection, timestamp);
    };
  }, [setServerData]);

  useEffect(() => {
    beforeUnloadEvent();
  }, [beforeUnloadEvent]);

  useEffect(() => {
    if (loginInfo.id) {
      SocketEventHandler.changeStatusEvent = (type: string, data: any) => {
        setChangedStatus(
          loginInfo.id,
          loginInfo.branch_id,
          loginInfo.team_id,
          loginInfo.admin_id,
          type,
          data,
        );
      };
    }
  }, [
    loginInfo.admin_id,
    loginInfo.branch_id,
    loginInfo.id,
    loginInfo.team_id,
    setChangedStatus,
  ]);

  useEffect(() => {
    if (loginInfo.id) {
      ziboxEvnetHandler();
    }
  }, [loginInfo.id, ziboxEvnetHandler]);

  useEffect(() => {
    if (!loginInfo.id) {
      onCheckLogin();
    }
  }, [loginInfo.id, onCheckLogin]);

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
              : defaultLogoV2
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
