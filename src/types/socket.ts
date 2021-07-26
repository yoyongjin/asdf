export interface EventHandler {
  onMonitorEventHandler(callback: (parameters: any) => void): void;
  onEmit(name: string, data: any): void;
}

export interface Socket extends EventHandler {
  connect(options: ConnectOption): void;
}

export interface ConnectOption {
  /**
   * @description 소켓 주소
   */
  url: string;
  /**
   * @description ocx 연결 시 unique id
   */
  key: number;
}
