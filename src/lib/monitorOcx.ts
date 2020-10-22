import { ziboxPort } from 'utils/constants';

class MonitorOcx {
  private address?: string;
  private socket!: any;
  private number?: string;
  private user?: number;
  private static instance: MonitorOcx;

  constructor() {
    if (MonitorOcx.instance) return MonitorOcx.instance;
    else MonitorOcx.instance = this;
  }

  static getInstance(): MonitorOcx {
    if (!MonitorOcx.instance) {
      MonitorOcx.instance = new MonitorOcx();
    }

    return MonitorOcx.instance;
  }

  url(address: string): MonitorOcx {
    if (!address) return this;

    this.address = address;
    this.socket = (window as any).ZiBoxMonitor;

    return this;
  }

  connect(key: number): MonitorOcx {
    console.log('@@@@@@@@@@SocketCreate@@@@@@@@@@');
    console.log(JSON.stringify(key));
    setTimeout(() => {
      try {
        this.socket.SocketCreate(this.address, key);
      } catch (error) {
        console.log('ZiboxMonitor ocx 소켓 연결 에러');
        console.log(error);
      }
    }, 3000);

    return this;
  }

  disconnect() {
    try {
      this.socket.SocketClose();
    } catch (error) {
      console.log('ZiboxMonitor ocx 소켓 연결 끊기 에러');
      console.log(error);
    }
  }

  onMessageConnect(callback: (parameters: number) => void) {
    console.log('onMessageConnect');
    (window as any).ZiBoxMonitor.DevConnect = (message: string) => {
      console.log('@@@@@@@@@@DevConnect@@@@@@@@@@');
      console.log(message);
      /**
       * -3 서버를 찾을 수 없음
       * -2 비정상 종료
       * -1 사용자 종료
       * 0  연결 실패
       * 1  연결 성공
       */
      callback(Number(message));
    };
  }

  onMessageStatus(callback: (parameter: string) => void) {
    console.log('onMessageStatus');
    (window as any).ZiBoxMonitor.DevPeerStatus = (message: string) => {
      console.log('@@@@@@@@@@DevPeerStatus@@@@@@@@@@');
      console.log(message);
      const data = JSON.parse(message);
      const { status } = data;

      if (status === 'Y') {
        callback(data);
      } else {
        callback('Type ERROR');
      }
    };
  }

  onMessageMonitorStatus(
    callback: (parameter: {
      status: number;
      number: string;
      user_id: number;
    }) => void,
  ) {
    console.log('onMessageMonitorStatus');
    this.socket.DevMonitorStatus = (status: string, message: string) => {
      console.log('@@@@@@@@@@DevMonitorStatus@@@@@@@@@@');
      console.log(status, message);
      /**
       * 0 감청 종료
       * 1 감청 시작
       * 2 버퍼링 시작
       * 3 버퍼링 종료
       * 4 타임아웃
       */

      callback({
        status: Number(status),
        number: this.number!,
        user_id: Number(status) === 1 ? this.user! : 0,
      });
    };
  }

  startMonitor(
    ip: string,
    number: string,
    userId: number,
    port: number = Number(ziboxPort),
    mode = 2,
  ) {
    console.log('@@@@@@@@@@StartMonitor@@@@@@@@@@');
    console.log(ip, port, mode, number, userId);
    this.socket.StartMonitor(ip, port, mode);
    this.number = number;
    this.user = userId;
  }

  stopMonitor() {
    console.log('@@@@@@@@@@StopMonitor@@@@@@@@@@');
    this.socket.stopMonitor();
  }
}

export default MonitorOcx;
