import React, { useEffect, useMemo } from 'react';
import { RouteComponentProps } from 'react-router-dom';

import { GNB } from 'components/organisms';
import { MainTemplate } from 'components/templates';
import useAuth from 'hooks/useAuth';
import useOcx from 'hooks/useOcx';
import useZibox from 'hooks/useZibox';
import useSocket from 'hooks/useSocket';
import useCommunicator from 'hooks/useCommunicator';
import { Colors } from 'utils/color';
import constants, { COMPANY_TYPE } from 'utils/constants';

import dblifeLogo from 'images/db-logo-cont@3x.png';
import linaLogo from 'images/ln-logo-moni.png';
import defaultLogo from 'images/zms/sub-gnb-logo.png';

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
      return Colors.white1;
    } else {
      return Colors.white;
    }
  }, [location.pathname]);

  useEffect(() => {
    if (!loginInfo.id) {
      onCheckLogin(history);
    }
  }, [loginInfo.id, history, onCheckLogin]);

  useEffect(() => {
    if (loginInfo.id) {
      registerEventHandler(loginInfo.branch_id, loginInfo.admin_id);
    }
  }, [
    loginInfo.id,
    loginInfo.branch_id,
    loginInfo.admin_id,
    registerEventHandler,
  ]);

  return (
    <MainTemplate
      gnb={
        <GNB
          location={location}
          loginInfo={loginInfo}
          logoImage={
            constants.COMPANY === COMPANY_TYPE.DBLIFE
              ? dblifeLogo
              : constants.COMPANY === COMPANY_TYPE.LINA
              ? linaLogo
              : defaultLogo
          }
          onClickLogout={() => onClickLogout(history)}
        />
        // company === COMPANY_MAP.DBLIFE ? (
        //   company === COMPANY_MAP.LINA ? (
        //     <GNB
        //       location={location}
        //       loginInfo={loginInfo}
        //       logoImg={linaLogo}
        //       loginTimeImg={loginTimeImage}
        //       onClickLogout={() => onClickLogout(history)}
        //     />
        //   ) : (
        //     <GNB
        //       marginLeft={26}
        //       location={location}
        //       loginInfo={loginInfo}
        //       logoImg={zmsLogo}
        //       loginTimeImg={loginTimeImage}
        //       onClickLogout={() => onClickLogout(history)}
        //     />
        //   )
        // ) : (
        //   <GNB
        //     marginLeft={0}
        //     location={location}
        //     loginInfo={loginInfo}
        //     logoImg={zmsLogo}
        //     loginTimeImg={loginTimeImage}
        //     onClickLogout={() => onClickLogout(history)}
        //   />
        // )
      }
      bgColor={bgColor}
    />
  );
}

interface MainPageProps extends RouteComponentProps {}

MainPage.defaultProps = {};

export default MainPage;
