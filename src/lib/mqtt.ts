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
   * @description 지박스 연결하기
   * @param options 연결 옵션
   */
  public async connect(options: MQTTConnectOption) {
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
   * @description zibox 객체 생성하기
   */
  public create() {
    Logger.log('[MQTT] Create Zibox');
    this.zibox = new (window as any).Zibox();

    return true;
  }

  async disconnect() {
    try {
      await this.zibox.disconnect();
      return true;
    } catch (error) {
      return false;
    }
  }

  setInitTargetData() {
    this.id = -1;
    this.ip = '';
    this.number = '';
    this.mic = 0;
    this.spk = 0;
  }

  async initialize() {
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
   * @description 감청 시작
   */
  public async startTapping() {
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
  public async stopTapping() {
    Logger.log('[MQTT] Stop Tapping');
    await this.zibox.monStop();
    return this.zibox.recStop();
  }

  /**
   * @description 감청 대상 정보
   */
  public getTargetData() {
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

  setTappingVolume(type: number, gauge: number) {
    if (type === 1) {
      // 왼쪽 볼륨
      this.zibox.leftMonVolume(gauge);
    } else if (type === 2) {
      // 오른쪽 볼륨
      this.zibox.rightMonVolume(gauge);
    }
  }

  /**
   * @description 볼륨 설정하기
   * @param mic 마이크 볼륨 값
   * @param spk 스피커 볼륨 값
   */
  setVolume(mic: number, spk: number) {
    Logger.log('[MQTT] Set Volume', { mic, spk });
    this.zibox.micVolume(mic);
    this.zibox.spkVolume(spk);
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
