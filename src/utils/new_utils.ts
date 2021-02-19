class Utils {
  static checkBrowser() {
    const agent = navigator.userAgent.toLowerCase();

    if (
      (navigator.appName == 'Netscape' &&
        navigator.userAgent.search('Trident') != -1) ||
      agent.indexOf('msie') != -1
    ) {
      return 'ocx';
    }

    return null;
  }
}

export default Utils;
