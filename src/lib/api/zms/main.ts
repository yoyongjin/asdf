import constants from 'utils/constants';
import Cookie from 'utils/cookie';

class Main {
  static setAccessToken(token: string) {
    const isSuccess = Cookie.setCookie(constants.COOKIE_NAME, token);

    return isSuccess;
  }

  static getAccessToken() {
    const token = Cookie.getCookie(constants.COOKIE_NAME);

    return token;
  }

  static removeAccessToken() {
    return Cookie.removeCookie(constants.COOKIE_NAME);
  }
}

export default Main;
