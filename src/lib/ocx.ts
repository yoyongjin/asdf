import { Zibox, OCXConntectOption } from 'types/zibox';
import Logger from 'utils/log';

class OCX implements Zibox {
  private socket!: any;

  /**
   * @description ocx 객체 생성하기
   */
  create() {
    Logger.log('[OCX] Create Zibox');
    return new Promise((resolve, reject) => {
      this.socket = (window as any).ZiBoxMonitor;
      console.log(this.socket);
      resolve(true);
    });
  }

  /**
   * @description ocx 소켓 연결하기
   * @param options ocx 연결 옵션
   */
  async connect(options: OCXConntectOption) {
    Logger.log('[OCX] Connect Zibox');
    try {
      this.socket.SocketCreate(options.address, options.key);
      return true;
    } catch (error) {
      console.log(error);
      return false;
    }
  }
}

export default OCX;
