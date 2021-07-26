import _ from 'lodash';
import io from 'socket.io-client';

import SocketEventHandler from 'lib/socketEventHandler';
import { ResponseType } from 'types/common';
import { ConnectOption, Socket as WebSocket } from 'types/socket';
import { SOCKET_EVENT_TYPE, SOCKET_RESPONSE_STATUS } from 'utils/constants';
import Logger from 'utils/log';

class Socket implements WebSocket {
  private static instance: Socket;
  private socket: SocketIOClient.Socket | null = null;
  private key: number = 0;

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

    this.key = options.key;

    this.socket = io.connect(options.url, {
      transports: ['websocket'],
    });

    this.socketEventHandler();

    return this;
  }

  disconnect() {
    if (this.socket) {
      this.socket.close();
    }
  }

  /**
   * @description 이벤트 발신
   * @param name 이벤트명
   * @param data 전송 데이터
   */
  onEmit(name: string, data?: any) {
    try {
      Logger.log(`[WEB SOCKET] Emit Message ${name}`, data);
      this.socket?.emit(name, data!);
    } catch (error) {
      Logger.log(error);
    }
  }

  socketEventHandler() {
    this.socket?.on('connect', (message: string) => {
      // 연결 성공 시
      Logger.log(`[WEB SOCKET] connect event`, message);

      this.onEmit('initialize', {
        user_id: this.key,
      });
    });

    this.socket?.on('initialize', (message: string) => {
      // 초기 데이터 전달
      Logger.log(`[WEB SOCKET] initialize event`, message);
      const { status, data, type } = JSON.parse(message) as ResponseType;

      if (status === SOCKET_RESPONSE_STATUS.YES) {
        switch (type) {
          case 'init':
            const _data = _.cloneDeep(data);
            SocketEventHandler.connect(_data.connection, _data.timestamp);
            break;
          default:
            break;
        }
      }
    });

    this.socket?.on('state', (message: string) => {
      // 상태에 관련된 모든 데이터 응답 리스너
      Logger.log(`[WEB SOCKET] state event`, message);
      const { status, data, type } = JSON.parse(message) as ResponseType;

      if (status === SOCKET_RESPONSE_STATUS.YES) {
        // callback(type, data);
        SocketEventHandler.changeStatus(type, data);
      }
    });

    this.socket?.on('error', (message: string) => {
      Logger.log('Socket Error Event', message);
    });

    this.socket?.on('connect_error', (message: string) => {
      Logger.log('Socket Connect Error Event', message);
    });

    this.socket?.on('reconnect', (message: string) => {
      Logger.log('Socket Reconnect Event', message);
    });

    this.socket?.on('reconnect_attempt', (message: string) => {
      Logger.log('Socket Reconnect Attempt Event', message);
    });

    this.socket?.on('reconnecting', (message: string) => {
      Logger.log('Socket Reconnecting Event', message);
    });

    this.socket?.on('reconnect_error', (message: string) => {
      Logger.log('Socket Reconnect Error Event', message);
    });

    this.socket?.on('reconnect_failed', (message: string) => {
      Logger.log('Socket Reconnect Failed Event', message);
    });
  }

  onMonitorEventHandler(callback: (packet: any) => void) {
    this.socket?.on(SOCKET_EVENT_TYPE.MONITORING, (message: string) => {
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
}

export default Socket;
