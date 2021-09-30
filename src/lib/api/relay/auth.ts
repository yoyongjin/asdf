import APIManager from 'lib/api/manager';
import url from 'lib/api/url';
import Logger from 'utils/log';

class Auth {
  static async disconnect(number: string) {
    try {
      const params = {
        number,
      };

      const { data } = await APIManager.post(
        url.relay.api.path.disconnect,
        params,
        null,
        'relay',
      );

      Logger.log('Disconnect Phone / ZiBox', JSON.stringify(data));

      return data;
    } catch (error) {
      if (error.response?.data) {
        Logger.log(JSON.stringify(error.response.data));

        return error.response.data;
      }

      throw new Error(error);
    }
  }
}

export default Auth;
