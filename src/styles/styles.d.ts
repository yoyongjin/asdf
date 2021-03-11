import 'styled-components';

declare module 'styled-components' {
  export interface DefaultTheme {
    color: {
      login: string;
      gnb: string;
      main: string;
      sub: string;
      button: string;
      text: string;
    };
  }
}
