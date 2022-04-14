import toast from 'react-hot-toast';
import { Colors } from './color';

class Toast {
  static error(message: string, icon = '✖') {
    toast(message, {
      icon,
      style: {
        backgroundColor: Colors.red3,
        color: '#fff',
      },
    });
  }

  static success(message: string, icon = '✔') {
    toast(message, {
      icon,
      style: {
        backgroundColor: Colors.green4,
        color: '#fff',
      },
    });
  }
}

export default Toast;
