import Cookies from 'js-cookie';

class Cookie {
  /**
   * @description 쿠키 설정
   * @param name 쿠키 이름
   * @param value 쿠키 값
   * @param options 쿠키 옵션
   */
  static setCookie(
    name: string,
    value: string,
    expires: number = 1000 * 24 * 60 * 60,
  ) {
    Cookies.set(name, value, {
      expires,
    });
  }

  /**
   * @description 쿠키 가져오기
   * @param name 쿠키 이름
   */
  static getCookie(name: string) {
    return Cookies.get(name);
  }

  static removeCookie(name: string) {
    Cookies.remove(name);
  }
}

export default Cookie;
