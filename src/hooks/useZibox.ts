import { useCallback } from 'react';
import { useDispatch } from 'react-redux';

import Zibox from 'lib/zibox';
import Socket from 'lib/socket';
import { requestZiboxVolume } from 'modules/actions/user';

function useZibox() {
  const dispatch = useDispatch();

  const initZibox = useCallback(
    async (id: number, ziboxIp: string, ziboxmic: number, ziboxspk: number) => {
      try {
        const response = await Zibox.getInstance().connect(
          id,
          ziboxIp,
          ziboxmic,
          ziboxspk,
        );
        return response;
      } catch (error) {
        console.log(error);
        return false;
      }
    },
    [],
  );

  const startMonitoring = useCallback((number: string, id: number) => {
    Zibox.getInstance().monStart();
    console.log('Start monitoring');
    Socket.getInstance().onEmit('monitoring', {
      monitoring_state: 'y',
      number,
      user_id: id,
    });
  }, []);

  const stopMonitoring = useCallback(async (number: string) => {
    try {
      await Zibox.getInstance().monStop();
      console.log('Stop monitoring');
      Zibox.getInstance().disconnect();
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
    Zibox.getInstance().monVolume(type, gauge);
  }, []);

  const setEvent = useCallback(() => {
    Zibox.getInstance().setEventListener(
      (cmd: string, response: { status: string; data: any; type: string }) => {
        if (!response) return;
        const { status, data, type } = response;

        if (status === 'y') {
          switch (type) {
            case 'vol_info':
              if (data.mic && data.spk) {
                const param = {
                  id: 2,
                  ziboxmic: data.mic,
                  ziboxspk: data.spk,
                };
                dispatch(requestZiboxVolume(param));
              }

              break;
            default:
              break;
          }
        }
      },
    );
  }, [dispatch]);

  return {
    initZibox,
    startMonitoring,
    stopMonitoring,
    setVolume,
    setEvent,
  };
}

export default useZibox;
