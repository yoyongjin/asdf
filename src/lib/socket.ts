import _ from 'lodash';
import io from 'socket.io-client';
import { ResponseType } from 'types/common';

import { ConnectOption, Socket as WebSocket } from 'types/socket';
import { SOCKET_EVENT_TYPE, SOCKET_RESPONSE_STATUS } from 'utils/constants';
import Logger from 'utils/log';

class Socket implements WebSocket {
  private static instance: Socket;
  private socket!: SocketIOClient.Socket;

  constructor() {
    if (Socket.instance) return Socket.instance;
    else Socket.instance = this;
  }

  static getInstance(): Socket {
    if (!Socket.instance) {
      Socket.instance = new Socket();
    }

    return Socket.instance;
  }

  /**
   * @description 연결하기
   * @param options 연결 옵션
   */
  connect(options: ConnectOption): Socket {
    Logger.log('[WEB SOCKET] Connect', options);
    if (!options.url) return this;

    this.socket = io.connect(options.url, {
      transports: ['websocket'],
    });
    return this;
  }

  disconnect() {
    alert('disconnect socket');
    this.onEmit('disconnect');
  }

  /**
   * @description 이벤트 발신
   * @param name 이벤트명
   * @param data 전송 데이터
   */
  onEmit(name: string, data?: any) {
    try {
      Logger.log(`[WEB SOCKET] Emit Message ${name}`, data);
      this.socket.emit(name, data!);
    } catch (error) {
      Logger.log(error);
    }
  }

  onConnectEventHandler(
    callback: (connection: number, timestamp: number) => void,
  ) {
    Logger.log('[WEB SOCKET] Register Connect Event');
    this.socket.on(SOCKET_EVENT_TYPE.INITIALIZE, (message: string) => {
      Logger.log(`[WEB SOCKET] ${SOCKET_EVENT_TYPE.INITIALIZE}`, message);
      const { status, data, type } = JSON.parse(message) as ResponseType;

      if (status === 'Y') {
        switch (type) {
          case 'init':
            const _data = _.cloneDeep(data);
            callback(_data.connection, _data.timestamp);
            break;
          default:
            break;
        }
      }
    });
  }

  onMonitorEventHandler(callback: (packet: any) => void) {
    this.socket.on(SOCKET_EVENT_TYPE.MONITORING, (message: string) => {
      Logger.log(`[WEB SOCKET] ${SOCKET_EVENT_TYPE.MONITORING}`, message);

      callback(message);
      // const data = JSON.parse(message);
      // const { status } = data;
      // if (status === 'Y') {
      //   callback(data);
      // } else {
      //   callback('error');
      // }
    });
  }

  onChangeStatusEventHandler(callback: (type: string, data: any) => void) {
    Logger.log('[WEB SOCKET] Register Change Status Event');
    this.socket.on(SOCKET_EVENT_TYPE.STATE, (message: string) => {
      // 상태에 관련된 모든 데이터 응답 리스너
      // Logger.log(`[WEB SOCKET] ${SOCKET_EVENT_TYPE.STATE}`, message);
      const { status, data, type } = JSON.parse(message) as ResponseType;

      if (status === SOCKET_RESPONSE_STATUS.YES) {
        callback(type, data);
      }
    });
  }

  onMessageInit(callback: (parameters: any) => void) {
    this.socket.on(
      'initialize',
      (message: { status: string; type: string }) => {
        console.log('initialize');
        console.log(message);
        const { status } = message;

        if (!Number(status)) {
          // 연결 실패 시
          callback(false);
        } else {
          // 연결 성공 시
          callback(true);
        }
        // const data = JSON.parse(message);

        // let parseData = {};

        // for (let key in data) {
        //   let parseValue = JSON.parse(data[key]);
        //   parseData = {
        //     ...parseData,
        //     [key]: parseValue,
        //   };
        // }

        // callback(parseData);
      },
    );
  }

  onMessageMonitoring(callback: (parameters: any) => void) {
    this.socket.on('monitoring', (message: string) => {
      console.log('monitoring');
      console.log(message);
      // const data = JSON.parse(message);
      // const { status } = data;
      // if (status === 'Y') {
      //   callback(data);
      // } else {
      //   callback('error');
      // }
    });
  }

  onMessageUser(callback: (parameters: any) => void) {
    // 사용자 등록 / 수정 / 삭제 시
    this.socket.on('user', (message: string) => {
      console.log('user');
      console.log(message);
      const data = JSON.parse(message);
      const { status } = data;
      if (status === 'Y') {
        callback(data);
      } else {
        callback('error');
      }
    });
  }

  onMessageAllCallStates(callback: (parameters: any) => void) {
    // 상담원 콜 상태 전부 가져오기
    console.log(this.socket);
    this.socket.on('all-state', (message: string) => {
      console.log('all-state');
      // console.log(message)
      // const data = JSON.parse(message);
      // callback(data);
    });
  }

  onMeesageCallState(callback: (parameters: any) => void) {
    // 상담원, 법인폰, 지박스 상태 변경 시
    // 전체 데이터도 여기로 전달
    this.socket.on('state', (message: string) => {
      console.log('state');
      console.log(message);
      const data = JSON.parse(message);
      const { status } = data;

      if (status === 'Y') {
        callback(data);
      } else {
        callback('Type ERROR');
      }
    });
  }
}

export default Socket;
