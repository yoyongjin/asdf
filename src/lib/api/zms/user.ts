import APIManager from 'lib/api/manager';
import url from 'lib/api/url';
import Main from 'lib/api/zms/main';
import { RequestAddUser, RequestModifyUser } from 'types/user';
import { USED_PHONE_STATUS } from 'utils/constants';
import Logger from 'utils/log';

class User {
  /**
   * @description 상담원 여러명 가져오기
   * @params ids id 복수 (구분자 ,) ex) 1,2,3
   */
  static async getPluralConsultant(ids: string) {
    try {
      const token = Main.getAccessToken();

      const params = {
        ids,
      };

      const { data } = await APIManager.get(
        url.zms.api.path.get_plural_user,
        params,
        {
          token,
        },
      );
      Logger.log('Get Plural User Data', JSON.stringify(data));

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

  static async getUsers(
    branchId: number,
    teamId: number,
    limit: number,
    page: number,
    breakUp: boolean,
    searchName: string,
  ) {
    try {
      const token = Main.getAccessToken();

      const payload = {
        branch_id: branchId,
        team_id: teamId,
        limit,
        page,
        search_name: searchName,
        include_leaver: breakUp,
      };

      const { data } = await APIManager.get(
        url.zms.api.path.get_users,
        payload,
        {
          token,
        },
      );
      Logger.log('Get Users Data', JSON.stringify(data));

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

  static async addUser(
    branchId: number,
    teamId: number,
    adminId: number,
    name: string,
    userName?: string,
    number?: string,
    pcip?: string,
    ip?: string,
    mac?: string,
    mic?: number,
    spk?: number,
  ) {
    try {
      const token = Main.getAccessToken();

      const payload: RequestAddUser = {
        branch_id: branchId,
        team_id: teamId,
        admin_id: adminId,
        name,
      };

      if (userName) {
        payload.user_name = userName;
      }

      if (number) {
        payload.number = number;
      }

      if (pcip) {
        payload.pc_ip = pcip;
      }

      if (ip) {
        payload.ziboxip = ip;
      }

      if (mac) {
        payload.ziboxmac = mac;
      }

      if (mic) {
        payload.ziboxmic = mic;
      }

      if (spk) {
        payload.ziboxspk = spk;
      }

      const { data } = await APIManager.post(
        url.zms.api.path.add_user,
        payload,
        {
          token,
        },
      );
      Logger.log('Add User', JSON.stringify(data));

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

  static async modifyUser(
    id: number,
    branchId: number,
    teamId: number,
    adminId: number,
    name: string,
    userName?: string,
    number?: string,
    pcip?: string,
    ip?: string,
    mac?: string,
    mic?: number,
    spk?: number,
    availableTime?: string,
    inMessage?: string,
    outMessage?: string,
  ) {
    try {
      const token = Main.getAccessToken();

      const payload: RequestModifyUser = {
        id,
        branch_id: branchId,
        team_id: teamId,
        admin_id: adminId,
        name,
      };

      if (userName) {
        payload.user_name = userName;
      }

      if (number) {
        payload.number = number;
      }

      if (pcip) {
        payload.pc_ip = pcip;
      }

      if (ip) {
        payload.ziboxip = ip;
      }

      if (mac) {
        payload.ziboxmac = mac;
      }

      if (mic) {
        payload.ziboxmic = mic;
      }

      if (spk) {
        payload.ziboxspk = spk;
      }

      if (availableTime) {
        payload.available_time = availableTime;
      }

      if (inMessage) {
        payload.in_message = inMessage;
      }

      if (outMessage) {
        payload.out_message = outMessage;
      }

      const { data } = await APIManager.patch(
        `${url.zms.api.path.modify_user}/${id}`,
        payload,
        {
          token,
        },
      );
      Logger.log('Modify User', JSON.stringify(data));

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

  static async removeUser(id: number) {
    try {
      const token = Main.getAccessToken();

      const { data } = await APIManager.delete(
        `${url.zms.api.path.remove_user}/${id}`,
        null,
        {
          token,
        },
      );
      Logger.log('Remove User', JSON.stringify(data));

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

  static async resetPassword(id: number) {
    try {
      const token = Main.getAccessToken();

      const { data } = await APIManager.patch(
        `${url.zms.api.path.reset_user_password}/${id}`,
        null,
        {
          token,
        },
      );
      Logger.log('Reset User Password', JSON.stringify(data));

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

  static async modifyZiBoxVolume(number: string, mic: number, spk: number) {
    try {
      const token = Main.getAccessToken();

      const params = {
        number,
        ziboxmic: mic,
        ziboxspk: spk,
      };

      const { data } = await APIManager.patch(
        url.zms.api.path.modify_zibox_volume,
        params,
        {
          token,
        },
      );
      Logger.log('Modify ZiBox Volume', JSON.stringify(data));

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

export default User;
