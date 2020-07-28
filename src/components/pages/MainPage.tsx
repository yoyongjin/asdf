import React from 'react';

import { GNB } from 'components/organisms';
import { MainTemplate } from 'components/templates';
import { COLORS } from 'utils/color';

import dblifeLogo from 'images/db-logo-login.png';
import loggedTimeImage from 'images/bg-login-time@3x.png';

function MainPage() {
  return (
    <MainTemplate
      gnb={<GNB logo={dblifeLogo} loginTime={loggedTimeImage} />}
      bgColor={COLORS.light_gray}
    />
  );
}

interface MainPageProps {}

MainPage.defaultProps = {};

export default MainPage;
