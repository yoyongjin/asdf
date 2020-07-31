import React, { useEffect } from 'react';
import { RouteComponentProps } from 'react-router-dom';

import { Image } from 'components/atoms';
import { LoginTemplate } from 'components/templates';
// import useAuth from 'hooks/useAuth';

import ziboxLogo from 'images/zibox-sn@2x.png';
import dblifeLogo from 'images/db-logo-login@3x.png';

function AuthPage({ history }: AuthPageProps) {
  // const { onCheckLogin } = useAuth();
  
  // useEffect(() => {
  //   onCheckLogin(history);
  // }, [onCheckLogin, history]);

  return (
    <LoginTemplate
      mainLogo={<Image src={dblifeLogo} alt={ziboxLogo} width={'100%'}/>}
      subLogo={
        <Image src={ziboxLogo} alt={ziboxLogo} width={10} height={3.5} />
      }
    />
  );
}

interface AuthPageProps extends RouteComponentProps {}

export default AuthPage;
