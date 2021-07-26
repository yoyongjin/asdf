import _ from 'lodash';

import MQTT from 'lib/mqtt';
import OCX from 'lib/ocx';
import Player from 'lib/player';
import Socket from 'lib/socket';
import {
  MQTTConnectOption,
  OCXTappingOption,
  PacketTappingOption,
} from 'types/zibox';
import constants, { ZIBOX_TRANSPORT } from 'utils/constants';
import Logger from 'utils/log';

class Communicator {
  private static transport = constants.TRANSPORT as string;
  private static instance: Communicator;
  private static controller: MQTT | OCX | Player;
  private static socket: Socket;

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
    const connectOption = {
      url,
      key: id,
    };

    if (Communicator.socket) {
      Communicator.socket.connect(connectOption);
    } else {
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

  startTappingZibox(options?: OCXTappingOption | PacketTappingOption) {
    if (Communicator.controller instanceof MQTT) {
      return Communicator.controller.startTapping();
    } else if (Communicator.controller instanceof OCX) {
      const option = _.cloneDeep(options) as OCXTappingOption;
      return Communicator.controller.startTapping(option);
    } else if (Communicator.controller instanceof Player) {
      const option = _.cloneDeep(options) as PacketTappingOption;
      return Communicator.controller.startTapping(option);
    }
  }

  stopTappingZibox() {
    return Communicator.controller.stopTapping();
  }

  setTappingVolume(type: number, gauge: number) {
    if (Communicator.controller instanceof MQTT) {
      Communicator.controller.setTappingVolume(type, gauge);
    } else if (Communicator.controller instanceof OCX) {
    } else if (Communicator.controller instanceof Player) {
      Communicator.controller.setTappingVolume(type, gauge);
    }
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

  /**
   * @description 소켓 객체 가져오기
   */
  getZiboxInstance() {
    let instance: MQTT | OCX | Player = Communicator.controller;

    return instance;
  }

  emitMessage(name: string, data?: any) {
    this.getSocketInstance().onEmit(name, data);
  }

  disconnectAll() {
    this.getSocketInstance().disconnect();
  }

  getMode() {
    return Communicator.transport;
  }

  play(packet: any) {
    (this.getZiboxInstance() as Player).play(packet);
  }

  /**
   * @description MQTT / OCX 모드 확인
   */
  private static checkMode() {
    if (Communicator.transport === ZIBOX_TRANSPORT.MQTT) {
      Communicator.controller = new MQTT();
      Communicator.socket = new Socket();
    } else if (Communicator.transport === ZIBOX_TRANSPORT.OCX) {
      Communicator.controller = new OCX();
    } else if (Communicator.transport === ZIBOX_TRANSPORT.PACKET) {
      Communicator.controller = new Player();
      Communicator.socket = new Socket();
    } else {
      Communicator.controller = new Player();
      Communicator.socket = new Socket();
    }
  }
}

export default Communicator;
