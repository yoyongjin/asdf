import React, { useEffect, useMemo } from 'react';
import { RouteComponentProps } from 'react-router-dom';

import { GNB } from 'components/organisms';
import { MainTemplate } from 'components/templates';
import useAuth from 'hooks/useAuth';
import useSocket from 'hooks/useSocket';
import { COLORS } from 'utils/color';

import dblifeLogo from 'images/db-logo-cont@3x.png';
import zmsLogo from 'images/zms/sub-gnb-logo.png'
import loginTimeImage from 'images/bg-login-time@3x.png';

import { company, COMPANY } from 'utils/constants';

function MainPage({ history, location }: MainPageProps) {
  const { loginInfo, onCheckLogin, onClickLogout } = useAuth();
  const {
    getAllCallStatus,
    getChangeStatus,
    getInitCallStatus,
    getUserInfo,
  } = useSocket();

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
    }
  }, [
    loginInfo.id,
    loginInfo.admin_id,
    loginInfo.branch_id,
    getAllCallStatus,
    getChangeStatus,
    getInitCallStatus,
    getUserInfo,
  ]);

  return (
    <MainTemplate
      gnb={
        company === COMPANY.DBLIFE ? 
        <GNB
          bgColor={COLORS.green}
          marginLeft={26}
          location={location}
          loginInfo={loginInfo}
          logoImg={dblifeLogo}
          loginTimeImg={loginTimeImage}
          onClickLogout={() => onClickLogout(history)}
        /> :
        <GNB
          bgColor={COLORS.dark_blue2}
          marginLeft={0}
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
