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
    this.socket.on('initialize', (message: {status: string, type: string}) => {
      console.log('initialize');
      console.log(message);
      const { status } = message;

      if(!Number(status)){
        // 연결 실패 시
        callback(false)
      }else {
        // 연결 성공 시
        callback(true)
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
    });
  }

  onMessageMonitoring(callback: (parameters: any) => void) {
    this.socket.on('monitoring', (message: string) => {
      console.log('monitoring');
      console.log(message)
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
    console.log(this.socket)
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

  onEmit(type: string, data?: any) {
    try {
      console.log('emit', type, data);
      this.socket.emit(type, data!);
    } catch (error) {
      console.log(error);
    }
  }
}

export default Socket;
