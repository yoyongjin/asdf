import Socket from 'lib/socket';
import MQTT from 'lib/mqtt';
import OCX from 'lib/ocx';
import { MQTTConnectOption } from 'types/zibox';
import constants, { SOCKET_EVENT_TYPE, TRANSPORT_TYPE } from 'utils/constants';
import Logger from 'utils/log';

class Communicator {
  private static transport = constants.TRANSPORT as string;
  private static instance: Communicator;
  private static controller: MQTT | OCX;
  private static socket: Socket | undefined;

  contructor() {
    if (Communicator.instance) return Communicator.instance;

    Communicator.checkMode();
  }

  static getInstance() {
    if (!Communicator.instance) {
      Communicator.instance = new Communicator();
      Communicator.checkMode();
    }

    return Communicator.instance;
  }

  /**
   * @description 객체 불러오기
   */
  async create() {
    Communicator.controller.create();
  }

  /**
   * @description 소켓 연결하기
   * @param id unique id
   */
  async connectSocket(id: number) {
    const url = constants.SOCKET_SERVER as string;
    let connectOption = {
      url,
      key: 0,
    };
    if (Communicator.socket) {
      const initData = {
        user_id: id,
      };
      Communicator.socket
        .connect(connectOption)
        .onEmit(SOCKET_EVENT_TYPE.INITIALIZE, initData);
    } else {
      connectOption.key = id;
      await (Communicator.controller as OCX).connect(connectOption);
    }
  }

  /**
   * @description 지박스 연결하기
   * @param options MQTT 연결 옵션
   */
  async connectZibox(options: MQTTConnectOption) {
    Logger.log('Connect Zibox');
    await (Communicator.controller as MQTT).connect(options);
  }

  /**
   * @description 소켓 객체 가져오기
   */
  getSocketInstance() {
    let instance: Socket | OCX;
    if (Communicator.socket) {
      instance = Communicator.socket;
    } else {
      instance = Communicator.controller as OCX;
    }
    return instance;
  }

  disconnectAll() {
    this.getSocketInstance().disconnect();
  }

  /**
   * @description MQTT / OCX 모드 확인
   */
  private static checkMode() {
    if (Communicator.transport === TRANSPORT_TYPE.MQTT) {
      Communicator.controller = new MQTT();
      Communicator.socket = new Socket();
    } else if (Communicator.transport === TRANSPORT_TYPE.OCX) {
      Communicator.controller = new OCX();
    }
  }
}

export default Communicator;
