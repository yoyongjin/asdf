import APIManager from 'lib/api/manager';
import url from 'lib/api/url';
import Logger from 'utils/log';
import Main from 'lib/api/zms/main';

class Auth {
  /**
   * @description 로그인
   * @param id 아이디
   * @param password 비밀번호
   * @returns
   */
  static async login(id: string, password: string) {
    try {
      const params = {
        user_name: id,
        user_pass: password,
      };

      const { data } = await APIManager.post(url.zms.api.path.login, params);
      Logger.log('Login Data', JSON.stringify(data));

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
   * @description 자동 로그인
   * @returns
   */
  static async autoLogin() {
    try {
      const token = Main.getAccessToken();

      const { data } = await APIManager.post(
        url.zms.api.path.auto_login,
        null,
        {
          token,
        },
      );
      Logger.log('Auto Login Data', JSON.stringify(data));

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

  static async logout() {
    try {
      const token = Main.getAccessToken();

      const { data } = await APIManager.post(url.zms.api.path.logout, null, {
        token,
      });
      Logger.log('Logout Data', JSON.stringify(data));

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

  static async changePassword(
    currentPassword: string,
    newPassword: string,
    newConfirmPassword: string,
  ) {
    try {
      const token = Main.getAccessToken();

      const payload = {
        current_pw: currentPassword,
        new_pw: newPassword,
        confirm_new_pw: newConfirmPassword,
      };

      const { data } = await APIManager.patch(
        url.zms.api.path.change_user_password,
        payload,
        {
          token,
        },
      );
      Logger.log('Change Password Data', JSON.stringify(data));

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

export default Auth;
