import APIManager from 'lib/api/manager';
import url from 'lib/api/url';
import Main from 'lib/api/zms/main';
import { RequestAddUser, RequestModifyUser } from 'types/user';
import { USED_PHONE_STATUS } from 'utils/constants';
import Logger from 'utils/log';

class User {
  static async getUsers(
    branchId: number,
    teamId: number,
    limit: number,
    page: number,
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
      if (error.response?.data) {
        Logger.log(JSON.stringify(error.response.data));

        return error.response.data;
      }

      throw new Error(error);
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
    telecom?: string,
    plan?: string,
    used?: number,
    serialNumber?: string,
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

      if (telecom) {
        payload.telecom = telecom;
      }

      if (serialNumber) {
        payload.serial_number = serialNumber;
      }

      if (plan) {
        payload.plan = plan;
      }

      if (used !== USED_PHONE_STATUS.DEFAULT) {
        payload.used = used;
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
      if (error.response?.data) {
        Logger.log(JSON.stringify(error.response.data));

        return error.response.data;
      }

      throw new Error(error);
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
    originNumber?: string,
    pcip?: string,
    ip?: string,
    mac?: string,
    mic?: number,
    spk?: number,
    availableTime?: string,
    inMessage?: string,
    outMessage?: string,
    telecom?: string,
    plan?: string,
    used?: number,
    serialNumber?: string,
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

      if (originNumber) {
        payload.origin_number = originNumber;
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

      if (telecom) {
        payload.telecom = telecom;
      }

      if (serialNumber) {
        payload.serial_number = serialNumber;
      }

      if (plan) {
        payload.plan = plan;
      }

      if (used !== USED_PHONE_STATUS.DEFAULT) {
        payload.used = used;
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
      if (error.response?.data) {
        Logger.log(JSON.stringify(error.response.data));

        return error.response.data;
      }

      throw new Error(error);
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
      if (error.response?.data) {
        Logger.log(JSON.stringify(error.response.data));

        return error.response.data;
      }

      throw new Error(error);
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
      if (error.response?.data) {
        Logger.log(JSON.stringify(error.response.data));

        return error.response.data;
      }

      throw new Error(error);
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
      if (error.response?.data) {
        Logger.log(JSON.stringify(error.response.data));

        return error.response.data;
      }

      throw new Error(error);
    }
  }
}

export default User;
