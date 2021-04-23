import { useCallback } from 'react';

import Communicator from 'lib/communicator';
import { SOCKET_EVENT_TYPE, ZIBOX_MONIT_STATUS } from 'utils/constants';
import Logger from 'utils/log';
import { OCXTappingOption } from 'types/zibox';

// 지박스 명령 관련된 훅
function useZibox() {
  const connectZibox = useCallback(
    async (
      ip: string,
      mic: number,
      spk: number,
      target_id: number,
      number: string,
    ) => {
      try {
        const options = {
          ip,
          mic_vol: mic,
          spk_vol: spk,
        };

        await Communicator.getInstance().connectZibox(options);
        return true;
      } catch (error) {
        console.log(error);
        return false;
      }
    },
    [],
  );

  const startTapping = useCallback(
    (number: string, id: number, options?: OCXTappingOption) => {
      Communicator.getInstance().startTappingZibox(options!);
      const data = {
        monitoring_state: ZIBOX_MONIT_STATUS.ENABLE,
        number,
        user_id: id,
      };
      Communicator.getInstance().emitMessage(
        SOCKET_EVENT_TYPE.MONITORING,
        data,
      );
    },
    [],
  );

  const stopTapping = useCallback((number: string) => {
    Communicator.getInstance().stopTappingZibox();
    const data = {
      monitoring_state: ZIBOX_MONIT_STATUS.DISABLE,
      number,
      user_id: -1,
    };
    Communicator.getInstance().emitMessage(SOCKET_EVENT_TYPE.MONITORING, data);
  }, []);

  const setVolume = useCallback((type: number, gauge: number) => {
    // Zibox.getInstance().monVolume(type, gauge);
  }, []);

  return {
    connectZibox,
    setVolume,
    startTapping,
    stopTapping,
  };
}

export type startTapping = (
  number: string,
  id: number,
  options?: OCXTappingOption,
) => void;
export type stopTapping = (number: string) => void;
export type connectZibox = (
  ip: string,
  mic: number,
  spk: number,
  target_id: number,
  number: string,
) => Promise<Boolean>;

export default useZibox;
