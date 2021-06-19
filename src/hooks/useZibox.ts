import { useCallback } from 'react';
import { useDispatch } from 'react-redux';

import Communicator from 'lib/communicator';
import { SOCKET_EVENT_TYPE, ZIBOX_MONIT_STATUS } from 'utils/constants';
import Logger from 'utils/log';
import { OCXTappingOption, PacketTappingOption } from 'types/zibox';
import { setTappingData } from 'modules/actions/auth';

// 지박스 명령 관련된 훅
function useZibox() {
  const dispatch = useDispatch();

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

  const stopTapping = useCallback(async (number: string) => {
    try {
      await Communicator.getInstance().stopTappingZibox();
      const data = {
        monitoring_state: ZIBOX_MONIT_STATUS.DISABLE,
        number,
        user_id: -1,
      };
      Communicator.getInstance().emitMessage(
        SOCKET_EVENT_TYPE.MONITORING,
        data,
      );
    } catch (error) {
      console.log('Stop Tapping ERROR', error);
    }
  }, []);

  const startTapping = useCallback(
    async (
      number: string,
      id: number,
      options?: OCXTappingOption | PacketTappingOption,
    ) => {
      try {
        await Communicator.getInstance().startTappingZibox(options!);
        const data = {
          monitoring_state: ZIBOX_MONIT_STATUS.ENABLE,
          number,
          user_id: id,
        };
        Communicator.getInstance().emitMessage(
          SOCKET_EVENT_TYPE.MONITORING,
          data,
        );
      } catch (error) {
        console.log(error);
        const data = {
          monitoring_state: ZIBOX_MONIT_STATUS.DISABLE,
          number,
          user_id: -1,
        };
        Communicator.getInstance().emitMessage(
          SOCKET_EVENT_TYPE.MONITORING,
          data,
        );
        const payload = {
          status: 0,
          ip: '',
          id: -1,
          number: '',
        };
        dispatch(setTappingData(payload));
      }
    },
    [],
  );

  const setVolume = useCallback((type: number, gauge: number) => {
    Communicator.getInstance().setTappingVolume(type, gauge);
    // Zibox.getInstance().monVolume(type, gauge);
  }, []);

  return {
    connectZibox,
    requestTapping,
    setVolume,
    startTapping,
    stopTapping,
  };
}

export type startTapping = (
  number: string,
  id: number,
  options?: OCXTappingOption | PacketTappingOption,
) => void;
export type stopTapping = (number: string) => void;
export type connectZibox = (
  ip: string,
  mic: number,
  spk: number,
  target_id: number,
  number: string,
) => Promise<Boolean>;
export type requestTapping = (
  number: string,
  id: number,
  type: number,
  ip: string,
) => void;

export default useZibox;
