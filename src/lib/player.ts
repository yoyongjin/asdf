import { PacketTappingOption, Zibox } from 'types/zibox';
import constants from 'utils/constants';
import Logger from 'utils/log';

class Player implements Zibox {
  private player: any;

  /**
   * @description 소켓 연결하기
   * @param options 연결 옵션
   */
  public async connect(key: string) {
    Logger.log('[Packet] Connect ZiBox');
    this.player.initialize(key);
  }

  public create(): boolean {
    Logger.log('[Packet] Create Zibox');
    const url = constants.ZIBOX_SERVER;

    this.player = new (window as any).ZiBoxPlayer(url);

    return true;
  }

  public startTapping(options: PacketTappingOption) {
    this.connect(options.key);

    this.player.startMonitoring(options.ip);
  }

  public stopTapping() {
    this.player.stopMonitoring();
  }

  onChangeAllEventHandler(callback: (type: string, data: string) => void) {
    Logger.log('[Packet] Register All Event');
    this.player.onSocketEventListener = (response: string, event: string) => {
      Logger.log(`[Packet] onSocketEventListener`, { response, event });

      callback(event, response);
    };
  }
}

export default Player;
