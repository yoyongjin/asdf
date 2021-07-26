class socketEventHandler {
  static connectEvent: (connection: number, timestamp: number) => void;
  static changeStatusEvent: (type: string, data: any) => void;

  static connect(connection: number, timestamp: number) {
    if (this.connectEvent) {
      this.connectEvent(connection, timestamp);
    }
  }

  static changeStatus(type: string, data: any) {
    if (this.changeStatusEvent) {
      this.changeStatusEvent(type, data);
    }
  }
}

export default socketEventHandler;
