import {
  CallStatus,
  ConsultantAllStatus,
  ConsultantAllStatusByNumberV2,
  ConsultantStatus,
  PhoneStatus,
  ZiboxStatus,
} from 'types/user';

class Status {
  static instance: Status | null = null;
  private status: ConsultantAllStatusByNumberV2 = {};

  constructor() {
    if (!Status.instance) {
      Status.instance = this;
    }

    return Status.instance;
  }

  getAllStatus() {
    return this.status;
  }

  setAllStatus(data: any) {
    let parseData: ConsultantAllStatusByNumberV2 = {};

    for (const key in data) {
      const allStatus: ConsultantAllStatus = JSON.parse(data[key]);
      parseData = {
        ...parseData,
        [key]: allStatus,
      };
    }

    this.status = parseData;
    return this.status;
  }

  setCallStatus(callStatus: CallStatus) {
    if (!callStatus.number) {
      return;
    }

    if (!this.status[callStatus.number]) {
      this.status[callStatus.number] = {};
    }

    this.status[callStatus.number].call = callStatus;
  }

  setZiboxStatus(ziboxStatus: ZiboxStatus) {
    if (!ziboxStatus.number) {
      return;
    }

    if (!this.status[ziboxStatus.number]) {
      this.status[ziboxStatus.number] = {};
    }

    this.status[ziboxStatus.number].zibox = ziboxStatus;
  }

  setConsultantStatus(consultantStatus: ConsultantStatus) {
    if (!consultantStatus.number) {
      return;
    }

    if (!this.status[consultantStatus.number]) {
      this.status[consultantStatus.number] = {};
    }

    this.status[consultantStatus.number].consultant = consultantStatus;
  }

  setPhoneStatus(phoneStatus: PhoneStatus) {
    if (!phoneStatus.number) {
      return;
    }

    if (!this.status[phoneStatus.number]) {
      this.status[phoneStatus.number] = {};
    }

    this.status[phoneStatus.number].phone = phoneStatus;
  }

  setResetStatus(allStatus: ConsultantAllStatus) {
    if (!allStatus.number) {
      return;
    }

    if (!this.status[allStatus.number]) {
      this.status[allStatus.number] = {};
    }

    this.status[allStatus.number].call = allStatus.call;
    this.status[allStatus.number].consultant = allStatus.consultant;
    this.status[allStatus.number].phone = allStatus.phone;
    this.status[allStatus.number].zibox = allStatus.zibox;
  }
}

export default Status;
