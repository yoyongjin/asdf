import React, { useEffect } from 'react';

import { LinaLoginTemplate } from 'components/templates';
import useOcx from 'hooks/useOcx';

function AuthPage() {
  const { createOcx, connectServerOcx, beforeUnload } = useOcx();

  useEffect(() => {
    (window as any).ZiBoxMonitor.SocketClose();
  }, []);

  useEffect(() => {
    createOcx().then(() => {
      connectServerOcx();
      beforeUnload();
    });
  }, [createOcx, connectServerOcx, beforeUnload]);

  return <LinaLoginTemplate />;
}

interface AuthPageProps {}

export default AuthPage;
