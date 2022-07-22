import { Colors } from 'utils/color';
import {
  CALL_STATUS_V2,
  CONSULTANT_STATUS,
  CONSULTANT_TEXT_STATUS,
  PHONE_STATUS,
  ZIBOX_MONIT_STATUS,
} from 'utils/constants';
import loadingIcon from 'images/loading.gif';
import startTappingIcon from 'images/zms/bt-mnt-listen-nor.png';
import tappingIcon from 'images/zms/bt-mnt-listen-ing.png';
import stopTappingIcon from 'images/zms/bt-mnt-listen-fin-nor.png';
import monitoringIcon from 'images/icon-mnt-red@2x.png';
import waitingIcon from 'images/icon-mnt-grey@2x.png';
import callingIcon from 'images/icon-mnt-blue@2x.png';

class Monitoring {
  static getMonitStatus(
    monitStatus?: number,
    monitUserId?: number,
    tappingStatus?: number,
    callStatus?: number,
    userId?: number,
    isRealMonitUser?: boolean,
  ) {
    if (
      monitStatus === ZIBOX_MONIT_STATUS.START_REQUEST ||
      monitStatus === ZIBOX_MONIT_STATUS.STOP_REQUEST ||
      (tappingStatus === 1 && isRealMonitUser)
    ) {
      return {
        image: loadingIcon,
        text: '',
        type: 'image',
      };
    }

    if (callStatus !== CALL_STATUS_V2.CONNECT) {
      // 통화 중인 상태가 아닌 경우
      return {
        image: '',
        text: '',
        type: '',
      };
    }

    if (tappingStatus === 0) {
      // 내가 감청 중이 아닐 경우
      if (monitStatus === ZIBOX_MONIT_STATUS.ENABLE) {
        // 다른 관리자가 감청 중인 경우
        return {
          image: tappingIcon,
          text: '',
          type: 'button',
        };
      }

      // 다른 관리자도 감청 중이 아닌 경우
      return {
        image: startTappingIcon,
        text: '감청',
        type: 'button',
      };
    } else if (tappingStatus === 2) {
      // 내가 감청을 하고 있는 경우
      if (monitStatus === ZIBOX_MONIT_STATUS.ENABLE && monitUserId === userId) {
        // 내가 감청 중인 상담원일 경우
        return {
          image: stopTappingIcon,
          text: '감청 종료',
          type: 'button',
        };
      }

      // 다른 관리자가 감청중인 상담원일 경우
      return {
        image: tappingIcon,
        text: '',
        type: 'button',
      };
    }

    return {
      image: '',
      text: '',
      type: '',
    };
  }

  static getConsultantStatus(
    callStatus?: number,
    consultantStatus?: number,
    phoneStatus?: number,
  ) {
    const value = {
      color: '',
      text: '',
    };

    if (consultantStatus === CONSULTANT_STATUS.LOGOUT) {
      value.text = CONSULTANT_TEXT_STATUS.LOGOUT;
      value.color = Colors.gray4;

      return value;
    }

    switch (phoneStatus) {
      case PHONE_STATUS.NOTHING:
      case PHONE_STATUS.WEB:
      case PHONE_STATUS.PHONE: {
        value.text = CONSULTANT_TEXT_STATUS.DISCONNECT;
        value.color = Colors.gray4;

        return value;
      }
    }

    switch (callStatus) {
      case CALL_STATUS_V2.IDLE: {
        value.color = Colors.gray4;

        if (consultantStatus === CONSULTANT_STATUS.AFTER) {
          value.text = CONSULTANT_TEXT_STATUS.AFTER;
        } else if (consultantStatus === CONSULTANT_STATUS.REST) {
          value.text = CONSULTANT_TEXT_STATUS.REST;
        } else if (consultantStatus === CONSULTANT_STATUS.AWAY) {
          value.text = CONSULTANT_TEXT_STATUS.AWAY;
        } else {
          value.text = CONSULTANT_TEXT_STATUS.WAIT;
        }

        return value;
      }
      case CALL_STATUS_V2.OFFHOOK: {
        value.text = CONSULTANT_TEXT_STATUS.OFFHOOK;
        value.color = Colors.blue1;

        return value;
      }
      case CALL_STATUS_V2.CONNECT: {
        value.text = CONSULTANT_TEXT_STATUS.CALL;
        value.color = Colors.red;

        return value;
      }
      case CALL_STATUS_V2.INCOMMING: {
        value.text = CONSULTANT_TEXT_STATUS.INCOMMING;
        value.color = Colors.blue1;

        return value;
      }
    }

    return value;
  }

  static getConsultantImageStatus(callStatus?: number, monitStatus?: number) {
    if (
      callStatus === CALL_STATUS_V2.OFFHOOK ||
      callStatus === CALL_STATUS_V2.INCOMMING ||
      callStatus === CALL_STATUS_V2.CONNECT
    ) {
      // 통화 중인 상태

      if (monitStatus === ZIBOX_MONIT_STATUS.ENABLE) {
        // 감청 중인 상태

        return {
          image: monitoringIcon,
          text: 'Monitoring Status',
          type: 'image',
        };
      }

      return {
        image: callingIcon,
        text: 'Calling Status',
        type: 'image',
      };
    }

    return {
      image: waitingIcon,
      text: 'Waiting Status',
      type: 'image',
    };
  }
}

export default Monitoring;
