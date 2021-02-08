import React, { useEffect } from 'react';

import { LinaLoginTemplate } from 'components/templates';
import useOcx from 'hooks/useOcx';

import { Image } from 'components/atoms';
import { DBLoginTemplateProps, LoginTemplate } from 'components/templates';

import { company, COMPANY_MAP } from 'utils/constants';

import dblifeLogo from 'images/logo/db-logo-login@3x.png';
import ziboxLogo from 'images/logo/zibox-sn@3x.png';
import zmsLogo from 'images/zms/main-visual.png';

function AuthPage() {
  const { createOcx, connectServerOcx, beforeUnload } = useOcx();

  useEffect(() => {
    // (window as any).ZiBoxMonitor.SocketClose();
  }, []);

  useEffect(() => {
    // createOcx().then(() => {
    //   connectServerOcx();
    //   beforeUnload();
    // });
  }, [createOcx, connectServerOcx, beforeUnload]);

  return (
    <div>
      {company === COMPANY_MAP.DBLIFE ? (
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
      ) : company === COMPANY_MAP.LINA ? (
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

interface AuthPageProps {}

export default AuthPage;
