import React, { useEffect, useMemo } from 'react';
import { RouteComponentProps } from 'react-router-dom';

import { GNB } from 'components/organisms';
import { MainTemplate } from 'components/templates';
import useAuth from 'hooks/useAuth';
import useOcx from 'hooks/useOcx';
// import useSocket from 'hooks/useSocket';
import { COLORS } from 'utils/color';

// import dblifeLogo from 'images/db-logo-cont@3x.png';
import linaLogo from 'images/ln-logo-moni@3x.png';
import loginTimeImage from 'images/bg-login-time@3x.png';

function MainPage({ history, location }: MainPageProps) {
  const { initSocket, loginInfo, onCheckLogin, onClickLogout } = useAuth();
  // const {
  //   getAllCallStatus,
  //   getChangeStatus,
  //   getInitCallStatus,
  //   getUserInfo,
  // } = useSocket();
  const { beforeUnload, connectServerOcx, getAllStateOcx, getMonitoringStateOcx } = useOcx();

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
    connectServerOcx();
    if (loginInfo.id) {
      // 로그인이 된 후 리스너 등록
      getAllStateOcx(loginInfo.branch_id, loginInfo.admin_id);
      getMonitoringStateOcx();
      beforeUnload();
      // IE_getMonitoringStatus();
      // getAllCallStatus();
      // getChangeStatus();
      // getInitCallStatus();
      // getUserInfo(loginInfo.branch_id, loginInfo.admin_id);
    }
  }, [
    loginInfo.id,
    loginInfo.admin_id,
    loginInfo.branch_id,
    connectServerOcx,
    getAllStateOcx,
    getMonitoringStateOcx,
    beforeUnload,
    // getAllCallStatus,
    // getChangeStatus,
    // getInitCallStatus,
    // getUserInfo,
    // IE_getMonitoringStatus,
  ]);

  return (
    <MainTemplate
      gnb={
        <GNB
          location={location}
          loginInfo={loginInfo}
          logoImg={linaLogo}
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
