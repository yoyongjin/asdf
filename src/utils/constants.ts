import Utils from 'utils/new_utils';

export const apiServer = process.env.REACT_APP_API_SERVER;
export const socketServer = process.env.REACT_APP_SOCKET_SERVER;
export const company = process.env.REACT_APP_COMPANY as String;
export const celeringServer = process.env.REACT_APP_CELERING_SERVER;
export const ziboxPort = process.env.REACT_APP_ZIBOX_PORT;
export const LIMIT = 30;
export const PAGE = 1;
export const TOKEN_NAME = '4d751c5adb209285c49f2140e1cfb01c';
export const DOMAIN = '.celering.io';
export const COMPANY_MAP = {
  DBLIFE: 'DBLIFE',
  LINA: 'LINA',
};
export const CONSULTANT_BOX_WIDTH = 200; //상담사 박스 너비

export const ZIBOX_TYPE = {
  ZIBOX_LOAD: 'LOAD',
  ZIBOX_CONNECTION: '연결',
  ZIBOX_DISCONNECTION: '연결 실패',
  ZIBOX_DISCONNECTION_ERRORCODE: '연결 실패(에러코드 확인)',
  ATS_START: 'ATS 재생',
  ATS_STOP: 'ATS 정지',
  ATS_PAUSE: 'ATS 일시 정지',
  ATS_RESUME: 'ATS 다시 재생',
  ATS_START_ERROR: 'ATS 재생 오류',
  ATS_STOP_ERROR: 'ATS 정지 오류',
  RECORD_START: '녹취 시작',
  RECORD_STOP: '녹취 종료',
  RECORD_START_ERROR: '녹취 시작 오류',
  RECORD_STOP_ERROR: '녹취 종료 오류',
  MONIT_START: '감청 시작',
  MONIT_STOP: '감청 종료',
  MONIT_ERROR: '감청 오류',
  MONIT_BUFFER_START: '버퍼링 시작',
  MONIT_BUFFER_STOP: '버퍼링 종료',
  MONIT_CONNECTION_TIMEOUT: '타임아웃',
};

export const PHONE_TYPE = {
  PHONE_LOAD: 'LOAD',
  OCX_CONNECTION: 'OCX만 연결',
  PHONE_CONNECTION: '법인폰만 연결',
  BOTH_CONNECTION: '전체 연결',
  PHONE_SERVER_ERROR: '연결 실패(서버 에러)',
  PHONE_CONNECTION_ERROR_01: '연결 실패(필요한 데이터가 없음)',
  PHONE_CONNECTION_ERROR_02: '연결 실패(서버를 찾을 수 없음)',
  PHONE_DISCONNECTION_01: '정상 접속 종료',
  PHONE_DISCONNECTION_02: '비정상 접속 종료',
  PHONE_DISCONNECTION_03: '법인폰이 끊어졌을 때',
  PHONE_RECONNECTION: '재연결',
};

export enum SOCKET_EVENT_TYPE {
  INITIALIZE = 'initialize',
  STATE = 'state',
  MONITORING = 'monitoring'
}

export enum ROUTER_TYPE {
  LOGIN = '/auth/login',
  MONIT = '/main',
}

export enum COMPANY_TYPE {
  DBLIFE = 'dblife',
  LINA = 'lina',
}

export enum ZIBOX_TRANSPORT {
  MQTT = 'mqtt',
  OCX = 'ocx',
}

export enum API_FETCH {
  SUCCESS = 'success',
  FAILURE = 'fail',
}

export enum SOCKET_CONNECTION {
  SUCCESS = 1,
  FAILURE = 0,
}

export enum MONITORING_STATUS {
  YES = 'y',
  NO = 'n',
}

export enum SOCKET_RESPONSE_STATUS {
  YES = 'Y',
  NO = 'N',
}

export enum CALL_STATUS {
  CALL_IDLE = 'call_idle',
  CALL_OFFHOOK = 'call_offhook',
  CALL_CONNECT = 'call_connect',
  CALL_INCOMMING = 'call_incomming',
}

export enum USER_TYPE {
  CONSULTANT = 0,
  ADMIN = 1,
  SUPER_ADMIN = 2,
}

export default {
  NODE_ENV: process.env.NODE_ENV,
  API_SERVER: process.env.REACT_APP_API_SERVER,
  SOCKET_SERVER: process.env.REACT_APP_SOCKET_SERVER,
  CELERING_SERVER: process.env.REACT_APP_CELERING_SERVER,
  COMPANY: process.env.REACT_APP_COMPANY,
  ZIBOX_PORT: process.env.REACT_APP_ZIBOX_PORT,
  TRANSPORT: Utils.checkBrowser() || process.env.REACT_APP_MODE,
  LIMIT: 30,
  PAGE: 1,
  COOKIE_DOMAIN: '.celering.io',
  COOKIE_NAME: '4d751c5adb209285c49f2140e1cfb01c',
};
