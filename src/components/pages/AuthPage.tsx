import React, { useEffect } from 'react';

import { LinaLoginTemplate } from 'components/templates';
import useOcx from 'hooks/useOcx';

function AuthPage() {
  const { monit, createOcx, connectServerOcx, beforeUnload } = useOcx();

  useEffect(() => {
    createOcx().then(() => {
      connectServerOcx();
      beforeUnload(monit);
    });
  }, [monit, createOcx, connectServerOcx, beforeUnload]);

  return <LinaLoginTemplate />;
}

interface AuthPageProps {}

export default AuthPage;
