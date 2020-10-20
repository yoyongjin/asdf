import React, { useEffect } from 'react';

import { Image } from 'components/atoms';
import { LinaLoginTemplate, LoginTemplate } from 'components/templates';
import useOcx from 'hooks/useOcx';

// import dblifeLogo from 'images/logo/db-logo-login@3x.png';
// import linaLogo from 'images/ln-logo-moni@3x.png';
// import ziboxLogo from 'images/logo/zibox-sn@3x.png';

function AuthPage() {
  const { connectServerOcx } = useOcx();

  useEffect(() => {
    connectServerOcx();
  }, [connectServerOcx]);

  return <LinaLoginTemplate />;
}

interface AuthPageProps {}

export default AuthPage;
