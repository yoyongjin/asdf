import React from 'react';

import { Image } from 'components/atoms';
import { LoginTemplate } from 'components/templates';

import ziboxLogo from 'images/zibox-sn@3x.png';
import dblifeLogo from 'images/db-logo-login@3x.png';

function AuthPage() {
  return (
    <LoginTemplate
      mainLogo={
        <Image src={dblifeLogo} alt={'지박스 로고'} width={16.75} height={6.4} />
      }
      subLogo={
        <Image src={ziboxLogo} alt={'DB생명 로고'} width={7.1} height={3.6} />
      }
    />
  );
}

interface AuthPageProps {}

export default AuthPage;
