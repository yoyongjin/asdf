import APIManager from 'lib/api/manager';
import url from 'lib/api/url';
import Main from 'lib/api/zms/main';
import { RequestAddUser } from 'types/user';
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

      if (ip) {
        payload.zibox_ip = ip;
      }

      if (mac) {
        payload.zibox_mac = mac;
      }

      if (mic) {
        payload.zibox_mic = mic;
      }

      if (spk) {
        payload.zibox_spk = spk;
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
}

export default User;
