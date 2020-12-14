import React, { useEffect, useMemo } from 'react';
import { RouteComponentProps } from 'react-router-dom';

import { GNB } from 'components/organisms';
import { MainTemplate } from 'components/templates';
import useAuth from 'hooks/useAuth';
import useSocket from 'hooks/useSocket';
import { COLORS } from 'utils/color';

import dblifeLogo from 'images/db-logo-cont@3x.png';
import loginTimeImage from 'images/bg-login-time@3x.png';
import useZibox from 'hooks/useZibox';

function MainPage({ history, location }: MainPageProps) {
  const { loginInfo, onCheckLogin, onClickLogout } = useAuth();
  const {
    getAllCallStatus,
    getChangeStatus,
    getInitCallStatus,
    getUserInfo,
  } = useSocket();
  const { setEvent } = useZibox();

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
      onCheckLogin(history);
    }
  }, [loginInfo.id, history, onCheckLogin]);

  useEffect(() => {
    if (loginInfo.id) {
      // 로그인이 된 후 리스너 등록
      getAllCallStatus();
      getChangeStatus();
      getInitCallStatus();
      getUserInfo(loginInfo.branch_id, loginInfo.admin_id);
      setEvent();
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
  ]);

  return (
    <MainTemplate
      gnb={
        <GNB
          location={location}
          loginInfo={loginInfo}
          logoImg={dblifeLogo}
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
