import _ from 'lodash';

import MonitorOCX from 'lib/monitorOCX';
import MQTT from 'lib/mqtt';
import Player from 'lib/player';
import Socket from 'lib/socket';
import SocketOCX from 'lib/socketOCX';
import {
  MQTTConnectOption,
  OCXTappingOption,
  PacketTappingOption,
} from 'types/zibox';
import constants, { ZIBOX_TRANSPORT } from 'utils/constants';

class Communicator {
  private static instance: Communicator;
  private static controller: MQTT | Player | MonitorOCX;
  private static socket: Socket | SocketOCX;

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

    if (Communicator.socket instanceof SocketOCX) {
      Communicator.socket.create();
    }
  }

  /**
   * @description 소켓 연결하기
   * @param id unique id
   */
  async connectSocket(id: number) {
    const url = constants.SOCKET_SERVER;
    const connectOption = {
      url,
      key: id,
    };

    Communicator.socket.connect(connectOption);
  }

  /**
   * @description 연결 끊기
   */
  disconnectAll() {
    if (Communicator.controller instanceof MQTT) {
      return Communicator.controller.disconnect();
    }

    Communicator.socket.disconnect();
  }

  /**
   * @description 메시지 전송하기
   * @param name 이벤트명
   * @param data 전달값
   */
  emitMessage(name: string, data: any = '') {
    Communicator.socket.emit(name, data);
  }

  /**
   * @description 지박스 객체 가져오기
   */
  getSocketInstance() {
    return Communicator.socket;
  }

  /**
   * @description 지박스 객체 가져오기
   */
  getZiboxInstance() {
    return Communicator.controller;
  }

  /**
   * @description 감청 볼륨 변경하기
   * @param type 왼쪽 - 1 / 오른쪽 - 2
   * @param gauge 변경값
   */
  setTappingVolume(type: number, gauge: number) {
    if (
      Communicator.controller instanceof MQTT ||
      Communicator.controller instanceof Player
    ) {
      Communicator.controller.setTappingVolume(type, gauge);
    }
  }

  /**
   * @description 감청 시작하기
   * @param options
   */
  startTappingZibox(
    options?: MQTTConnectOption | OCXTappingOption | PacketTappingOption,
  ) {
    if (Communicator.controller instanceof MQTT) {
      const option = _.cloneDeep(options) as MQTTConnectOption;
      return Communicator.controller.connect(option);
    } else if (Communicator.controller instanceof MonitorOCX) {
      const option = _.cloneDeep(options) as OCXTappingOption;
      return Communicator.controller.startTapping(option);
    } else if (Communicator.controller instanceof Player) {
      const option = _.cloneDeep(options) as PacketTappingOption;
      return Communicator.controller.startTapping(option);
    }
  }

  /**
   * @description 감청 종료하기
   */
  stopTappingZibox() {
    return Communicator.controller.stopTapping();
  }

  play(packet: any) {
    if (Communicator.controller instanceof Player) {
      Communicator.controller.play(packet);
    }
  }

  /**
   * @description 모드 확인
   */
  private static checkMode() {
    if (constants.TRANSPORT === ZIBOX_TRANSPORT.MQTT) {
      Communicator.controller = new MQTT();
      Communicator.socket = new Socket();
    } else if (constants.TRANSPORT === ZIBOX_TRANSPORT.OCX) {
      Communicator.controller = new MonitorOCX();
      Communicator.socket = new SocketOCX();
    } else if (constants.TRANSPORT === ZIBOX_TRANSPORT.PACKET) {
      Communicator.controller = new Player();
      Communicator.socket = new Socket();
    } else if (constants.TRANSPORT === ZIBOX_TRANSPORT.SERVER) {
      Communicator.controller = new Player();
      Communicator.socket = new Socket();
    }
  }
}

export default Communicator;
