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

  url(address: string): Promise<unknown> {
    return new Promise((resolve, reject) => {
      if (!address) return this;

      this.address = address;
      this.socket = (window as any).ZiBoxMonitor;
      resolve(this);
    });
  }

  getNumber(): string {
    return this.number!;
  }

  connect(key: number): MonitorOcx {
    console.log('Create Socket');
    setTimeout(() => {
      try {
        this.socket.SocketCreate(this.address, key);
      } catch (error) {
        console.log('ZiboxMonitor Create Socket ERROR');
        console.log(error);
      }
    }, 1000);

    return this;
  }

  disconnect() {
    console.log('Disconnect Socket');
    try {
      this.socket.SocketClose();
      this.socket = null;
      this.number = '';
      this.user = 0;
    } catch (error) {
      console.log('ZiboxMonitor Disconnect Socket ERROR');
      console.log(error);
    }

    return this.number;
  }

  onMessageConnect(callback: (parameters: number) => void) {
    console.log('Register Connect Event');
    this.socket.DevConnect = (message: string) => {
      console.log('@@@@@ DevConnect Event Response @@@@@');
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
    console.log('Register Status Event');
    this.socket.DevPeerStatus = (message: string) => {
      console.log('@@@@@ DevPeerStatus Event Response @@@@@');
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
    console.log('Register Monit Status Event');
    this.socket.DevMonitorStatus = (status: string, message: string) => {
      console.log('@@@@@ DevMonitorStatus Event Response @@@@@');
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
    mode = 1,
  ) {
    console.log('Start Monitoring');
    console.log(
      `ip: ${ip}`,
      `port: ${port}`,
      `mode: ${mode}`,
      `number: ${number}`,
      `user id: ${userId}`,
    );
    this.socket.StartMonitor(ip, port, mode);
    this.number = number;
    this.user = userId;
  }

  stopMonitor() {
    console.log('Stop Monitoring');
    if (this.number) {
      this.socket.stopMonitor();
    }
  }
}

export default MonitorOcx;
