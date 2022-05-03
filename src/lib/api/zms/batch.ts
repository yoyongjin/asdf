import APIManager from 'lib/api/manager';
import url from 'lib/api/url';
import Main from 'lib/api/zms/main';
import Logger from 'utils/log';

class Batch {
  /**
   * @description 조직/인사 배치
   */
  static async syncBranchUser() {
    try {
      const token = Main.getAccessToken();

      const { data } = await APIManager.get(
        url.zms.api.path.sync_branch_user,
        null,
        {
          token,
        },
      );

      Logger.log('Sync Branch And User', JSON.stringify(data));

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
   * @description ksvc 배치
   */
  static async syncKSVC() {
    try {
      const token = Main.getAccessToken();

      const { data } = await APIManager.get(url.zms.api.path.sync_ksvc, null, {
        token,
      });

      Logger.log('Sync KSVC', JSON.stringify(data));

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
   * @description IP 배치
   */
  static async syncIP() {
    try {
      const token = Main.getAccessToken();

      const { data } = await APIManager.get(url.zms.api.path.sync_ip, null, {
        token,
      });

      Logger.log('Sync IP', JSON.stringify(data));

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
   * @description 휴대폰 정보 배치
   */
  static async syncPhoneInfo() {
    try {
      const token = Main.getAccessToken();

      const { data } = await APIManager.get(
        url.zms.api.path.sync_phone_info,
        null,
        {
          token,
        },
      );

      Logger.log('Sync Phone Info', JSON.stringify(data));

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

export default Batch;
