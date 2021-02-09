import MQTT from 'lib/mqtt';
import OCX from 'lib/ocx';

import constants from 'utils/constants';
import { DynamicMapType } from 'types/common';
import { MQTTConnectOption } from 'types/zibox';

class Zibox {
  public static mode: DynamicMapType;
  private static instance: MQTT | OCX;
  contructor() {
    if (Zibox.instance) return Zibox.instance;

    Zibox.checkMode();
  }

  static getInstance() {
    if (!Zibox.instance) {
      Zibox.checkMode();
    }

    return Zibox.instance;
  }

  public async connect(options: MQTTConnectOption) {
    Zibox.instance.connect(options);
  }

  private static checkMode() {
    if (constants.ZIBOX_MODE === Zibox.mode.MQTT) {
      return (Zibox.instance = new MQTT());
    } else if (constants.ZIBOX_MODE === Zibox.mode.OCX) {
      return (Zibox.instance = new OCX());
    }
  }
}

Zibox.mode = {
  MQTT: 'mqtt',
  OCX: 'ocx',
};

export default Zibox;
