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

  onEmit(type: string, data?: string) {
    try {
      console.log(this.socket);
      this.socket.emit(type, data);
    } catch (error) {
      console.log(error);
    }
  }

  onConnectEvent() {
    return new Promise((resolve, reject) => {
      const type = 'initialize';
      this.onEmit(type);
      this.socket.on(type, (message: string) => {
        const data = JSON.parse(message);

        let parseData = {};

        for (let key in data) {
          let parseValue = JSON.parse(data[key]);
          parseData = {
            ...parseData,
            [key]: parseValue,
          };
        }

        resolve(parseData);
      });
    });
  }

  url(address: string | undefined): Socket {
    if (!address) return this;

    this.address = address;
    this.socket = io.connect(this.address);

    return this;
  }
}

export default Socket;
