import Utils from './new_utils';

class Logger {
  static log(message: string, ...data: any) {
    if (process.env.NODE_ENV === 'development') {
      let current = new Date();
      let min = Utils.pad(String(current.getMinutes()));
      let sec = Utils.pad(String(current.getSeconds()));
      let millis = Utils.pad(String(current.getMilliseconds()), 3);
      let prefix = '[' + min + ':' + sec + ':' + millis + '] ';

      if (data) console.log(prefix + message, ...data);
      else console.log(prefix + message);
    }
  }
}

export default Logger;
