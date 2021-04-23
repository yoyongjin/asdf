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
}

export default Utils;
