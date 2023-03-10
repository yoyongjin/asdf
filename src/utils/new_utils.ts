import { AsYouType } from 'libphonenumber-js';

const krPhone = new AsYouType('KR');

class Utils {
  static checkBrowser() {
    const agent = navigator.userAgent.toLowerCase();

    if (agent.indexOf('trident') > -1) {
      return 'ie';
    }

    return '';
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

  static getDiffOfMonth(date1: Date, date2: Date) {
    let months = (date2.getFullYear() - date1.getFullYear()) * 12;
    months -= date1.getMonth();
    months += date2.getMonth();

    return months <= 0 ? 1 : months + 1;
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

  /**
   * @description 숫자만 필터링하는 함수
   * @param str 문자열
   */
  static formatNumber(str = '') {
    return str.replace(/[^0-9]/gi, '');
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

  static getHourMinByTimestamp(timestamp: number, delim = ' : ') {
    const date = new Date(timestamp);
    const hour = date.getHours() + '';
    const min = date.getMinutes() + '';

    const fullTime = `${Utils.pad(hour)}${delim}${Utils.pad(min)}`;
    return fullTime;
  }

  static getHourMinSecBySecond(timestamp: number, delim = ':') {
    const hours = Math.floor(timestamp / 3600);
    const minutes = Math.floor((timestamp - hours * 3600) / 60);
    let seconds = timestamp - hours * 3600 - minutes * 60;
    seconds = Utils.getDecimalNumber(seconds, 0);

    const fullTime = `${Utils.pad(hours.toString())}${delim}${Utils.pad(
      minutes.toString(),
    )}${delim}${Utils.pad(seconds.toString())}`;

    return fullTime;
  }

  static getDecimalNumber(number: number, decimal = 1) {
    return Number(number.toFixed(decimal));
  }

  /**
   * @description 총 날짜 가져오기
   * @param timestamp 시간
   * @param isSec 초 가져올지 여부
   * @param delimYMD 년월일 구분자
   * @param delimHMS 시분초 구분자
   * @param space 년원일시분초 구분자
   */
  static getFullDate(
    timestamp: number,
    isSec = true,
    delimYMD = '.',
    delimHMS = ':',
    space = ' ',
  ) {
    const yyyymmdd = Utils.getYYYYMMDD(timestamp, delimYMD);
    const hhmmss = isSec
      ? Utils.getHourMinSecByTimestamp(timestamp, delimHMS)
      : Utils.getHourMinByTimestamp(timestamp, delimHMS);

    return `${yyyymmdd}${space}${hhmmss}`;
  }

  static pad(data: string, standard = 2) {
    if (data.length < standard) {
      return '0' + data;
    }

    return data;
  }

  /**
   * @description 숫자로 구성된 요일값을 한글로 변경
   * @param numberOfDays 숫자로 구성된 요일
   * @param delim 구분자
   */
  static parsingDays(numberOfDays: string, delim = '') {
    const days = ['일', '월', '화', '수', '목', '금', '토'];

    return numberOfDays.split(delim).map((values) => {
      return days[Number(values)];
    });
  }

  /**
   * @description 년월일 구분자로 된 문자열을 파싱하기
   * @param formatDate 년월일 문자열 ex) 20220407
   * @param delim 구분자
   */
  static parsingYYYYMMDD(formatDate: string, delim = '-') {
    const [year, month, day] = formatDate.split(delim);

    return {
      year,
      month,
      day,
    };
  }

  /**
   * @description 시분초 구분자로 된 문자열을 파싱하기
   * @param formatDate 시분초 문자열 ex) 18:00:00
   * @param delim 구분자
   */
  static parsingHHMMSS(formatTime: string, delim = ':') {
    const [hours, minutes, seconds] = formatTime.split(delim);

    return {
      hours,
      minutes,
      seconds,
    };
  }

  static replace(
    origintText: string,
    changedWord: string | RegExp,
    replaceWord: string,
  ) {
    return origintText.replace(changedWord, replaceWord);
  }

  static cutMaxText(text: string, max = 100) {
    let ellipsis = '';
    if (text.length > max) ellipsis = ' ...';
    return text.substring(0, max) + ellipsis;
  }
}

export default Utils;
