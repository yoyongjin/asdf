import io from 'socket.io-client';

class Socket {
  private address?: string;
  private socket!: SocketIOClient.Socket;
  private static instance: Socket;

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

  url(address: string): Socket {
    if (!address) return this;

    this.address = address;
    this.socket = io.connect(this.address);

    return this;
  }

  onMessageInit(callback: (parameters: any) => void) {
    this.socket.on('initialize', (message: string) => {
      const data = JSON.parse(message);

      let parseData = {};

      for (let key in data) {
        let parseValue = JSON.parse(data[key]);
        parseData = {
          ...parseData,
          [key]: parseValue,
        };
      }

      callback(parseData);
    });
  }

  onMessageMonitoring(callback: (parameters: any) => void) {
    this.socket.on('monitoring', (message: string) => {
      const data = JSON.parse(message);
      const { status } = data;
      if (status === 'Y') {
        callback(data);
      } else {
        callback('error');
      }
    });
  }

  onMessageUser(callback: (parameters: any) => void) {
    // 사용자 등록 / 수정 / 삭제 시
    this.socket.on('user', (message: string) => {
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
    this.socket.on('call-state', (message: string) => {
      const data = JSON.parse(message);
      callback(data);
    });
  }

  onMeesageCallState(callback: (parameters: any) => void) {
    // 상담원 콜  상태 변경 시 가져오기
    this.socket.on('state', (message: string) => {
      const data = JSON.parse(message);
      const { status } = data;
      if (status === 'Y') {
        callback(data);
      } else {
        callback('error');
      }
    });
  }

  onEmit(type: string, data?: any) {
    try {
      this.socket.emit(type, data!);
    } catch (error) {
      console.log(error);
    }
  }
}

interface MonitoringState {
  monitoring_state: string;
  number: string;
  user_id?: number;
}

export default Socket;
