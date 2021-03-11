import { DefaultTheme } from 'styled-components';

import { Colors } from 'utils/color';

const defaultTheme: DefaultTheme = {
  color: {
    login: Colors.black1,
    gnb: Colors.navy2,
    main: Colors.blue4,
    sub: Colors.blue3,
    button: Colors.blue6,
    text: Colors.white,
  }
};

const dblifeTheme: DefaultTheme = {
  color: {
    login: Colors.black1,
    gnb: Colors.navy2,
    main: Colors.blue4,
    sub: Colors.blue3,
    button: Colors.green3,
    text: Colors.white,
  },
};

const linaTheme: DefaultTheme = {
  color: {
    login: Colors.black1,
    gnb: Colors.navy2,
    main: Colors.blue4,
    sub: Colors.blue3,
    button: Colors.green3,
    text: Colors.white,
  },
};

export { defaultTheme, dblifeTheme, linaTheme };
