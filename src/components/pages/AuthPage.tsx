import React from 'react';

import { Image, Text } from 'components/atoms';
import { LoginTemplate, LoginTemplateV2 } from 'components/templates';
import constants, { COMPANY_TYPE } from 'utils/constants';

import dblifeLogo from 'images/logo/db-logo-login@3x.png';
import ziboxLogo from 'images/logo/zibox-sn@3x.png';
import defaultLoginImage from 'images/main/main-visual.png';
import linaLoginImage from 'images/login-bg.png';
import { Colors } from 'utils/color';

function AuthPage() {
  return (
    <div>
      {constants.COMPANY === COMPANY_TYPE.DBLIFE ? (
        <LoginTemplateV2
          mainLogo={
            <Image
              alt="Main Logo"
              src={dblifeLogo}
              height={6.44}
              width={16.75}
            />
          }
          subLogo={
            <Image
              alt="ZiBox Monitoring System"
              src={ziboxLogo}
              height={3.63}
              width={9}
            />
          }
        />
      ) : (
        <>
          <LoginTemplate
            mainLogo={
              <Image
                alt="Main Logo"
                src={
                  constants.COMPANY === COMPANY_TYPE.LINA
                    ? linaLoginImage
                    : defaultLoginImage
                }
                height={480}
                width={800}
              />
            }
            subLogo={
              <Text
                fontColor={Colors.gray1}
                fontFamily={'FranklinGothicCondensed'}
                fontSize={12}
                fontWeight={500}
              >
                ⓒ IR-Link Corp.
              </Text>
            }
          />
        </>
      )}
    </div>
  );
}

export default AuthPage;
