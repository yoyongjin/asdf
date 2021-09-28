export interface EventHandler {}

export interface Socket extends EventHandler {
  connect(options: SocketConnectOption): void; // 연결하기
  disconnect(): void; // 연결끊기
  emit(name: string, data: any): void; // 메시지 보내기
}

export interface SocketConnectOption {
  /**
   * @description 소켓 주소
   */
  url: string;
  /**
   * @description unique id
   */
  key: number;
}
