import React, { useEffect, useMemo } from 'react';
import { RouteComponentProps } from 'react-router-dom';

import { GNB } from 'components/organisms';
import { MainTemplate } from 'components/templates';
import { COLORS } from 'utils/color';

import dblifeLogo from 'images/logo/db-logo-login@3x.png';
import loginTimeImage from 'images/bg-login-time@3x.png';
import useAuth from 'hooks/useAuth';
import useSocket from 'hooks/useSocket';

function MainPage({ history, location }: MainPageProps) {
  const { loginInfo, onCheckLogin, onClickLogout } = useAuth();
  const {
    getInitInfo,
    getAllCallState,
    getUserInfo,
    getChangeState,
  } = useSocket();

  const bgColor = useMemo(() => {
    if (location.pathname === '/main') {
      return COLORS.light_gray;
    }
  }, [location]);

  useEffect(() => {
    if (!loginInfo.id) {
      // 로그인이 되있지 않을 경우
      onCheckLogin(history);
    }
  }, [loginInfo.id, onCheckLogin, history]);

  useEffect(() => {
    if (loginInfo.id) {
      // 로그인이 된 후 리스너 등록
      getInitInfo();
      getAllCallState();
      getUserInfo();
      getChangeState();
    }
  }, [loginInfo.id, getInitInfo, getAllCallState, getUserInfo, getChangeState]);

  console.log("Lendering MainPage")
  return (
    <MainTemplate
      gnb={
        <GNB
          logo={dblifeLogo}
          loginTimeImage={loginTimeImage}
          loginInfo={loginInfo}
          onClickLogout={() => onClickLogout(history)}
          location={location}
        />
      }
      bgColor={bgColor}
    />
  );
}

interface MainPageProps extends RouteComponentProps {}

MainPage.defaultProps = {};

export default MainPage;
