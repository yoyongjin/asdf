import _ from 'lodash';

import SocketEventHandler from 'lib/socketEventHandler';
import { ResponseType } from 'types/common';
import { Socket, SocketConnectOption } from 'types/socket';
import { SOCKET_RESPONSE_STATUS } from 'utils/constants';
import Logger from 'utils/log';
import { ExternalObject } from 'types/zibox';

class SocketOCX implements Socket, ExternalObject {
  private _socket: any;
  private _key: number = 0;

  /**
   * @description 소켓 연결하기
   * @param options 연결 옵션
   */
  connect(options: SocketConnectOption) {
    Logger.log('[SOCKET OCX] Socket Connect OCX', JSON.stringify(options));

    this._socket.Connect(options.url);

    this._key = options.key;

    this._socketEventHandler();
  }

  /**
   * @description 객체 생성하기
   */
  create() {
    Logger.log('[SOCKET OCX] Create Socket OCX');
    this._socket = (window as any).IRSocketIOw;

    return true;
  }

  /**
   * @description 소켓 연결 끊기
   */
  disconnect() {
    Logger.log('[SOCKET OCX] Disconnect OCX');
    this._socket.Disconnect();
  }

  /**
   * @description 이벤트 발신
   * @param name 이벤트명
   * @param data 전송 데이터
   */
  emit(name: string, data: any) {
    Logger.log(`[SOCKET OCX] Emit Message ${name}`, JSON.stringify(data!));
    this._socket.Emit(name, JSON.stringify(data!));
  }

  private _socketEventHandler() {
    this._socket.OnConnect = (flag: number) => {
      // 연결 성공 시
      Logger.log(`[SOCKET OCX] connect event`, flag);

      if (flag === 1) {
        this.emit('initialize', {
          user_id: this._key,
        });
      }
    };

    this._socket.OnMessage = (name: string, message: any) => {
      Logger.log(`[SOCKET OCX] message event`, name, message);
      const { status, data, type } = JSON.parse(message) as ResponseType;

      if (status === SOCKET_RESPONSE_STATUS.YES) {
        switch (name) {
          case 'initialize':
            const _data = _.cloneDeep(data);
            SocketEventHandler.connect(_data.connection, _data.timestamp);
            break;
          case 'state':
            SocketEventHandler.changeStatus(type, data);
            break;
          default:
            break;
        }
      }
    };
  }
}

export default SocketOCX;
