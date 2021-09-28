import _ from 'lodash';
import io from 'socket.io-client';

import SocketEventHandler from 'lib/socketEventHandler';
import { ResponseType } from 'types/common';
import { Socket as WebSocket, SocketConnectOption } from 'types/socket';
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
  connect(options: SocketConnectOption): Socket {
    Logger.log('[WEB SOCKET] Connect', options);

    this.key = options.key;
    this.socket = io.connect(options.url, {
      transports: ['websocket'],
    });

    this._socketEventHandler();

    return this;
  }

  /**
   * @description 연결끊기
   */
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
  emit(name: string, data: any) {
    Logger.log(`[WEB SOCKET] Emit Message ${name}`, data);
    this.socket?.emit(name, data!);
  }

  onMonitorEventHandler(callback: (packet: any) => void) {
    this.socket?.on(SOCKET_EVENT_TYPE.MONITORING, (message: string) => {
      Logger.log(`[WEB SOCKET] ${SOCKET_EVENT_TYPE.MONITORING}`, message);

      callback(message);
    });
  }

  private _socketEventHandler() {
    this.socket?.on('connect', (message: string) => {
      // 연결 성공 시
      Logger.log(`[WEB SOCKET] connect event`, message);

      this.emit('initialize', {
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

    this.socket?.on('monit_error', (message: string) => {
      // 감청 명령 시 에러 응답 리스너
      Logger.log(`[WEB SOCKET] monit_error event`, message);

      alert('감청 에러 : ' + message);
    });

    this.socket?.on('connect_error', (message: string) => {
      Logger.log('[WEB SOCKET] connect_error event', message);
    });

    this.socket?.io.on('open', (message: string) => {
      Logger.log('[WEB SOCKET] open event', message);
    });

    this.socket?.io.on('error', (message: string) => {
      Logger.log('[WEB SOCKET] error event', message);
    });

    this.socket?.io.on('close', (message: string) => {
      Logger.log('[WEB SOCKET] close event', message);
    });

    this.socket?.io.on('ping', (message: string) => {
      Logger.log('[WEB SOCKET] ping event', message);
    });

    this.socket?.io.on('packet', (message: string) => {
      Logger.log('[WEB SOCKET] packet event', message);
    });

    this.socket?.io.on('reconnect_attempt', (message: string) => {
      Logger.log('[WEB SOCKET] reconnect_attempt event', message);
    });

    this.socket?.io.on('reconnect', (message: string) => {
      Logger.log('[WEB SOCKET] reconnect event', message);
    });

    this.socket?.io.on('reconnect_error', (message: string) => {
      Logger.log('[WEB SOCKET] reconnect_error event', message);
    });

    this.socket?.io.on('reconnect_failed', (message: string) => {
      Logger.log('[WEB SOCKET] reconnect_failed event', message);
    });
  }
}

export default Socket;
