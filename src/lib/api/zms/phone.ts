import APIManager from 'lib/api/manager';
import url from 'lib/api/url';
import Main from 'lib/api/zms/main';
import Logger from 'utils/log';

class Phone {
  static async getPhoneInfo(number: string) {
    const params = {
      number,
    };

    try {
      const token = Main.getAccessToken();

      const { data } = await APIManager.get(url.zms.api.path.get_info, params, {
        token,
      });

      Logger.log('Get Phone Info Data', JSON.stringify(data));

      return data;
    } catch (error) {
      if (error.response?.data) {
        Logger.log(JSON.stringify(error.response.data));

        return error.response.data;
      }

      throw new Error(error);
    }
  }

  /**
   * @description 통신사별 요금제 가져오기
   */
  static async getPlanByTelcom(telecom: string) {
    const params = {
      telecom,
    };

    try {
      const token = Main.getAccessToken();

      const { data } = await APIManager.get(url.zms.api.path.get_plan, params, {
        token,
      });

      Logger.log('Get Plan By Telecom Data', JSON.stringify(data));

      return data;
    } catch (error) {
      if (error.response?.data) {
        Logger.log(JSON.stringify(error.response.data));

        return error.response.data;
      }

      throw new Error(error);
    }
  }

  /**
   * @description 통신사 가져오기
   */
  static async getTelecom() {
    try {
      const token = Main.getAccessToken();

      const { data } = await APIManager.get(
        url.zms.api.path.get_telecom,
        null,
        {
          token,
        },
      );
      Logger.log('Get Telecom Data', JSON.stringify(data));

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

export default Phone;
