export interface EventHandler {
  onConnectEventHandler(callback: (parameters: number) => void): void;
  onMonitorEventHandler(callback: (parameters: any) => void): void;
  onChangeStatusEventHandler(callback: (type: string, data: any) => void): void;
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
  key?: number;
}
