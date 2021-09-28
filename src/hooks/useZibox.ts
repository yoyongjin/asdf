import { useCallback } from 'react';

import Communicator from 'lib/communicator';
import {
  MQTTConnectOption,
  OCXTappingOption,
  PacketTappingOption,
} from 'types/zibox';
import { SOCKET_EVENT_TYPE, ZIBOX_MONIT_STATUS } from 'utils/constants';

// 지박스 명령 관련된 훅
function useZibox() {
  /**
   * @description 감청 시작/중지 요청
   */
  const requestTapping = useCallback(
    (number: string, id: number, type: number, ip: string) => {
      const data = {
        monitoring_state:
          type === 1
            ? ZIBOX_MONIT_STATUS.START_REQUEST
            : ZIBOX_MONIT_STATUS.STOP_REQUEST,
        number,
        user_id: id,
        zibox_ip: ip,
      };
      Communicator.getInstance().emitMessage(
        SOCKET_EVENT_TYPE.MONITORING,
        data,
      );
    },
    [],
  );

  /**
   * @description 감청 시작
   */
  const startTapping = useCallback(
    async (
      options?: MQTTConnectOption | OCXTappingOption | PacketTappingOption,
    ) => {
      try {
        await Communicator.getInstance().startTappingZibox(options);
      } catch (error) {
        console.log(error);
      }
    },
    [],
  );

  /**
   * @description 감청 종료
   */
  const stopTapping = useCallback(async () => {
    try {
      await Communicator.getInstance().stopTappingZibox();
    } catch (error) {
      console.log(error);
    }
  }, []);

  const setVolume = useCallback((type: number, gauge: number) => {
    Communicator.getInstance().setTappingVolume(type, gauge);
    // Zibox.getInstance().monVolume(type, gauge);
  }, []);

  return {
    requestTapping,
    setVolume,
    startTapping,
    stopTapping,
  };
}

export type requestTapping = (
  number: string,
  id: number,
  type: number,
  ip: string,
) => void;
export type startTapping = (
  options?: MQTTConnectOption | OCXTappingOption | PacketTappingOption,
) => void;
export type stopTapping = () => void;

export default useZibox;
