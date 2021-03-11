import { useCallback } from 'react';
import { useDispatch } from 'react-redux';

import Zibox from 'lib/zibox';
import Socket from 'lib/socket';
import Communicator from 'lib/communicator';
import Logger from 'utils/log';
import { OCXTappingOption } from 'types/zibox';
import { MONITORING_STATUS, SOCKET_EVENT_TYPE } from 'utils/constants';

let user_id: number = 0;

function useZibox() {
  const dispatch = useDispatch();

  const connectZibox = useCallback(
    async (id: number, ip: string, mic: number, spk: number) => {
      user_id = id;
      try {
        const options = {
          ip,
          mic_vol: mic,
          spk_vol: spk,
        };
        const response = await Communicator.getInstance().connectZibox(options);
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
        monitoring_state: MONITORING_STATUS.YES,
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
      monitoring_state: MONITORING_STATUS.NO,
      number,
      user_id: -1,
    };
    Communicator.getInstance().emitMessage(SOCKET_EVENT_TYPE.MONITORING, data);
  }, []);

  // 삭제 예정
  const initZibox = useCallback(
    async (id: number, ziboxIp: string, ziboxmic: number, ziboxspk: number) => {
      user_id = id;
      try {
        const response = await Zibox.getInstance().connect(
          ziboxIp,
          ziboxmic,
          ziboxspk,
        );
        return response;
        return true;
      } catch (error) {
        console.log(error);
        return false;
      }
    },
    [],
  );

  // 삭제 예정
  const startMonitoring = useCallback((number: string, id: number) => {
    Zibox.getInstance().monStart();
    Logger.log('Start monitoring');
    Socket.getInstance().onEmit('monitoring', {
      monitoring_state: 'y',
      number,
      user_id: id,
    });
  }, []);

  // 삭제 예정
  const stopMonitoring = useCallback(async (number: string) => {
    try {
      // await Zibox.getInstance().monStop();
      console.log('Stop monitoring');
      // Zibox.getInstance().disconnect();
      Socket.getInstance().onEmit('monitoring', {
        monitoring_state: 'n',
        number,
        user_id: -1,
      });
    } catch (error) {
      console.log(error);
    }
  }, []);

  const setVolume = useCallback((type: number, gauge: number) => {
    // Zibox.getInstance().monVolume(type, gauge);
  }, []);

  const setEvent = useCallback(() => {
    // Zibox.getInstance().setEventListener(
    //   (cmd: string, response: { status: string; data: any; type: string }) => {
    //     if (!response) return;
    //     const { status, data, type } = response;
    //     if (status === 'y') {
    //       switch (type) {
    //         case 'vol_info':
    //           if (
    //             typeof data.mic === 'string' &&
    //             typeof data.spk === 'string'
    //           ) {
    //             const param = {
    //               id: user_id,
    //               ziboxmic: data.mic,
    //               ziboxspk: data.spk,
    //             };
    //             dispatch(requestZiboxVolume(param));
    //           }
    //           break;
    //         default:
    //           break;
    //       }
    //     }
    //   },
    // );
  }, [dispatch]);

  return {
    connectZibox,
    startMonitoring,
    stopMonitoring,
    setVolume,
    setEvent,
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
  id: number,
  ip: string,
  mic: number,
  spk: number,
) => Promise<Boolean>;

export default useZibox;
