export interface Zibox {
  // connect?(options: MQTTConnectOption): Promise<unknown>;
  create(): boolean;
  // setVolume?(mic: number, spk: number): void;
  // getVolume?(): void;
  startTapping(options?: OCXTappingOption | PacketTappingOption): void;
  stopTapping(): void;
}

export interface Play extends Zibox {
  play(packet: any): void;
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

export interface OCXTappingOption {
  /**
   * @description 감청 대상의 pc IP
   */
  ip: string;
  /**
   * @description 감청 모드
   */
  mode: number;
}

export interface PacketTappingOption {
  /**
   * @description 전화번호
   */
  key: string;
  /**
   * @description 지박스 ip
   */
  ip: string;
}
