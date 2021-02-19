import React from 'react';

import { Image } from 'components/atoms';
import {
  DBLoginTemplateProps,
  LinaLoginTemplate,
  LoginTemplate,
} from 'components/templates';
import constants, { COMPANY_TYPE } from 'utils/constants';

import dblifeLogo from 'images/logo/db-logo-login@3x.png';
import ziboxLogo from 'images/logo/zibox-sn@3x.png';
import zmsLogo from 'images/zms/main-visual.png';

function AuthPage() {
  return (
    <div>
      {constants.COMPANY === COMPANY_TYPE.DBLIFE ? (
        <DBLoginTemplateProps
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
      ) : constants.COMPANY === COMPANY_TYPE.LINA ? (
        <LinaLoginTemplate />
      ) : (
        <LoginTemplate
          mainLogo={
            <Image
              alt={'ZMS Logo'}
              src={zmsLogo}
              height={30.06}
              width={50.06}
            />
          }
        />
      )}
    </div>
  );
}

export default AuthPage;
