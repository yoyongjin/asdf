import { useCallback } from 'react';
import Zibox from 'lib/zibox';
import Socket from 'lib/socket';

function useZibox() {
  const initZibox = useCallback(async (ziboxIp: string) => {
    try {
      const response = await Zibox.getInstance().connect(ziboxIp);
      return response;
    } catch (error) {
      console.log(error);
      return false;
    }
  }, []);

  const startMonitoring = useCallback((number: string, id: number) => {
    Zibox.getInstance().monStart();
    console.log('startMonitoring');
    Socket.getInstance().onEmit('monitoring', {
      monitoring_state: 'y',
      number,
      user_id: id,
    });
  }, []);

  const stopMonitoring = useCallback(async (number: string, id: number) => {
    try {
      await Zibox.getInstance().monStop();
      console.log('stopMonitoring');
      Zibox.getInstance().disconnect();
      Socket.getInstance().onEmit('monitoring', {
        monitoring_state: 'n',
        number,
        user_id: -1,
      });
    } catch (error) {
      console.log(error);
      alert('연결 실패하였습니다. Zibox ip 확인을 해주세요.');
      Zibox.getInstance().disconnect();
      Socket.getInstance().onEmit('monitoring', {
        monitoring_state: 'n',
        number,
        user_id: -1,
      });
    }
  }, []);

  const emitMonitoring = useCallback((number: string, id: number) => {
    console.log('emitMonitoring');
    Socket.getInstance().onEmit('monitoring', {
      monitoring_state: 'n',
      number: number,
      user_id: -1,
    });
  }, []);

  return { initZibox, startMonitoring, stopMonitoring, emitMonitoring };
}

export default useZibox;
