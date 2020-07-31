import React, { useEffect } from 'react';
import { RouteComponentProps } from 'react-router-dom';

import { GNB } from 'components/organisms';
import { MainTemplate } from 'components/templates';
import { COLORS } from 'utils/color';

import dblifeLogo from 'images/db-logo-login.png';
import loggedTimeImage from 'images/bg-login-time@3x.png';
import useAuth from 'hooks/useAuth';

function MainPage({ history }: MainPageProps) {
  const { userInfo,  onCheckLogin, onClickLogout } = useAuth();

  useEffect(() => {
    if (!userInfo.id) {
      onCheckLogin(history);
    }
  }, [userInfo.id, onCheckLogin, history]);

  return (
    <MainTemplate
      gnb={
        <GNB
          logo={dblifeLogo}
          loginTime={loggedTimeImage}
          onClickLogout={() => onClickLogout(history)}
        />
      }
      bgColor={COLORS.light_gray}
    />
  );
}

interface MainPageProps extends RouteComponentProps {}

MainPage.defaultProps = {};

export default MainPage;
