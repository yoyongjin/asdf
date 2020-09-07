import React, { useEffect, useMemo } from 'react';
import { RouteComponentProps } from 'react-router-dom';

import { GNB } from 'components/organisms';
import { MainTemplate } from 'components/templates';
import { COLORS } from 'utils/color';
import useAuth from 'hooks/useAuth';
import useSocket from 'hooks/useSocket';

import dblifeLogo from 'images/db-logo-cont@3x.png';
import loginTimeImage from 'images/bg-login-time@3x.png';

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
  }, [location.pathname]);

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
      getUserInfo(loginInfo.branch_id, loginInfo.admin_id);
      getChangeState();
    }
  }, [loginInfo.id, loginInfo.branch_id, loginInfo.admin_id, getInitInfo, getAllCallState, getUserInfo, getChangeState]);

  console.log("Lendering MainPage")
  return (
    <MainTemplate
      gnb={
        <GNB
          logo={dblifeLogo}
          loginTimeImage={loginTimeImage}
          loginInfo={loginInfo}
          location={location}
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
