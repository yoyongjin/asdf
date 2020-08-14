import React, { useEffect } from 'react';
import { RouteComponentProps } from 'react-router-dom';

import { GNB } from 'components/organisms';
import { MainTemplate } from 'components/templates';
import { COLORS } from 'utils/color';

import dblifeLogo from 'images/db-logo-login.png';
import loggedTimeImage from 'images/bg-login-time@3x.png';
import useAuth from 'hooks/useAuth';
import useSocket from 'hooks/useSocket';

function MainPage({ history, location }: MainPageProps) {
  const { loginInfo, onCheckLogin, onClickLogout } = useAuth();
  const { getInitInfo, getAllCallState, getUserInfo, getCallState } = useSocket();

  useEffect(() => {
    if (!loginInfo.id) {
      onCheckLogin(history, location);
    }
  }, [onCheckLogin, history, location]);

  useEffect(() => {
    if (loginInfo && loginInfo.id) {
      getInitInfo();
      getAllCallState();
      getUserInfo();
      getCallState();
    }
  }, [loginInfo, getInitInfo, getAllCallState, getUserInfo, getCallState]);

  let bgColor = '';
  if (location.pathname === '/main') {
    bgColor = COLORS.light_gray;
  }

  return (
    <MainTemplate
      gnb={
        <GNB
          logo={dblifeLogo}
          loginTimeImage={loggedTimeImage}
          loginInfo={loginInfo}
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
