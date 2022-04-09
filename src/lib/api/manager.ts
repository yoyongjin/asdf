import axios, { AxiosError } from 'axios';

import url from 'lib/api/url';

class API {
  private static zmsApi = axios.create({
    baseURL: url.zms.api.host,
    timeout: 5000,
    withCredentials: true,
  });

  private static relayApi = axios.create({
    baseURL: url.relay.api.host,
    timeout: 5000,
    withCredentials: true,
  });

  /**
   * @description GET 요청
   * @param endpoint path
   * @param params 파라미터
   * @param type host 타입
   * @returns
   */
  static get(
    endpoint: string,
    params?: any,
    headers?: any,
    type: string = 'zms',
  ) {
    const host = this.getHost(type);
    return host!.get(endpoint, {
      params,
      headers,
    });
  }

  /**
   * @description DELETE 요청
   * @param endpoint path
   * @param params 파라미터
   * @param type host 타입
   * @returns
   */
  static delete(
    endpoint: string,
    params?: any,
    headers?: any,
    type: string = 'zms',
  ) {
    const host = this.getHost(type);
    return host!.delete(endpoint, {
      headers,
      data: params,
    });
  }

  /**
   * @description PATCH 요청
   * @param endpoint path
   * @param params 파라미터
   * @param type host 타입
   */
  static patch(
    endpoint: string,
    params?: any,
    headers?: any,
    type: string = 'zms',
  ) {
    const host = this.getHost(type);
    return host!.patch(endpoint, params, {
      headers,
    });
  }

  /**
   * @description POST 요청
   * @param endpoint path
   * @param params 파라미터
   * @param type host 타입
   */
  static post(
    endpoint: string,
    params?: any,
    headers?: any,
    type: string = 'zms',
  ) {
    const host = this.getHost(type);
    return host!.post(endpoint, params, {
      headers,
    });
  }

  /**
   * @description PUT 요청
   * @param endpoint path
   * @param params 파라미터
   * @param type host 타입
   */
  static put(
    endpoint: string,
    params?: any,
    headers?: any,
    type: string = 'zms',
  ) {
    const host = this.getHost(type);
    return host!.put(endpoint, params, {
      headers,
    });
  }

  /**
   * @description Axios 에러인지 타입 체크
   * @param error 에러
   */
  static isError(error: any): error is AxiosError {
    return error.response !== undefined || error.request !== undefined;
  }

  /**
   * @description axios error 처리
   * @param error axios error
   */
  static error(error: AxiosError) {
    let info = '';
    if (error.response) {
      // 요청 실패
      info = error.response?.data;
    } else if (error.request) {
      // 요청에 대한 응답을 받지 못함
      info = error.request;
    }

    return info;
  }

  /**
   * @description host 설정
   * @param type host 타입
   * @returns axios
   */
  private static getHost(type: string) {
    switch (type) {
      case 'zms':
        return this.zmsApi;
      case 'relay':
        return this.relayApi;
      default:
        return null;
    }
  }
}

export default API;
