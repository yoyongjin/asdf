import React, { useEffect, useMemo } from 'react';
import { RouteComponentProps } from 'react-router-dom';

import { GNB } from 'components/organisms';
import { MainTemplate } from 'components/templates';
import useAuth from 'hooks/useAuth';
import useOcx from 'hooks/useOcx';
import { COLORS } from 'utils/color';

import dblifeLogo from 'images/db-logo-cont@3x.png';
import useZibox from 'hooks/useZibox';
import linaLogo from 'images/ln-logo-moni@3x.png';
import loginTimeImage from 'images/bg-login-time@3x.png';
import zmsLogo from 'images/zms/sub-gnb-logo.png';

import { company, COMPANY_MAP } from 'utils/constants';
import useSocket from 'hooks/useSocket';

function MainPage({ history, location }: MainPageProps) {
  const { loginInfo, onCheckLogin, onClickLogout } = useAuth();
  const {
    getAllCallStatus,
    getChangeStatus,
    getInitCallStatus,
    getUserInfo,
  } = useSocket();
  const { setEvent } = useZibox();
  const {
    createOcx,
    beforeUnload,
    connectServerOcx,
    getAllStateOcx,
    getMonitoringStateOcx,
  } = useOcx();

  const bgColor = useMemo(() => {
    if (location.pathname === '/main') {
      return COLORS.light_gray;
    } else {
      return COLORS.white;
    }
  }, [location.pathname]);

  useEffect(() => {
    if (!loginInfo.id) {
      // 로그인이 되있지 않을 경우
      createOcx().then(() => {
        connectServerOcx();
      });
      onCheckLogin(history);
    }
  }, [loginInfo.id, history, createOcx, connectServerOcx, onCheckLogin]);

  useEffect(() => {
    if (loginInfo.id) {
      // 로그인이 된 후 리스너 등록
      // getAllCallStatus();
      // getChangeStatus();
      // getInitCallStatus();
      // getUserInfo(loginInfo.branch_id, loginInfo.admin_id);
      // setEvent();
      // getAllStateOcx(loginInfo.branch_id, loginInfo.admin_id);
      // getMonitoringStateOcx();
      // beforeUnload();
    }
  }, [
    loginInfo.id,
    loginInfo.admin_id,
    loginInfo.branch_id,
    getAllCallStatus,
    getChangeStatus,
    getInitCallStatus,
    getUserInfo,
    setEvent,
    getAllStateOcx,
    getMonitoringStateOcx,
    beforeUnload,
  ]);

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
