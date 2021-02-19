import React, { useEffect, useMemo } from 'react';
import { RouteComponentProps } from 'react-router-dom';

import { GNB } from 'components/organisms';
import { MainTemplate } from 'components/templates';
import useAuth from 'hooks/useAuth';
import useOcx from 'hooks/useOcx';
import { COLORS } from 'utils/color';

// import dblifeLogo from 'images/db-logo-cont@3x.png';
import useZibox from 'hooks/useZibox';
import linaLogo from 'images/ln-logo-moni@3x.png';
import loginTimeImage from 'images/bg-login-time@3x.png';
import zmsLogo from 'images/zms/sub-gnb-logo.png';

import constants, { company, COMPANY_MAP, COMPANY_TYPE } from 'utils/constants';
import useSocket from 'hooks/useSocket';
import useCommunicator from 'hooks/useCommunicator';

function MainPage({ history, location }: MainPageProps) {
  const { loginInfo, onCheckLogin, onClickLogout } = useAuth();
  const { registerEventHandler } = useCommunicator();
  // const {
  //   getAllCallStatus,
  //   getChangeStatus,
  //   getInitCallStatus,
  //   getUserInfo,
  // } = useSocket();
  // const { setEvent } = useZibox();
  // const {
  //   createOcx,
  //   beforeUnload,
  //   connectServerOcx,
  //   getAllStateOcx,
  //   getMonitoringStateOcx,
  // } = useOcx();

  const bgColor = useMemo(() => {
    if (location.pathname === '/main') {
      return COLORS.light_gray;
    } else {
      return COLORS.white;
    }
  }, [location.pathname]);

  useEffect(() => {
    if (!loginInfo.id) {
      onCheckLogin(history);
    }
  }, [loginInfo.id, history, onCheckLogin]);

  useEffect(() => {
    if (loginInfo.id) {
      registerEventHandler();
    }
  }, [loginInfo.id, registerEventHandler]);

  return (
    <MainTemplate
      gnb={
        company === COMPANY_MAP.DBLIFE ? (
          company === COMPANY_MAP.LINA ? (
            <GNB
              location={location}
              loginInfo={loginInfo}
              logoImg={linaLogo}
              loginTimeImg={loginTimeImage}
              onClickLogout={() => onClickLogout(history)}
            />
          ) : (
            <GNB
              bgColor={COLORS.green}
              marginLeft={26}
              location={location}
              loginInfo={loginInfo}
              logoImg={zmsLogo}
              loginTimeImg={loginTimeImage}
              onClickLogout={() => onClickLogout(history)}
            />
          )
        ) : (
          <GNB
            bgColor={COLORS.dark_blue2}
            marginLeft={0}
            location={location}
            loginInfo={loginInfo}
            logoImg={zmsLogo}
            loginTimeImg={loginTimeImage}
            onClickLogout={() => onClickLogout(history)}
          />
        )
      }
      bgColor={bgColor}
    />
  );
}

interface MainPageProps extends RouteComponentProps {}

MainPage.defaultProps = {};

export default MainPage;
