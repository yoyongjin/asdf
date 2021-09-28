export const apiServer = process.env.REACT_APP_API_SERVER;
export const celeringServer = process.env.REACT_APP_CELERING_SERVER;

export const ZIBOX_TYPE = {
  ZIBOX_CONNECTION: '연결',
  ZIBOX_DISCONNECTION: '연결 실패',
  ATS_START: 'ATS 재생',
  ATS_STOP: 'ATS 정지',
  ATS_PAUSE: 'ATS 일시 정지',
  ATS_ERROR: 'ATS 오류',
  RECORD_START: '녹취 시작',
  RECORD_STOP: '녹취 종료',
  RECORD_ERROR: '녹취 오류',
};

export const PHONE_TYPE = {
  WEB_CONNECTION: 'WEB만 연결',
  PHONE_CONNECTION: '법인폰만 연결',
  BOTH_CONNECTION: '둘 다 연결',
  DISCONNECTION: '둘 다 미연결',
};

export enum SOCKET_EVENT_TYPE {
  INITIALIZE = 'initialize',
  STATE = 'state',
  MONITORING = 'monitoring',
}

export enum ROUTER_TYPE {
  LOGIN = '/auth/login',
  MONIT = '/main',
  CHANGE_PASSWORD = '/user/password/change',
}

export enum COMPANY_TYPE {
  DBLIFE = 'dblife',
  LINA = 'lina',
}

export enum ZIBOX_TRANSPORT {
  MQTT = 'mqtt',
  OCX = 'ocx',
  PACKET = 'packet',
  SERVER = 'server',
}

export enum API_FETCH {
  SUCCESS = 'success',
  FAILURE = 'fail',
}

export enum SOCKET_CONNECTION {
  SUCCESS = 1,
  FAILURE = 0,
}

export enum RESPONSE_STATUS_V2 {
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

export enum CALL_STATUS_V2 {
  IDLE = 0,
  OFFHOOK = 1,
  CONNECT = 2,
  INCOMMING = 4,
}

export enum ZIBOX_MONIT_STATUS {
  STOP_REQUEST = -3,
  START_REQUEST = -2,
  ERROR = -1,
  DISABLE = 0,
  ENABLE = 1,
}

export enum CONSULTANT_STATUS {
  LOGOUT = -1,
  WAIT = 0,
  CALL = 1,
  AFTER = 2,
  REST = 3,
  AWAY = 4,
}

export enum USER_TYPE {
  CONSULTANT = 0,
  TEAM_ADMIN = 1,
  BRANCH_ADMIN = 2,
  ADMIN = 3,
  SUPER_ADMIN = 4,
}

export enum PHONE_STATUS {
  NOTHING = 0,
  WEB = 1,
  PHONE = 2,
  ALL = 3,
}

export enum ZIBOX_EVENT_TYPE {
  CONNECTION_INFO = 'connection_info',
  VOLUME_INFO = 'vol_info',
  MONITORING_INFO = 'mon_info',
}

export enum ZIBOX_VERSION {
  ZIBOX = 'zibox',
  ZIBOX2 = 'zibox2',
}

export const REG_EXR = {
  ip: /^(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/,
  mac: /([0-9a-fA-F]{2}-){5}[0-9a-fA-F]{2}/,
  id: /^[A-Za-z0-9]{4,32}$/,
  password:
    /^(?=.*[A-Za-z])(?=.*\d)(?=.*[$@$!%*#?&])[A-Za-z\d$@$!%*#?&]{8,32}$/,
};

export default {
  NODE_ENV: process.env.NODE_ENV,
  API_SERVER: process.env.REACT_APP_API_SERVER,
  SOCKET_SERVER: process.env.REACT_APP_SOCKET_SERVER,
  CELERING_SERVER: process.env.REACT_APP_CELERING_SERVER,
  COMPANY: process.env.REACT_APP_COMPANY,
  TRANSPORT: process.env.REACT_APP_MODE,
  ZIBOX_SERVER: process.env.REACT_APP_ZIBOX_SERVER,
  ZIBOX_VERSION: process.env.REACT_APP_ZIBOX_VERSION,
  LIMIT: 30,
  PAGE: 1,
  COOKIE_NAME: '4d751c5adb209285c49f2140e1cfb01c',
  ZIBOX_MONIT_OCX_PORT: 50014,
  ZIBOX_MONIT_OCX_MODE: 3,
};
