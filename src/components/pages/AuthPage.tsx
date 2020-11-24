import React from 'react';

import { Image } from 'components/atoms';
import { LoginTemplate, ZmsLoginTemplate } from 'components/templates';

import { company, COMPANY } from 'utils/constants';

import dblifeLogo from 'images/logo/db-logo-login@3x.png';
import ziboxLogo from 'images/logo/zibox-sn@3x.png';
import zmsLogo from 'images/zms/main-visual.png'

function AuthPage() {
  return (
    <div>
    {
      company === COMPANY.DBLIFE ? 
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
      /> : 
      <ZmsLoginTemplate 
          mainLogo={
            <Image
                alt={'ZMS Logo'}
                src={zmsLogo}
                height={30.06}
                width={50.06}
            />
          }
      />
    }
    </div>
  );
}

interface AuthPageProps {}

export default AuthPage;
