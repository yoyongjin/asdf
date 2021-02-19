import { ConnectOption, Socket } from 'types/socket';
import { Zibox } from 'types/zibox';
import Logger from 'utils/log';

class OCX implements Zibox, Socket {
  private socket: any;

  /**
   * @description 소켓 연결하기
   * @param options 연결 옵션
   */
  async connect(options: ConnectOption) {
    Logger.log('[OCX] Connect OCX', JSON.stringify(options));
    return new Promise((resolve, reject) => {
      this.socket.SocketCreate(options.url, options.key);
      resolve(true);
    });
  }

  /**
   * @description 객체 생성하기
   */
  create() {
    Logger.log('[OCX] Create OCX');
    this.socket = (window as any).ZiBoxMonitor;
    return true;
  }

  /**
   * @description 소켓 연결 끊기
   */
  disconnect() {
    Logger.log('[OCX] Disconnect OCX');
    try {
      this.socket.SocketClose();
      this.socket = null;
      // this.number = '';
      // this.user = 0;
    } catch (error) {
      Logger.log('[OCX] Disconnect OCX ERROR', error);
    }
    // return this.number;
  }

  /**
   * -3 서버를 찾을 수 없음
   * -2 비정상 종료
   * -1 사용자 종료
   * 0  연결 실패
   * 1  연결 성공
   */
  onConnectEventHandler(callback: (parameters: number) => void) {
    Logger.log('[OCX] Register Connect Event');
    this.socket.DevConnect = (message: string) => {
      Logger.log(`[OCX] DevConnect`, message);
      callback(Number(message));
    };
  }

  onMonitorEventHandler() {}

  onChangeStatusEventHandler() {}
}

export default OCX;
