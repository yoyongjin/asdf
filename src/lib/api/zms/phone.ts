import APIManager from 'lib/api/manager';
import url from 'lib/api/url';
import Main from 'lib/api/zms/main';
import Logger from 'utils/log';

class Phone {
  static async getPhones(
    isMatch: boolean,
    page: number,
    limit: number,
    searchText: string = '',
  ) {
    const params = {
      is_match: isMatch,
      page,
      page_count: limit,
      search_text: searchText,
    };

    try {
      const token = Main.getAccessToken();

      const { data } = await APIManager.get(url.zms.api.path.get_info, params, {
        token,
      });

      Logger.log('Get Phones Data', JSON.stringify(data));

      return data;
    } catch (error) {
      if (error instanceof Error) {
        const isSuccess = APIManager.isError(error);

        if (isSuccess) {
          const info = APIManager.error(error);
          Logger.log(JSON.stringify(info));

          return info;
        }

        throw error;
      }

      return false;
    }
  }

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
      if (error instanceof Error) {
        const isSuccess = APIManager.isError(error);

        if (isSuccess) {
          const info = APIManager.error(error);
          Logger.log(JSON.stringify(info));

          return info;
        }

        throw error;
      }

      return false;
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
      if (error instanceof Error) {
        const isSuccess = APIManager.isError(error);

        if (isSuccess) {
          const info = APIManager.error(error);
          Logger.log(JSON.stringify(info));

          return info;
        }

        throw error;
      }

      return false;
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
      if (error instanceof Error) {
        const isSuccess = APIManager.isError(error);

        if (isSuccess) {
          const info = APIManager.error(error);
          Logger.log(JSON.stringify(info));

          return info;
        }

        throw error;
      }

      return false;
    }
  }
}

export default Phone;
