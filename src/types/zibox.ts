export interface Zibox {
  // connect?(options: MQTTConnectOption): Promise<unknown>;
  create(): boolean;
  // setVolume?(mic: number, spk: number): void;
  // getVolume?(): void;
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
