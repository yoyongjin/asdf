import { ResponseType } from 'types/common';
import { Zibox, MQTTConnectOption } from 'types/zibox';
import Logger from 'utils/log';

class MQTT implements Zibox {
  private zibox: any;
  private id: number = 0;
  private ip: string = '';
  private number: string = '';
  private mic: number = 0;
  private spk: number = 0;

  /**
   * @description 연결하기
   * @param options 연결 옵션
   */
  async connect(options: MQTTConnectOption) {
    Logger.log('[MQTT] Connect ZiBox', options);
    try {
      this.id = options.target_id;
      this.ip = options.ip;
      this.number = options.key;
      this.mic = options.mic_vol;
      this.spk = options.spk_vol;

      await this.zibox.connect(options.ip);

      return true;
    } catch (error) {
      return false;
    }
  }

  /**
   * @description 객체 생성하기
   */
  create() {
    Logger.log('[MQTT] Create Zibox');
    this.zibox = new (window as any).Zibox();

    return true;
  }

  /**
   * @description 연결끊기
   */
  async disconnect() {
    Logger.log('[MQTT] Disconnect ZiBox');

    try {
      await this.zibox.disconnect();
      return true;
    } catch (error) {
      return false;
    }
  }

  /**
   * @description 감청 대상 정보
   */
  getTargetData() {
    Logger.log('[MQTT] Get Target Data');

    return {
      id: this.id,
      key: this.number,
      ip: this.ip,
      mic: this.mic,
      spk: this.spk,
    };
  }

  /**
   * @description 볼륨 정보 가져오기
   */
  getVolume() {
    Logger.log('[MQTT] Get Volume');

    this.zibox.disitalVolumeInfo();
  }

  /**
   * @description 감청 대상 초기화
   */
  setInitialTargetData() {
    Logger.log('[MQTT] Set Initial Target Data');

    this.id = -1;
    this.ip = '';
    this.number = '';
    this.mic = 0;
    this.spk = 0;
  }

  /**
   * @description 초기 지박스 설정
   */
  async setInitialZiBox() {
    Logger.log('[MQTT] Set Initial ZiBox');

    try {
      await this.zibox.ftpOff();

      if (this.mic !== 0 && this.spk !== 0) {
        this.zibox.micVolume(this.mic);
        this.zibox.spkVolume(this.spk);
      }

      await this.zibox.monIP('127.0.0.1');
      this.zibox.monOn();

      this.zibox.disitalVolumeInfo();

      return true;
    } catch (error) {
      return false;
    }
  }

  /**
   * @description 감청 볼륨 설정
   * @param type 왼쪽 : 1 / 오른쪽 : 2
   * @param gauge 값
   */
  setTappingVolume(type: number, gauge: number) {
    Logger.log('[MQTT] Set Tapping Volume', { type, gauge });

    if (type === 1) {
      this.zibox.leftMonVolume(gauge);
    } else if (type === 2) {
      this.zibox.rightMonVolume(gauge);
    }
  }

  /**
   * @description 볼륨 설정하기
   * @param mic 마이크 볼륨값
   * @param spk 스피커 볼륨값
   */
  setVolume(mic: number, spk: number) {
    Logger.log('[MQTT] Set Volume', { mic, spk });

    this.zibox.micVolume(mic);
    this.zibox.spkVolume(spk);
  }

  /**
   * @description 감청 시작
   */
  async startTapping() {
    Logger.log('[MQTT] Start Tapping');

    try {
      await this.zibox.recStart();
      await this.zibox.monStart();

      return true;
    } catch (error) {
      return false;
    }
  }

  /**
   * @description 감청 종료
   */
  async stopTapping() {
    Logger.log('[MQTT] Stop Tapping');

    try {
      await this.zibox.monStop();
      await this.zibox.recStop();

      return true;
    } catch (error) {
      return false;
    }
  }

  onChangeProtocolEventHandler(callback: (data: string) => void) {
    Logger.log('[MQTT] Register Protocol Event');
    this.zibox.onProtocolEvnetListener = (response: string) => {
      Logger.log(`[MQTT] onProtocolEvnetListener`, response);
      callback(response);
    };
  }

  onChangeAllStatusEventHandler(callback: (data: ResponseType) => void) {
    Logger.log('[MQTT] Register All Status Event');
    this.zibox.onCommandEventListener = (
      cmd: string,
      response: ResponseType,
    ) => {
      Logger.log(`[MQTT] onCommandEventListener`, { cmd, response });

      if (typeof response !== 'object') return;

      callback(response);
    };
  }
}

export default MQTT;
