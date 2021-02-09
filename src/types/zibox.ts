export interface Zibox {
  connect(options: MQTTConnectOption | OCXConntectOption): Promise<unknown>;
  create(): Promise<unknown>;
  setVolume?(mic: number, spk: number): void;
  getVolume?(): void;
}

export interface MQTTConnectOption {
  /**
   * @description 지박스 ip
   */
  ip?: string;
  /**
   * @description 지박스 마이크 볼륨
   */
  mic_vol?: number;
  /**
   * @description 지박스 스피커 볼륨
   */
  spk_vol?: number;
}

export interface OCXConntectOption {
  /**
   * @description 소켓 주소
   */
  address?: string;
  /**
   * @description unique id
   */
  key?: number;
}
