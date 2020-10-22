export const apiServer = process.env.REACT_APP_API_SERVER;
export const socketServer = process.env.REACT_APP_SOCKET_SERVER;
export const celeringServer = process.env.REACT_APP_CELERING_SERVER;
export const ziboxPort = process.env.REACT_APP_ZIBOX_PORT;
export const LIMIT = 30;
export const PAGE = 1;
export const TOKEN_NAME = '4d751c5adb209285c49f2140e1cfb01c';
export const DOMAIN = '.celering.io';

export const CALL_TYPE = {
  CALL_IDLE: 'call_idle',
  CALL_OFFHOOK: 'call_offhook',
  CALL_CONNECT: 'call_connect',
};

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
