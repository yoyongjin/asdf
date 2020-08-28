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
          src={dblifeLogo}
          alt={'DB life Logo'}
          width={16.75}
          height={6.44}
        />
      }
      subLogo={
        <Image src={ziboxLogo} alt={'ZiBox Logo'} width={9} height={3.63} />
      }
    />
  );
}

interface AuthPageProps {}

export default AuthPage;
