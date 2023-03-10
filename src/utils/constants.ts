import Utils from './new_utils';

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

export enum STATISTICS_VERSION {
  ONE = 1,
  TWO = 2,
}

export enum AUTO_MESSAGE_VERSION {
  ONE = 1,
  TWO = 2,
}

export enum USED_PHONE_STATUS {
  DEFAULT = -1, // 클라이언트에서만 사용하는 값(값이 없을 경우 대체)
  OPEN = 0, // 개통
  PAUSE = 1, // 일시정지
  TERMINATION = 2, // 해지
  DISPOSE = 3, // 폐기
}

export enum CONSULTANT_TEXT_STATUS {
  LOGOUT = '로그아웃',
  WAIT = '대기중',
  INCOMMING = '수신중',
  OFFHOOK = '발신중',
  AFTER = '후처리',
  REST = '휴식',
  AWAY = '이석',
  DISCONNECT = '미연결',
  CALL = '통화중',
}

export enum ANSWER_VALUE {
  YES = 'Y',
  NO = 'N',
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
  COMPANY: process.env.REACT_APP_COMPANY,
  TRANSPORT: process.env.REACT_APP_MODE,
  ZIBOX_SERVER: process.env.REACT_APP_ZIBOX_SERVER,
  ZIBOX_VERSION: process.env.REACT_APP_ZIBOX_VERSION,
  STATISTICS_VERSION: Number(process.env.REACT_APP_STATISTICS_VERSION) || 1,
  LIMIT: 30,
  PAGE: 1,
  COOKIE_NAME: '4d751c5adb209285c49f2140e1cfb01c',
  AUTO_MESSAGE_VERSION: Number(process.env.REACT_APP_AUTO_MESSAGE_VERSION) || 1,
  VISIBLE_MENU: {
    MONITORING: process.env.REACT_APP_VISIBLE_MONITORING_MENU === 'true',
    ORGANISMS: process.env.REACT_APP_VISIBLE_ORGANISMS_MENU === 'true',
    USER: process.env.REACT_APP_VISIBLE_USER_MENU === 'true',
    STATISTICS: process.env.REACT_APP_VISIBLE_STATISTICS_MENU === 'true',
    MESSAGE: process.env.REACT_APP_VISIBLE_MESSAGE_MENU === 'true',
    PHONE: process.env.REACT_APP_VISIBLE_PHONE_MENU === 'true',
    BATCH: process.env.REACT_APP_VISIBLE_BATCH_MENU === 'true',
  },
  DEFAULT_ID: -1,
  PARSING_KEY: 'YxAdwk22Fx',
  IS_IE_BROWSER: Utils.checkBrowser() === 'ie' ? true : false,
  ADMIN: {
    ADD_USER:
      Number(process.env.REACT_APP_ADD_USER_ADMIN) >= USER_TYPE.CONSULTANT &&
      Number(process.env.REACT_APP_ADD_USER_ADMIN) <= USER_TYPE.SUPER_ADMIN
        ? Number(process.env.REACT_APP_ADD_USER_ADMIN)
        : USER_TYPE.SUPER_ADMIN, // 사용자 추가 권한
    MODIFY_USER:
      Number(process.env.REACT_APP_MODIFY_USER_ADMIN) >= USER_TYPE.CONSULTANT &&
      Number(process.env.REACT_APP_MODIFY_USER_ADMIN) <= USER_TYPE.SUPER_ADMIN
        ? Number(process.env.REACT_APP_MODIFY_USER_ADMIN)
        : USER_TYPE.SUPER_ADMIN, // 사용자 수정 권한
    REMOVE_USER:
      Number(process.env.REACT_APP_REMOVE_USER_ADMIN) >= USER_TYPE.CONSULTANT &&
      Number(process.env.REACT_APP_REMOVE_USER_ADMIN) <= USER_TYPE.SUPER_ADMIN
        ? Number(process.env.REACT_APP_REMOVE_USER_ADMIN)
        : USER_TYPE.SUPER_ADMIN, // 사용자 삭제 권한
    ADD_AUTO_MESSAGE:
      Number(process.env.REACT_APP_ADD_AUTO_MESSAGE_ADMIN) >=
        USER_TYPE.CONSULTANT &&
      Number(process.env.REACT_APP_ADD_AUTO_MESSAGE_ADMIN) <=
        USER_TYPE.SUPER_ADMIN
        ? Number(process.env.REACT_APP_ADD_AUTO_MESSAGE_ADMIN)
        : USER_TYPE.SUPER_ADMIN, // 자동 문자 추가 권한
    MODIFY_AUTO_MESSAGE:
      Number(process.env.REACT_APP_MODIFY_AUTO_MESSAGE_ADMIN) >=
        USER_TYPE.CONSULTANT &&
      Number(process.env.REACT_APP_MODIFY_AUTO_MESSAGE_ADMIN) <=
        USER_TYPE.SUPER_ADMIN
        ? Number(process.env.REACT_APP_MODIFY_AUTO_MESSAGE_ADMIN)
        : USER_TYPE.SUPER_ADMIN, // 자동 문자 수정 권한
    REMOVE_AUTO_MESSAGE:
      Number(process.env.REACT_APP_REMOVE_AUTO_MESSAGE_ADMIN) >=
        USER_TYPE.CONSULTANT &&
      Number(process.env.REACT_APP_REMOVE_AUTO_MESSAGE_ADMIN) <=
        USER_TYPE.SUPER_ADMIN
        ? Number(process.env.REACT_APP_REMOVE_AUTO_MESSAGE_ADMIN)
        : USER_TYPE.SUPER_ADMIN, // 자동 문자 삭제 권한
    MODIFY_MESSAGE_COUNT_ADMIN:
      Number(process.env.REACT_APP_MODIFY_MESSAGE_COUNT_ADMIN) >=
        USER_TYPE.CONSULTANT &&
      Number(process.env.REACT_APP_MODIFY_MESSAGE_COUNT_ADMIN) <=
        USER_TYPE.SUPER_ADMIN
        ? Number(process.env.REACT_APP_MODIFY_MESSAGE_COUNT_ADMIN)
        : USER_TYPE.SUPER_ADMIN, // 발송 문자 수량 수정 권한
    SHOW_PHONE_INFO_ADMIN:
      Number(process.env.REACT_APP_SHOW_PHONE_INFO_ADMIN) >=
        USER_TYPE.CONSULTANT &&
      Number(process.env.REACT_APP_SHOW_PHONE_INFO_ADMIN) <=
        USER_TYPE.SUPER_ADMIN
        ? Number(process.env.REACT_APP_SHOW_PHONE_INFO_ADMIN)
        : USER_TYPE.SUPER_ADMIN,
    MODIFY_PHONE_INFO_ADMIN:
      Number(process.env.REACT_APP_MODIFY_PHONE_INFO_ADMIN) >=
        USER_TYPE.CONSULTANT &&
      Number(process.env.REACT_APP_MODIFY_PHONE_INFO_ADMIN) <=
        USER_TYPE.SUPER_ADMIN
        ? Number(process.env.REACT_APP_MODIFY_PHONE_INFO_ADMIN)
        : USER_TYPE.SUPER_ADMIN,
    REMOVE_PHONE_INFO_ADMIN:
      Number(process.env.REACT_APP_REMOVE_PHONE_INFO_ADMIN) >=
        USER_TYPE.CONSULTANT &&
      Number(process.env.REACT_APP_REMOVE_PHONE_INFO_ADMIN) <=
        USER_TYPE.SUPER_ADMIN
        ? Number(process.env.REACT_APP_REMOVE_PHONE_INFO_ADMIN)
        : USER_TYPE.SUPER_ADMIN,
    SHOW_BATCH_ADMIN:
      Number(process.env.REACT_APP_SHOW_BATCH_ADMIN) >= USER_TYPE.CONSULTANT &&
      Number(process.env.REACT_APP_SHOW_BATCH_ADMIN) <= USER_TYPE.SUPER_ADMIN
        ? Number(process.env.REACT_APP_SHOW_BATCH_ADMIN)
        : USER_TYPE.SUPER_ADMIN,
    RESET_USER_PASSWORD_ADMIN:
      Number(process.env.REACT_APP_RESET_USER_PASSWORD_ADMIN) >=
        USER_TYPE.CONSULTANT &&
      Number(process.env.REACT_APP_RESET_USER_PASSWORD_ADMIN) <=
        USER_TYPE.SUPER_ADMIN
        ? Number(process.env.REACT_APP_RESET_USER_PASSWORD_ADMIN)
        : USER_TYPE.SUPER_ADMIN,
  },
};
