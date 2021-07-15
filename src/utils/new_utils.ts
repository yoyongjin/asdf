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
}

export default Utils;
