import { ResponseType } from 'types/common';
import { Zibox, MQTTConnectOption } from 'types/zibox';
import { RESPONSE_STATUS_V2 } from 'utils/constants';
import Logger from 'utils/log';

class MQTT implements Zibox {
  private zibox: any;

  /**
   * @description 지박스 연결하기
   * @param options 연결 옵션
   */
  public async connect(options: MQTTConnectOption) {
    Logger.log('[MQTT] Connect ZiBox');
    try {
      await this.zibox.connect(options.ip);
      this.zibox.ftpOff();
      await new Promise((resolve) => setTimeout(resolve, 500));
      this.zibox.monIP('127.0.0.1');
      await new Promise((resolve) => setTimeout(resolve, 500));
      this.zibox.monOn();
      if (options.mic_vol && options.spk_vol) {
        this.setVolume(options.mic_vol, options.spk_vol);
      }
      this.getVolume();
      return true;
    } catch (error) {
      console.log(error);
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

  /**
   * @description 감청 시작
   */
  public startTapping() {
    Logger.log('[MQTT] Start Tapping');
    this.zibox.recStart();
    this.zibox.monStart();
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

  onChangeAllStatusEventHandler(callback: (type: string, data: any) => void) {
    Logger.log('[MQTT] Register All Status Event');
    this.zibox.onCommandEventListener = (
      cmd: string,
      response: ResponseType,
    ) => {
      Logger.log(`[MQTT] onCommandEventListener`, { cmd, response });

      if (typeof response !== 'object') return;

      const { type, status, data } = response;

      if (status === RESPONSE_STATUS_V2.YES) {
        callback(type, data);
      }
    };
  }
}

export default MQTT;
