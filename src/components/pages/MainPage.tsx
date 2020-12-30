import React, { useEffect, useMemo } from 'react';
import { RouteComponentProps } from 'react-router-dom';

import { GNB } from 'components/organisms';
import { MainTemplate } from 'components/templates';
import useAuth from 'hooks/useAuth';
import useOcx from 'hooks/useOcx';
import { COLORS } from 'utils/color';

import linaLogo from 'images/ln-logo-moni@3x.png';
import loginTimeImage from 'images/bg-login-time@3x.png';
import zmsLogo from 'images/zms/sub-gnb-logo.png'

import { company, COMPANY } from 'utils/constants';

function MainPage({ history, location }: MainPageProps) {
  const { loginInfo, onCheckLogin, onClickLogout } = useAuth();
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
      getAllStateOcx(loginInfo.branch_id, loginInfo.admin_id);
      getMonitoringStateOcx();
      beforeUnload();
    }
  }, [
    loginInfo.id,
    loginInfo.admin_id,
    loginInfo.branch_id,
    getAllStateOcx,
    getMonitoringStateOcx,
    beforeUnload,
  ]);

  return (
    <MainTemplate
      gnb={
        company === COMPANY.LINA ? 
        <GNB
          location={location}
          loginInfo={loginInfo}
          logoImg={linaLogo}
          loginTimeImg={loginTimeImage}
          onClickLogout={() => onClickLogout(history)}
        /> : 
        <GNB
          location={location}
          loginInfo={loginInfo}
          logoImg={zmsLogo}
          loginTimeImg={loginTimeImage}
          onClickLogout={() => onClickLogout(history)}
        />
      }
      bgColor={bgColor}
    />
  );
}

interface MainPageProps extends RouteComponentProps {}

MainPage.defaultProps = {};

export default MainPage;
