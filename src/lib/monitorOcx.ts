import { ExternalObject, OCXTappingOption } from 'types/zibox';
import constants from 'utils/constants';
import Logger from 'utils/log';

class MonitorOcx implements ExternalObject {
  private static _port: number = constants.ZIBOX_MONIT_OCX_PORT;
  private static _mode: number = constants.ZIBOX_MONIT_OCX_MODE;
  private _ocx: any;
  private id: number = -1;
  private ip: string = '';
  private number: string = '';

  /**
   * @description 객체 생성하기
   */
  create() {
    Logger.log('[MORNITOR OCX] Create Monitor OCX');

    this._ocx = (window as any).ZiBoxMonitor;

    return true;
  }

  /**
   * @description 감청 대상 정보
   */
  getTargetData() {
    Logger.log('[MORNITOR OCX] Get Target Data');

    return {
      id: this.id,
      key: this.number,
      ip: this.ip,
    };
  }

  /**
   * @description 감청 대상 초기화
   */
  setInitialTargetData() {
    Logger.log('[MORNITOR OCX] Set Initial Target Data');

    this.id = -1;
    this.ip = '';
    this.number = '';
  }

  /**
   * @description 감청 시작하기
   * @param options 감청 옵션
   */
  startTapping(options: OCXTappingOption) {
    Logger.log('[MORNITOR OCX] Start Monitoring');

    this.ip = options.ip;
    this.id = options.target_id;
    this.number = options.key;

    this._ocx.StartMonitor(options.ip, MonitorOcx._port, MonitorOcx._mode);
  }

  /**
   * @description 감청 종료하기
   */
  stopTapping() {
    Logger.log('[MORNITOR OCX] Stop Monitoring');

    this._ocx.StopMonitor();
  }

  onChangeMonitorEventHandler(
    callback: (status: number, message: string) => void,
  ) {
    this._ocx.DevMonitorStatus = (status: number, message: string) => {
      Logger.log('[MORNITOR OCX] Stop Monitoring', status, message);
      /**
       * 0 감청 종료
       * 1 감청 시작
       * 2 버퍼링 시작
       * 3 버퍼링 종료
       * 4 타임아웃
       */
      callback(status, message);
    };
  }
}

export default MonitorOcx;
