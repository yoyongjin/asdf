import { pad } from 'utils/utils';

class Logger {
  static log(message: string, object?: any) {
    if (process.env.NODE_ENV === 'development') {
      let current = new Date();
      let min = pad(String(current.getMinutes()));
      let sec = pad(String(current.getSeconds()));
      let millis = pad(String(current.getMilliseconds()), 3);
      let prefix = '[' + min + ':' + sec + ':' + millis + '] ';

      if (object) console.log(prefix + message, object);
      else console.log(prefix + message);
    }
  }
}

export default Logger;
