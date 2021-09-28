export interface ExternalObject {
  create(): boolean; // 객체 생성하기
}

export interface Zibox extends ExternalObject {
  disconnect?(): void;
  getVolume?(): void;
  startTapping(options?: OCXTappingOption | PacketTappingOption): void; // 감청 시작
  stopTapping(): void; // 감청 종료
  setTappingVolume?(type: number, gauge: number): void;
  setVolume?(mic: number, spk: number): void;
}

export interface Play extends Zibox {
  play(packet: any): void;
}

export interface MQTTConnectOption {
  /**
   * @description 지박스 ip
   */
  ip: string;
  /**
   * @description 지박스 마이크 볼륨
   */
  mic_vol: number;
  /**
   * @description 지박스 스피커 볼륨
   */
  spk_vol: number;
  /**
   * @description 전화번호
   */
  key: string;
  /**
   * @description 감청 주체
   */
  target_id: number;
}

export interface OCXTappingOption {
  /**
   * @description 감청 대상의 pc IP
   */
  ip: string;
  /**
   * @description 전화번호
   */
  key: string;
  /**
   * @description 감청 주체
   */
  target_id: number;
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
