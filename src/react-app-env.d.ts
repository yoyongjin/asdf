/// <reference types="react-scripts" />
declare namespace NodeJS {
  interface ProcessEnv {
    REACT_APP_API_SERVER: string;
    REACT_APP_SOCKET_SERVER: string;
    REACT_APP_COMPANY: string;
    REACT_APP_MODE: string;
  }
}
