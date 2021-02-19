export interface EventHandler {
  onConnectEventHandler(callback: (parameters: any) => void): void;
  onMonitorEventHandler(callback: (parameters: any) => void): void;
  onChangeStatusEventHandler(callback: (parameters: any) => void): void;
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
