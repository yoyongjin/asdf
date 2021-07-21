import { AsYouType } from 'libphonenumber-js';

const krPhone = new AsYouType('KR');

class Utils {
  static checkBrowser() {
    const agent = navigator.userAgent.toLowerCase();

    if (
      (navigator.appName === 'Netscape' &&
        navigator.userAgent.search('Trident') !== -1) ||
      agent.indexOf('msie') !== -1
    ) {
      return 'ocx';
    }

    return null;
  }

  static getDiffTime(timestamp: number) {
    const current: number = new Date().getTime();
    const diff = Math.floor((current - timestamp) / 1000);

    return diff;
  }

  static getLocalDiffTime(
    standardTimestamp: number,
    localTimestamp: number,
    serverTimestamp: number,
  ) {
    const currentTimestamp: number = new Date().getTime();
    const differenceRealTimestamp = currentTimestamp - standardTimestamp;
    const differenceLocalAndServerTimestamp = localTimestamp - serverTimestamp;

    const result: number =
      Math.floor(differenceRealTimestamp / 1000) -
      Math.floor(differenceLocalAndServerTimestamp / 1000);

    return result;
  }

  static getMaxPage = (count: number, divide: number) => {
    let maxPage = count / divide;
    if (maxPage === 0) {
      maxPage += 1;
    }
    if (!Number.isInteger(maxPage)) {
      maxPage = Math.floor(maxPage) + 1;
    }

    return maxPage;
  };

  static formatMacAddress(text: string, pad: string = '-') {
    const mac = text
      .toLowerCase()
      .replace(/[^\d|가-힣|a-z]/g, '')
      .match(/.{1,2}/g)
      ?.join(pad);

    return mac || '';
  }

  static formatPhoneNumber(str = '', delim = '-') {
    const clean = str.replace(/[^\d]+/gi, '').substr(0, 13);
    let r = krPhone.input(clean);
    if (delim !== '-') r = r.replace(/-/g, delim);
    krPhone.reset();

    return r;
  }

  static getChangedMonthYYYYMMDD(timestamp: number, month: number = -1) {
    const now = new Date(timestamp);
    const date = new Date(now.setMonth(now.getMonth() + month)).getTime();

    return Utils.getYYYYMMDD(date, '-');
  }

  static getYYYYMMDD(timestamp: number, delim = '.') {
    const date = new Date(timestamp);
    const year = date.getFullYear() + '';
    const month = date.getMonth() + 1 + '';
    const _date = date.getDate() + '';

    const fullDate = `${year}${delim}${Utils.pad(month)}${delim}${Utils.pad(
      _date,
    )}`;

    return fullDate;
  }

  static getHourMinSecByTimestamp(timestamp: number, delim = ' : ') {
    const date = new Date(timestamp);
    const hour = date.getHours() + '';
    const min = date.getMinutes() + '';
    const sec = date.getSeconds() + '';

    const fullTime = `${Utils.pad(hour)}${delim}${Utils.pad(
      min,
    )}${delim}${Utils.pad(sec)}`;
    return fullTime;
  }

  static getHourMinSecBySecond(timestamp: number, delim = ':') {
    const hours = Math.floor(timestamp / 3600);
    const minutes = Math.floor((timestamp - hours * 3600) / 60);
    const seconds = timestamp - hours * 3600 - minutes * 60;

    const fullTime = `${Utils.pad(hours.toString())}${delim}${Utils.pad(
      minutes.toString(),
    )}${delim}${Utils.pad(seconds.toString())}`;

    return fullTime;
  }

  static pad(data: string, standard = 2) {
    if (data.length < standard) {
      return '0' + data;
    }

    return data;
  }
}

export default Utils;
