import { ConnectOption, Socket } from 'types/socket';
import { OCXTappingOption, Zibox } from 'types/zibox';
import constants from 'utils/constants';
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
   * @description 감청 시작
   */
  public startTapping(options: OCXTappingOption) {
    const port = constants.ZIBOX_PORT;
    Logger.log('[OCX] Start Tapping');
    this.socket.StartMonitor(options.ip, port, options.mode);
  }

  /**
   * @description 감청 종료
   */
  public async stopTapping() {
    Logger.log('[OCX] Stop Tapping');
    this.socket.stopMonitor();
  }

  /**
   * -3 서버를 찾을 수 없음
   * -2 비정상 종료
   * -1 사용자 종료
   * 0  연결 실패
   * 1  연결 성공
   */
  onConnectEventHandler(
    callback: (connection: number, timestamp: number) => void,
  ) {
    Logger.log('[OCX] Register Connect Event');
    this.socket.DevConnect = (message: string) => {
      Logger.log(`[OCX] DevConnect`, message);
      callback(1, 1);
    };
  }

  onMonitorEventHandler() {}

  onChangeStatusEventHandler() {
    console.log('Register Status Event');
    this.socket.DevPeerStatus = (message: string) => {
      console.log('@@@@@ DevPeerStatus Event Response @@@@@');
      console.log(message);

      const data = JSON.parse(message);
      const { status } = data;

      if (status === 'Y') {
        // callback(data);
      } else {
        // callback('Type ERROR');
      }
    };
  }

  /**
   * @description 이벤트 발신
   * @param name 이벤트명
   * @param data 전송 데이터
   */
  onEmit(name: string, data?: any) {
    try {
      Logger.log(`[OCX] Emit Message ${name}`, data);
      this.socket.emit(name, data!);
    } catch (error) {
      Logger.log(error);
    }
  }
}

export default OCX;
