import { useCallback } from 'react';
import Zibox from 'lib/zibox';
import Socket from 'lib/socket';

function useZibox() {
  const initZibox = useCallback(() => {
    Zibox.getInstance().connect('192.168.99.53');
  }, []);

  const startMonitoring = useCallback((number: string, id: number) => {
    Zibox.getInstance().monStart();
    Socket.getInstance().onEmit('monitoring', {
      monitoring_state: 'y',
      number,
      user_id: id,
    });
  }, []);

  const stopMonitoring = useCallback(async (number: string, id: number) => {
    await Zibox.getInstance().monStop();
    Zibox.getInstance().disconnect();
    Socket.getInstance().onEmit('monitoring', {
      monitoring_state: 'n',
      number,
      user_id: id,
    });
  }, []);

  const emitMonitoring = useCallback((number: string, id: number) => {
    Socket.getInstance().onEmit('monitoring', {
      monitoring_state: 'n',
      number: number,
      user_id: id,
    });
  }, [])

  return { initZibox, startMonitoring, stopMonitoring, emitMonitoring };
}

export default useZibox;
