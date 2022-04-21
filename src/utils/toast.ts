import toast from 'react-hot-toast';
import { Colors } from './color';

class Toast {
  static error(message: string, icon = '✖') {
    toast(message, {
      icon,
      style: {
        backgroundColor: Colors.red3,
        color: Colors.white,
      },
    });
  }

  static notification(message: string, icon = '❕') {
    toast(message, {
      icon,
      style: {
        backgroundColor: Colors.blue10,
        color: Colors.white,
      },
    });
  }

  static success(message: string, icon = '✔') {
    toast(message, {
      icon,
      style: {
        backgroundColor: Colors.green4,
        color: Colors.white,
      },
    });
  }

  static warning(message: string, icon = '❕') {
    toast(message, {
      icon,
      style: {
        backgroundColor: Colors.yellow2,
        color: Colors.black,
      },
    });
  }
}

export default Toast;
