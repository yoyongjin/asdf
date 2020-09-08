import React from 'react';

import { Image } from 'components/atoms';
import { LoginTemplate } from 'components/templates';

import dblifeLogo from 'images/logo/db-logo-login@3x.png';
import ziboxLogo from 'images/logo/zibox-sn@3x.png';

function AuthPage() {
  return (
    <LoginTemplate
      mainLogo={
        <Image
          alt={'DB life Logo'}
          src={dblifeLogo}
          height={6.44}
          width={16.75}
        />
      }
      subLogo={
        <Image alt={'ZiBox Logo'} src={ziboxLogo} height={3.63} width={9} />
      }
    />
  );
}

interface AuthPageProps {}

export default AuthPage;
