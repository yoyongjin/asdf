import React from 'react';

import { Image } from 'components/atoms';
import { LoginTemplate } from 'components/templates';

import ziboxLogo from 'images/zibox-sn@2x.png';
import dblifeLogo from 'images/db-logo-login@3x.png';

function AuthPage() {
  return (
    <LoginTemplate
      mainLogo={<Image src={dblifeLogo} alt={ziboxLogo} />}
      subLogo={
        <Image src={ziboxLogo} alt={ziboxLogo} width={10} height={3.5} />
      }
    />
  );
}

export default AuthPage;
